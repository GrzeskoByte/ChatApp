import { makeAutoObservable } from "mobx";
import {
  getMessagesFromRoom,
  getRoomsById,
} from "../_utilities/FirebaseHelpers";

import { findIndex, map } from "lodash";
import { getCookie, setCookie } from "../_utilities/Helpers";

import { firestore } from "../_utilities/Firebase";

import { query, where, collection, onSnapshot } from "firebase/firestore";

import { UserStore } from "./index";

import { MessagesType, Room, RoomId, RoomType } from "./stores";

class RoomStore {
  private roomId: RoomId = null;
  private rooms: RoomType = null;
  private messages: MessagesType = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadData() {
    if (UserStore.getUser()) {
      this.fetchRoom();
    }

    if (getCookie("roomId") !== "undefined") {
      this.roomId = getCookie("roomId") ?? null;
    }
  }

  fetchRoom = async () => {
    this.rooms = await getRoomsById(UserStore.getUser().uid);
    this.fetchMessagesByRoomId();
  };

  getRooms(): RoomType {
    return this?.rooms;
  }

  getMessages(): MessagesType {
    return this.messages;
  }

  getRoomId(): RoomId {
    return this?.roomId;
  }

  get getRoomsItems() {
    return map(this?.rooms, (room) => {
      return {
        label: room.name,
        key: room.id,
        onClick: (e: any) => {
          this.setRoomId(e.key);
          this.loadData();
        },
      };
    });
  }

  get currentRoom(): Room | null {
    if (!this.rooms) return null;

    const indexOfCurrentGroup = findIndex(
      this.rooms,
      (room) => room.id === this.roomId
    );

    return this?.rooms[indexOfCurrentGroup];
  }

  get currentRoomName(): string {
    if (!this.currentRoom) return "";
    return this.currentRoom?.name;
  }

  private async fetchMessagesByRoomId() {
    const messagesRef = query(
      collection(firestore, "messages"),
      where("roomId", "==", this.getRoomId() ?? "")
    );

    onSnapshot(messagesRef, (snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          const newMessage = change.doc.data();
          this.addMessage(newMessage);
          this.loadData();
        }
      });
    });

    const messages = await getMessagesFromRoom(this.roomId);
    this.setMessages(messages);
  }

  //setters

  setRoomId(roomId: string): void {
    setCookie("roomId", roomId);
    this.roomId = roomId;
  }

  setMessages(messages: MessagesType): void {
    this.messages = messages;
  }

  //actions

  addMessage(message: any): void {
    this.messages?.push(message);
  }
}

export default new RoomStore();
