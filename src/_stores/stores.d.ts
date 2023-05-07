interface Room {
  id: string;
  members: string[];
  name: string;
}

interface MessagesInteface {
  body: string;
  createdAt: Date;
  roomId: string;
  userId: string;
}

type RoomType = Room[] | null | undefined;
type RoomId = string | null;

type Messages = MessagesInteface | string[] | null;

export { Room, MessagesInteface, RoomType, RoomId, Messages };
