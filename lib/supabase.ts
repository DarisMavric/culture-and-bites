import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

const supabaseUrl = 'https://ildnbdoakruawnyximlx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZG5iZG9ha3J1YXdueXhpbWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODQ2MTQsImV4cCI6MjA1NTY2MDYxNH0.nujXleU4JCeHZN4docEWBF7E3Jv6GDhARYKiQLzWlms'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})


AppState.addEventListener('change',(state) => {
  if(state === 'active'){
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
})