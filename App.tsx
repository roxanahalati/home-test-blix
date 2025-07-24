import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatBottomSheet from "./src/features/home/components/ChatBottomSheet";
import Home
 from "./src/features/home/screens/HomePage";
export type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {() => (
            <>
              <Home openSheet={() => setSheetVisible(true)} />
              {sheetVisible && (
                <ChatBottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} />
              )}
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
