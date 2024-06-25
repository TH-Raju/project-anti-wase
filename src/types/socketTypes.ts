import { Socket } from 'socket.io-client';

// server to get any event by client
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  //
  connection: (data: Record<string, any>) => void;
  joinRoomFromData: (data: Record<string, any>) => void;
  user_joined: (data: Record<string, any>) => void;
  message: (data: Record<string, any>) => void;
  error: (err: Error) => void;
}

//send events client to server
interface ClientToServerEvents {
  hello: () => void;
  //
  sendMessage: (props: { room?: string } & Record<string, any>) => void;
  sendJoinRoom: (props: { room?: string } & Record<string, any>) => void;
  message: (props: string) => void;
}

export type ISocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
