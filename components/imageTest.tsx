import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const ImageFetcher = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    try {
      // Pokušaj da preuzmeš sliku koristeći fetch
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error('Image not found');
      }

      // Ako slika postoji, koristi njen direktni URL
      setImageSrc(imageUrl);
    } catch (error) {
      setError('Failed to load image');
      console.error('Error fetching image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Load Image" onPress={fetchImage} />
      {error && <Text style={styles.error}>{error}</Text>}
      {imageSrc ? (
        <Image source={{ uri: imageSrc }} style={styles.image} />
      ) : (
        <Text>No image loaded</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
});

export default ImageFetcher;
