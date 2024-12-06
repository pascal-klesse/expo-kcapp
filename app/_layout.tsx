import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AuthContextProvider from "@/contexts/AuthContext";
import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AuthContextProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}} />
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
              </Stack>
          </AuthContextProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
  );
}
