import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    elevation: 20,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.11,
    shadowRadius: 14,
    overflow: "hidden",
  },
  dragArea: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#fff",
  },
  dragHandle: {
    width: 38,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#E0E0E0",
    marginBottom: 3,
  },
  msgRow: {
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "85%",
  },
  msgRowUser: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  msgRowBot: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  msgBubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 2,
    maxWidth: 290,
  },
  msgBubbleUser: {
    backgroundColor: "#3182ce",
    borderBottomRightRadius: 4,
  },
  msgBubbleBot: {
    backgroundColor: "#e5eaf4",
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 15,
  },
  msgTextUser: {
    color: "#fff",
  },
  msgTextBot: {
    color: "#263248",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#f2f3f7",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 12,
  },
  sendBtn: {
    backgroundColor: "#3182ce",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  sendBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  followUps: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  followUpBtn: {
    backgroundColor: "#f1f5fc",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 13,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#dde8f6",
  },
  followUpText: {
    color: "#3182ce",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;