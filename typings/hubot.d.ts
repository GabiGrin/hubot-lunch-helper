declare module 'hubot' {

  export class Adapter {
    name: string;
    sendPrivate(envelope: any, ...strings);
    destroy();
  }

  export class User {
    constructor(userName: string, options: {room: string; });
  }

  export class TextMessage {
    constructor(user: User, message: string);
  }

  export class Robot {
    name: string;
    constructor(adapterPath, adapter, httpd, name, alias?);
    adapter: Adapter;
    server: any;
    emit: any;
    brain: any;

    loadFile(folder, file);
    shutdown();
    receive(msg: TextMessage, cb: any);
  }

  export class Response {
    envelope: any;
    robot: Robot;
  }

  export class Bob {
    hi(): number;
  }
}
