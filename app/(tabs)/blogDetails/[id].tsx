import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const blogPost = {
  id: "3",
  user: "@danilo_petrovic",
  placeid: "ebdfb86e-8f52-409e-a3f6-5f953fff655e",
  place: "Krosan",
  imageURL:
    "https://imgs.search.brave.com/U7ve3Fu3Or3OtNFOv5_2bulvzBO3bj2u14XNS1yAtVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnRo/ZWJhbGthbnNhbmRi/ZXlvbmQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA0/L2NldmFwaS1yZWNp/cGUtMTAucG5nP3Jl/c2l6ZT0xMDI0LDU3/NiZzc2w9MQ",
  content: "Treći post pruža uvid u najnovije trendove i tehnologije.",
  comments: [
    { id: "c1", user: "@daris_mavric", text: "Odličan tekst!" },
    { id: "c2", user: "@emin_redzovic", text: "Hvala na deljenju." },
  ],
};

export default function BlogDetails() {
  const [comments, setComments] = useState(blogPost.comments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now().toString(),
        user: "@current_user", // logika za trenutnog korisnika
        text: newComment,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.blockContainer}>
          {/* Header posta */}
          <View style={styles.blockHeader}>
            <Image
              source={require("../../(main)/7512444f-f54a-4ed1-8fcd-684a2c6c913b.png")}
              style={styles.avatar}
            />
            <View style={styles.headerRight}>
              <View>
                <Text style={styles.blockTitle}>
                  {blogPost.user} {"-> "}
                  <Text
                    style={styles.placeText}
                    onPress={() =>
                      router.push(`/(tabs)/details/${blogPost.placeid}`)
                    }
                  >
                    {blogPost.place}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <MaterialCommunityIcons name="share" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Slika koju je user postovao */}
          <Image source={{ uri: blogPost.imageURL }} style={styles.postImage} />

          {/* Sadržaj posta */}
          <View style={styles.blockContent}>
            <Text style={styles.postText}>{blogPost.content}</Text>
          </View>

          {/* Akcije posta */}
          <View style={styles.blockActions}>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              {isLiked ? (
                <AntDesign name="like1" size={20} color="black" />
              ) : (
                <AntDesign name="like2" size={20} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionText}>
                <FontAwesome name="comment-o" size={20} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Komentari</Text>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.id} style={styles.commentContainer}>
                <Image
                  source={require("../../(main)/7512444f-f54a-4ed1-8fcd-684a2c6c913b.png")}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentText}> {comment.text}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentsText}>Nema komentara.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Ostavi komentar..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleAddComment}
        >
          <Text style={styles.commentButtonText}>Pošalji</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80, // prostor za input
  },
  blockContainer: {
    backgroundColor: "#D8DBBD",
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  blockHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerRight: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  blockTitle: {
    fontWeight: "bold",
    color: "#2A3663",
    fontSize: 16,
  },
  placeText: {
    textDecorationLine: "underline",
    color: "#2A3663",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  blockContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  postText: {
    fontSize: 14,
    color: "#B59F78",
    fontWeight: "700",
    letterSpacing: 0.5,
    margin: 10,
  },
  blockActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#D8DBBD",
    paddingBottom: 10,
  },
  actionText: {
    color: "#2A3663",
  },
  // Stari komentari
  commentsSection: {
    marginTop: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A3663",
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: "bold",
    color: "#2A3663",
    fontSize: 16,
    letterSpacing: 1,
  },
  commentText: {
    color: "#2A3663",
    fontSize: 15,
    letterSpacing: 1,
  },
  noCommentsText: {
    fontStyle: "italic",
    color: "#2A3663",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#D8DBBD",
    padding: 8,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#D8DBBD",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    color: "#2A3663",
  },
  commentButton: {
    backgroundColor: "#2A3663",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  commentButtonText: {
    color: "#FAF6E3",
    fontWeight: "bold",
  },
});
