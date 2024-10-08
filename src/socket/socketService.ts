import { io, Socket } from "socket.io-client";
import { ElMessage } from "element-plus";
import { useOrder } from "@/composables/useOrder";
import { ORDER_STATUS } from "@/common/enum";
import { useNotification } from "@/composables/useNotification";

class SocketService {
  socket: Socket;
  constructor() {
    this.socket = io("http://localhost:5000", {
      query: {
        userId: JSON.parse(localStorage.getItem("user") as string)?.id || null,
      },
    });
  }

  connect() {
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    this.socket.on("message", (message) => {
      console.log("Message from server:", message);
    });

    this.socket.on("notify-order", (message) => {
      ElMessage.success(message);
      useOrder().getOrders({ orderStatus: ORDER_STATUS.PENDING });
    });

    this.socket.on("notify-update-order", (message) => {
      ElMessage.success(message);
      useNotification().getNotification();
    });
  }

  sendAdminSocketId() {
    this.socket.emit("admin-socket-id", this.socket.id);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();
