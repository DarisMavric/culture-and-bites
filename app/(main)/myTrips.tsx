import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { supabase } from '../../lib/supabase';

const myTrips = () => {


  return (
    <View style={{flex: 1, backgroundColor: "#FAF6E3"}}>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#2A3663",
  },
  imageText: {
    position: "absolute",
    bottom: 0,
    fontSize: 40,
    margin: 10,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 120,
  },
})

export default myTrips;