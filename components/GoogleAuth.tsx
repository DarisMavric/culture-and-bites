import React, { useState, useRef, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';

// Please refer Section 2 below for obtaining Credentials
const GOOGLE_ANDROID_CLIENT_ID = "422876512797-iilsd83p7i8btfnqh75q6kmdri4dg0pj.apps.googleusercontent.com"
const GOOGLE_iOS_CLIENT_ID = "422876512797-iilsd83p7i8btfnqh75q6kmdri4dg0pj.apps.googleusercontent.com"

export default function GoogleAuth() {

    const [userInfo, setUserInfo] = useState('')

    /******************** Google SignIn *********************/
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "422876512797-iilsd83p7i8btfnqh75q6kmdri4dg0pj.apps.googleusercontent.com",
        iosClientId: "422876512797-iilsd83p7i8btfnqh75q6kmdri4dg0pj.apps.googleusercontent.com"
    })

    useEffect(() => {
        handleSignInWithGoogle();
    }, [response])

    const handleSignInWithGoogle = async () => {
        if (response?.type === "success") {
            await getUserInfo(response.authentication.accessToken);
        }
    }

    const getUserInfo = async (token) => {
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` }
            })

            const user = await response.json();

            console.log(user)
            setUserInfo(user)
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <>
          {/* Google */}
            <TouchableOpacity onPress={() => { promptAsync() }} activeOpacity={0.7}>
              <Text style={{ width: '10%', height: '10%', borderRadius: 25 }}>Sign in With Google</Text>
            </TouchableOpacity>
        </>

    );
}