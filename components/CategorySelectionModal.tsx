import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Checkbox } from "react-native-paper";

const foodTypes = ["Kafici i poslasticarnice", "Restorani", "Ulicna Hrana", "Tematski restorani"];
  const cultureTypes = ["Muzeji i galerije", "Istorijske znamenitosti", "Umetnost i arhitektura", "Religijske lokacije", "Tematske ture"];
  const activityTypes = ["Avanturističke aktivnosti", "Noćni život", "Wellness i spa", "Porodicne aktivnosti", "Sezonski dogadjaji"];

const CategorySelectionModal = ({ isVisible, onClose, onSelect }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>🍽 Hrana i Restorani</Text>
        <FlatList
          data={foodTypes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => toggleCategory(item)}>
              <Checkbox status={selectedCategories.includes(item) ? "checked" : "unchecked"} />
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.title}>🏛 Kultura i znamenitosti</Text>
        <FlatList
          data={cultureTypes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => toggleCategory(item)}>
              <Checkbox status={selectedCategories.includes(item) ? "checked" : "unchecked"} />
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.title}>🎭 Aktivnosti i doživljaji</Text>
        <FlatList
          data={activityTypes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => toggleCategory(item)}>
              <Checkbox status={selectedCategories.includes(item) ? "checked" : "unchecked"} />
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => onSelect(selectedCategories)}>
          <Text style={styles.buttonText}>Primeni</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: "center", alignItems: "center",},
  container: { width: '90%', backgroundColor: "#D8DBBD", padding: 20, borderRadius: 10,},
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 5,},
  text: { marginLeft: 10, fontSize: 16, color: "#444" },
  button: { marginTop: 15, backgroundColor: "#2A3663", padding: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16 }
});

export default CategorySelectionModal;