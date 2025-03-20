import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const blogPosts = [
  {
    id: "1",
    user: "@daris_mavric",
    place: "Muzej Ras",
    placeid: "4e542d74-2036-4d5f-b340-f6089526d157",
    content:
      "Ovo je uvod u prvi blog post. U njemu se obrađuju zanimljive teme...",
    comments: [
      { id: "c1", text: "Odličan tekst!" },
      { id: "c2", text: "Hvala na deljenju." },
    ],
  },
  {
    id: "2",
    user: "@emin_redzovic",
    place: "Cacak",
    placeid: "57c24bf1-2f10-4112-b614-705ce3534a4a",
    content: "U drugom blog postu istražujemo nove ideje i pristupe u dizajnu.",
    comments: [{ id: "c3", text: "Jako inspirativno." }],
  },
  {
    id: "3",
    user: "@danilo_petrovic",
    placeid: "ebdfb86e-8f52-409e-a3f6-5f953fff655e",
    place: "Krosan",
    content: "Treći post pruža uvid u najnovije trendove i tehnologije.",
    comments: [],
  },
];

const BlogBlock = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/blogDetails/${123}`)}>
      <View style={styles.blockContainer}>
        {/* Header posta */}
        <View style={styles.blockHeader}>
          <Image
            source={require("./7512444f-f54a-4ed1-8fcd-684a2c6c913b.png")}
            style={styles.avatar}
          />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <View>
              <Text style={styles.blockTitle}>
                {post.user} {"-> "}
                <Text
                  style={styles.placeText}
                  onPress={() => router.push(`/(tabs)/details/${post.placeid}`)}
                >
                  {post.place}
                </Text>
              </Text>
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-end" }}>
              <MaterialCommunityIcons name="share" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Slika koju je user postovao */}
        <Image
          source={{
            uri: "https://imgs.search.brave.com/U7ve3Fu3Or3OtNFOv5_2bulvzBO3bj2u14XNS1yAtVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnRo/ZWJhbGthbnNhbmRi/ZXlvbmQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA0/L2NldmFwaS1yZWNp/cGUtMTAucG5nP3Jl/c2l6ZT0xMDI0LDU3/NiZzc2w9MQ",
          }}
          style={styles.postImage}
        />

        {/* Sadržaj posta */}
        <View style={styles.blockContent}>
          <Text style={styles.postText}>{post.content}</Text>
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
          <TouchableOpacity onPress={() => setShowComments(!showComments)}>
            {showComments ? (
              <Text style={styles.actionText}>
                <FontAwesome name="comment-o" size={20} color="black" /> Hide
              </Text>
            ) : (
              <Text style={styles.actionText}>
                <FontAwesome name="comment-o" size={20} color="black" />
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Komentari */}
        {showComments && (
          <View style={styles.commentsContainer}>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Text key={comment.id} style={styles.commentText}>
                  • {comment.text}
                </Text>
              ))
            ) : (
              <Text style={styles.noCommentsText}>Nema komentara.</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const blog = () => {
  return (
    <FlatList
      data={blogPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BlogBlock post={item} />}
      ListHeaderComponent={() => <Text style={styles.headerTitle}>Blog</Text>}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

export default blog;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A3663",
    alignSelf: "center",
    marginVertical: 16,
  },
  flatListContainer: {
    padding: 16,
    paddingBottom: 20,
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
  commentsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  commentText: {
    color: "#2A3663",
    marginBottom: 4,
  },
  noCommentsText: {
    fontStyle: "italic",
    color: "#2A3663",
  },
  destinationButton: {
    backgroundColor: "#2A3663",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  destinationButtonText: {
    color: "#FAF6E3",
    fontSize: 16,
  },
});
