import React, { useEffect, useState } from "react";
 import {
   View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   Dimensions,
   Alert,
   TextInput,
 } from "react-native";
 import { useLocalSearchParams, useRouter } from "expo-router";
 import { Ionicons } from "@expo/vector-icons";
 import { supabase } from "../../../lib/supabase";
 import StarRating from "../../../components/StarRating";
 
 const { width } = Dimensions.get("window");
 
 export default function FoodDetails() {
   const [details, setDetails] = useState(null);
   const [rating, setRating] = useState(0);
   const [reviewContent, setReviewContent] = useState('');
   const [reviews, setReviews] = useState([]);
   const [userId, setUserId] = useState(null);
   const { id } = useLocalSearchParams();
   const router = useRouter();
 
   const getUser = async () => {
     const {
       data: { user },
       error,
     } = await supabase.auth.getUser();
     if (error) {
       console.error("Error getting user:", error);
     } else {
       const userId = user ? user.id : null;
       setUserId(userId);
       console.log("User ID:", userId);
     }
   };
   const foodData = {
     title: "Croissant, Paris",
     description:
       "Croissant je jedan od najpoznatijih francuskih peciva. Uživajte u svakom zalogaju!",
     image:
       "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
     rate: 5,
   };
 
   const handleRatingChange = (rating) => {
     setRating(rating);
   };
   useEffect(() => {
     getUser();
   }, []);
   useEffect(() => {
     if (!id) return;
     const fetchLocations = async () => {
       const { data, error } = await supabase
         .from("destinations")
         .select("*")
         .eq("id", id);
       if (error) {
         console.error("Error fetching locations:", error);
         Alert.alert("Error", "Failed to load locations.");
       } else {
         setDetails(data);
       }
     };
     fetchLocations();
   }, [id]);
 
   useEffect(() => {
     if (id) {
       fetchReviews();
     }
   }, [id]);
 
   async function fetchReviews() {
     const { data, error } = await supabase
       .from("reviews")
       .select("*, users(name)")
       .eq("destination_id", id)
       .order("id", { ascending: false });
     if (error) {
       console.error("Error fetching reviews:", error);
     } else {
       console.log(data);
       setReviews(data);
     }
   }
 
   async function handlePublishReview() {
     if (rating === 0) {
       Alert.alert("Error", "Rating is required");
       return;
     }
 
     const { data, error } = await supabase.from("reviews").insert({
       rating: rating,
       comment: reviewContent,
       destination_id: id,
       user_id: userId,
     });
     if (error) {
       Alert.alert("Error", "Failed to submit review");
       console.log(error);
     } else {
       Alert.alert("Success", "Review submitted successfully");
       setReviewContent("");
       setRating(0);
       fetchReviews();
     }
   }
 
   if (!details) {
     return <Text>Loading...</Text>;
   }
 
   return (
     <ScrollView style={styles.container}>
       <TouchableOpacity
         style={styles.homeButton}
         onPress={() => router.push("/home")}
       >
         <Ionicons name="home" color="#B59F78" size={24} />
       </TouchableOpacity>
       <View>
         <Image source={{ uri: details[0]?.image }} style={styles.foodImage} />
       </View>
       <View style={styles.informationDiv}>
         <View style={styles.place}>
           <View style={{ flexDirection: "row" }}>
             <Text style={styles.title}>
               {details[0].name}
               {", "}
             </Text>
             <Text style={[styles.title, { color: "#B59F78" }]}>
               {details[0].city}
             </Text>
           </View>
           <StarRating
             initialRating={foodData.rate}
             totalStars={5}
             isEditable={false}
           />
         </View>
         <View style={styles.descriptionDiv}>
           <Text style={styles.description}>{details[0]?.description}</Text>
         </View>
       </View>
       <View>
         <Text style={styles.sectionTitle}>Gde mozete probati</Text>
         {details?.map((location, index) => (
           <View style={styles.locationDiv} key={index}>
             <Image
               source={{
                 uri: location?.image,
               }}
               style={styles.locationIMG}
             />
             <View style={styles.locationRight}>
               <Text style={styles.userNameStyle}>{location.locationName}</Text>
               <Text style={styles.adressStyle}>{location.locationAdress}</Text>
             </View>
           </View>
         ))}
       </View>
       <View style={{ width: "95%", alignItems: "center", alignSelf: "center" }}>
         <Text
           style={[
             styles.sectionTitle,
             { alignSelf: "flex-start", marginTop: 10, marginLeft: 0 },
           ]}
         >
           Oceni ovaj proizvod
         </Text>
         <Text style={styles.reviewText}>Podelite vase misljenje s drugima</Text>
         <StarRating
           initialRating={0}
           totalStars={5}
           isEditable={true}
           onRatingChange={handleRatingChange}
           size={25}
           margin={60}
         />
         <TextInput
           style={styles.modalTextInput}
           placeholder="Opisite svoje iskustvo (nije obavezno)"
           placeholderTextColor="#777"
           multiline={true}
           value={reviewContent}
           onChangeText={setReviewContent}
         />
         <TouchableOpacity
           style={styles.reviewButton}
           onPress={handlePublishReview}
         >
           <Text style={styles.reviewButtonText}>Objavi</Text>
         </TouchableOpacity>
       </View>
       <View style={{ marginBottom: 50 }}>
         <Text style={styles.sectionTitle}>Utisci o proizvodu</Text>
         <View>
           {reviews.map((review) => (
             <View key={review.id} style={styles.commentDiv}>
               <View>
                 <Image
                   source={{
                     uri: "https://via.placeholder.com/60",
                   }}
                   style={styles.userIMGStyle}
                 />
               </View>
               <View style={styles.rightStyle}>
                 <View style={styles.upStyle}>
                   <Text style={styles.userNameStyle}>{review.users?.name}</Text>
                   <StarRating
                     initialRating={review.rating}
                     totalStars={5}
                     isEditable={false}
                     size={15}
                   />
                 </View>
                 <Text style={styles.contentStyle}>{review.comment}</Text>
               </View>
             </View>
           ))}
         </View>
       </View>
     </ScrollView>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#FAF6E3",
     marginBottom: 20,
   },
   foodImage: {
     width: "100%",
     height: 200,
     borderBottomLeftRadius: 10,
     borderBottomRightRadius: 10,
   },
   title: { fontSize: 24, fontWeight: "bold" },
   description: {
     fontSize: 14,
     fontWeight: "bold",
     color: "#B59F78",
   },
   descriptionDiv: {
     backgroundColor: "#2A3663F5",
     marginVertical: 15,
     padding: 10,
     alignSelf: "center",
     width: "100%",
     borderRadius: 10,
   },
   homeButton: {
     position: "absolute",
     top: 5,
     left: 10,
     zIndex: 1,
     backgroundColor: "#D8DBBD",
     padding: 10,
     borderRadius: 50,
     marginBottom: 20,
     elevation: 5,
   },
   rate: { fontSize: 16, marginBottom: 10 },
   sectionTitle: {
     fontSize: 18,
     fontWeight: "bold",
     color: "#2A3663F5",
     marginTop: 10,
     marginLeft: 10,
   },
   reviewText: {
     alignSelf: "flex-start",
     marginBottom: 20,
     color: "#777",
   },
   place: {
     flexDirection: "row",
     marginTop: 10,
     alignItems: "center",
     justifyContent: "space-between",
   },
   userIMGStyle: {
     height: 60,
     width: 60,
     borderRadius: 30,
   },
   commentDiv: {
     backgroundColor: "#D8DBBD",
     marginTop: 10,
     flexDirection: "row",
     alignSelf: "center",
     alignItems: "center",
     width: "95%",
     borderRadius: 15,
     padding: 10,
   },
   upStyle: {
     flexDirection: "row",
     width: "90%",
     justifyContent: "space-between",
     alignItems: "center",
   },
   rightStyle: {
     padding: 10,
   },
   reviewButton: {
     backgroundColor: "#D8DBBD",
     width: width * 0.3,
     paddingHorizontal: 10,
     paddingVertical: 5,
     borderRadius: 5,
   },
   reviewButtonText: {
     color: "#2A3663",
     letterSpacing: 1,
     alignSelf: "center",
     fontSize: 14,
   },
   userNameStyle: {
     color: "#2A3663F5",
     fontSize: 16,
     fontWeight: "bold",
   },
   contentStyle: {
     color: "#B59F78",
     fontSize: 16,
     marginTop: 5,
   },
   adressStyle: {
     fontSize: 14,
     color: "#B59F78",
     marginTop: 5,
     flexWrap: "wrap",
     width: "90%",
   },
   locationIMG: {
     height: "100%",
     width: "25%",
     overflow: "hidden",
     borderRadius: 10,
     marginRight: 10,
   },
   modalTextInput: {
     width: "100%",
     margin: 20,
     marginBottom: 10,
     backgroundColor: "#D8DBBD",
     borderRadius: 5,
     padding: 15,
     textAlignVertical: "top",
     color: "#777",
   },
   locationDiv: {
     flexDirection: "row",
     backgroundColor: "#D8DBBD",
     alignSelf: "center",
     width: "95%",
     borderRadius: 10,
     marginBottom: 12,
     overflow: "hidden",
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.1,
     elevation: 1,
     alignItems: "center",
     marginTop: 10,
   },
   locationRight: {
     paddingVertical: 10,
     paddingHorizontal: 10,
     marginHorizontal: 0,
     width: "70%",
   },
   informationDiv: {
     width: "95%",
     alignSelf: "center",
   },
 });