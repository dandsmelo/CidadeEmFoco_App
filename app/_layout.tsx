import { FlashMessageProvider } from "@/components/FlashMessageContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <FlashMessageProvider>
      <Slot />
    </FlashMessageProvider>
  );
}
