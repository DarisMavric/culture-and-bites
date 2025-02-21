import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '422876512797-iilsd83p7i8btfnqh75q6kmdri4dg0pj.apps.googleusercontent.com',
        redirectUri: 'https://ildnbdoakruawnyximlx.supabase.co/auth/v1/callback',
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            signInWithGoogle(id_token);
        }
    }, [response]);

    const signInWithGoogle = async (idToken) => {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
        });

        if (error) {
            console.error('Login error:', error);
        } else {
            console.log('User:', data);
        }
    };

    return <Button title="Login with Google" onPress={() => promptAsync()} />;
}