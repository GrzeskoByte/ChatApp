import { makeAutoObservable } from "mobx";
import {
  getRoomsById,
  getMessagesFromRoom,
} from "../_utilities/FirebaseHelpers";

import { getCookie, setCookie } from "../_utilities/Helpers";
import { findIndex, isUndefined, map } from "lodash";

import { UserStore } from "./index";

import { Room, MessagesInteface, RoomType, RoomId, Messages } from "./stores";

class RoomStore {
  private roomId: RoomId = null;
  private rooms: RoomType = null;
  private isLoading: Boolean = true;
  private messages: Messages = null;

  constructor() {
    makeAutoObservable(this);

    if (getCookie("roomId") !== "undefined") {
      this.roomId = getCookie("roomId") ?? null;
    }

    if (UserStore.getUser()) {
      this.fetchRoom();
    }
  }

  fetchRoom = async () => {
    this.rooms = await getRoomsById(UserStore.getUser().uid);
    this.fetchMessagesByRoomId();
  };

  getRooms(): RoomType {
    return this?.rooms;
  }

  getIsLoading(): Boolean {
    return this.isLoading;
  }

  getMessages() {
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
    const messages = await getMessagesFromRoom(this.roomId);
    this.messages = messages;
    console.log(messages);
  }

  //setters
  setRoomId(roomId: string) {
    setCookie("roomId", roomId);
    this.roomId = roomId;
  }
}

export default new RoomStore();
