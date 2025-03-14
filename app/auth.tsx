import Auth from '@/components/Auth';
import { Stack } from 'expo-router';

export default function AuthScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <Auth />
    </>
  );
}
