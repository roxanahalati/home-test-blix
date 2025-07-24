import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import styles from "./chatBottomSheet.styles";

const BOT_RESPONSES = [
  "Hello! How can I assist you today?",
  "Of course, I can help you with that!",
  "Is there anything else you’d like to know?",
  "Here is a simulated answer.",
  "Great, got it!",
  "Do you need more help?",
  "I can explain further if needed.",
  "Ask me anything!",
  "Let me reply right away!",
  "Thank you for your question!",
];

const FOLLOW_UPS = [
  "Tell me more!",
  "How else can you help?",
  "What’s next?",
  "Can you elaborate?",
  "Give me an example.",
  "Change the topic.",
  "I want more details.",
  "Thanks!",
  "I’m curious.",
  "Let's continue.",
];

export type Message = {
  id: string;
  from: "user" | "bot";
  text: string;
  followUps?: string[];
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_MIN_HEIGHT = 120;
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.85;

type ChatBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
};

const ChatBottomSheet: React.FC<ChatBottomSheetProps> = ({ visible, onClose }) => {
  const sheetHeight = useSharedValue<number>(SHEET_MIN_HEIGHT);
  const backdropOpacity = useSharedValue<number>(0);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      from: "bot",
      text: "Welcome! Type a question to start chatting.",
      followUps: getRandomFollowUps(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!closing) {
      sheetHeight.value = withTiming(SHEET_MAX_HEIGHT * 0.45, { duration: 250 });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [closing]);

  useEffect(() => {
    if (closing) {
      backdropOpacity.value = withTiming(0, { duration: 160 });
      sheetHeight.value = withTiming(SHEET_MIN_HEIGHT, { duration: 200 });
      const timer = setTimeout(() => {
        onClose();
        setClosing(false);
      }, 210);
      return () => clearTimeout(timer);
    }
  }, [closing]);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      expandSheet();
    });
    return () => show.remove();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 120);
    }
  }, [messages, loading]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: sheetHeight.value,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(backdropOpacity.value, [0, 1], [0, 0.5]),
    backgroundColor: "#000",
    ...StyleSheet.absoluteFillObject,
  }));

  function expandSheet() {
    setExpanded(true);
    sheetHeight.value = withSpring(SHEET_MAX_HEIGHT, { damping: 32 });
  }

  function collapseSheet() {
    setExpanded(false);
    sheetHeight.value = withSpring(SHEET_MAX_HEIGHT * 0.45, { damping: 32 });
  }

  let startY = 0;
  let startHeight = 0;
  function onDragStart(e: any) {
    startY = e.nativeEvent.pageY;
    startHeight = sheetHeight.value;
  }
  function onDragMove(e: any) {
    let delta = startY - e.nativeEvent.pageY;
    let next = Math.max(
      SHEET_MIN_HEIGHT,
      Math.min(SHEET_MAX_HEIGHT, startHeight + delta)
    );
    sheetHeight.value = next;
  }
  function onDragEnd(e: any) {
    let shouldExpand = sheetHeight.value > SHEET_MAX_HEIGHT * 0.6;
    if (shouldExpand) {
      expandSheet();
    } else {
      collapseSheet();
    }
  }

  function handleSend(text: string) {
    if (!text.trim() || loading) return;
    setLoading(true);
    setMessages((msgs) => [
      ...msgs,
      { id: Date.now() + "_u", from: "user", text, followUps: [] },
    ]);
    setInput("");

    setTimeout(() => {
      const reply =
        BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      const followUps = getRandomFollowUps();
      setMessages((msgs) => [
        ...msgs,
        { id: Date.now() + "_b", from: "bot", text: reply, followUps },
      ]);
      setLoading(false);
    }, Math.random() * 2000 + 1000);
  }

  function handleFollowUp(option: string) {
    handleSend(option);
  }

  function handleBackdropPress() {
    setClosing(true);
  }

  const lastBotIndex = messages
    .map((m, idx) => (m.from === "bot" && m.followUps && m.followUps.length > 0 ? idx : -1))
    .filter(idx => idx !== -1)
    .pop();

  return (
    <>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={[backdropStyle]} pointerEvents="auto" />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, animatedStyle]}>
        <View
          style={styles.dragArea}
          onStartShouldSetResponder={() => true}
          onResponderGrant={onDragStart}
          onResponderMove={onDragMove}
          onResponderRelease={onDragEnd}
        >
          <View style={styles.dragHandle} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <FlatList
            ref={flatListRef}
            style={{ flex: 1, paddingHorizontal: 18 }}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.msgRow,
                  item.from === "user" ? styles.msgRowUser : styles.msgRowBot,
                ]}
              >
                <View
                  style={[
                    styles.msgBubble,
                    item.from === "user"
                      ? styles.msgBubbleUser
                      : styles.msgBubbleBot,
                  ]}
                >
                  <Text
                    style={[
                      styles.msgText,
                      item.from === "user"
                        ? styles.msgTextUser
                        : styles.msgTextBot,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
                {item.from === "bot" &&
                  item.followUps &&
                  item.followUps.length > 0 &&
                  !loading &&
                  index === lastBotIndex && (
                    <View style={styles.followUps}>
                      {item.followUps.map((opt, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.followUpBtn}
                          onPress={() => handleFollowUp(opt)}
                        >
                          <Text style={styles.followUpText}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
              </View>
            )}
            ListFooterComponent={
              loading ? (
                <View style={{ alignItems: "flex-start", marginVertical: 4 }}>
                  <ActivityIndicator size="small" color="#3182ce" />
                </View>
              ) : null
            }
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend(input)}
              editable={!loading}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => handleSend(input)}
              disabled={loading || !input.trim()}
            >
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
};

function getRandomFollowUps(): string[] {
  let arr = [...FOLLOW_UPS];
  let first = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
  let second = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
  return [first, second];
}

export default ChatBottomSheet;
