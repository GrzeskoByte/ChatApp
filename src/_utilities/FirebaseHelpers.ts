import { firestore } from "./Firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { filter, forEach, map } from "lodash";
import { UserStore } from "../_stores";

const DEFAULT_COLLECTION_NAME = "Chats";

enum COLLECTIONS {
  MESSAGES = "messages",
  ROOMS = "rooms",
}

export const getRoomsById: any = async (id: string) => {
  try {
    const roomRef = query(
      collection(firestore, COLLECTIONS.ROOMS),
      where("members", "array-contains", id)
    );

    const roomSnap = await getDocs(roomRef);

    const collectionData = map(roomSnap.docs, (room) => ({
      id: room.id,
      ...room.data(),
    }));

    return collectionData;
  } catch (err) {
    return false;
  }
};

export const getMessagesFromRoom: any = async (roomId: string) => {
  try {
    const messagesRef = query(
      collection(firestore, COLLECTIONS.MESSAGES),
      where("roomId", "==", roomId)
    );
    const messagesSnapshot = await getDocs(messagesRef);

    return map(messagesSnapshot.docs, (message) => {
      return {
        id: message.id,
        ...message.data(),
      };
    });
  } catch (err) {
    throw new Error("Error while fetching messages");
  }
};

export const joinToRoom = async (roomId: string) => {
  try {
    const roomRef = doc(firestore, COLLECTIONS.ROOMS, roomId);
    const roomSnapshot = await getDoc(roomRef);
    console.log(roomSnapshot);

    if (
      roomSnapshot.exists() &&
      !roomSnapshot.data()["members"].includes(UserStore.getUser().uid)
    ) {
      const newRoomObject = { ...roomSnapshot.data() };
      newRoomObject["members"] = [
        UserStore.getUser().uid,
        ...newRoomObject["members"],
      ];

      updateDoc(roomRef, newRoomObject);
    } else {
      throw new Error("Following room does not exist");
    }
  } catch (err) {
    throw new Error("Unhandled error.");
  }
};
