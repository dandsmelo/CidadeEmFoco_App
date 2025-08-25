import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, Text } from "react-native";

type FlashType = "success" | "error" | "warning";

interface FlashMessage {
  text: string;
  type?: FlashType;
}

interface FlashContextType {
  showMessage: (msg: string, type?: FlashType) => void;
}

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<FlashMessage | null>(null);

  const showMessage = (text: string, type: FlashType = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const bgColor =
    message?.type === "error"
      ? "#E72A2A" 
      : message?.type === "warning"
      ? "#FFAC11"
      : "#8FCF57"; 

  return (
    <FlashContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <View
          style={{
            position: "absolute",
            top: 30,
            left: 20,
            right: 20,
            zIndex: 999,
            padding: 12,
            borderRadius: 8,
            backgroundColor: bgColor,
          }}
        >
          <Text style={{ color: "#000", textAlign: "center" }}>
            {message.text}
          </Text>
        </View>
      )}
    </FlashContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlashMessage deve ser usado dentro de FlashMessageProvider");
  }
  return context;
};
