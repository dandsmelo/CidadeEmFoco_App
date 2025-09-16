import { FlashMessageProvider } from "@/components/FlashMessageContext";
import { AuthProvider } from "@/hook/auth/useAuth";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <FlashMessageProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </FlashMessageProvider>
  );
}
