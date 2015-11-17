import {Promise} from 'es6-promise';
import * as hubot from 'hubot';
import * as path from 'path';
import * as fs from 'fs';

export class MockResponse extends hubot.Response {
  sendPrivate(...strings) {
    this.robot.adapter.sendPrivate(this.envelope, ...strings);
  }

  constructor() {
    super();
  }
}

class MockBrain extends hubot.Brain {
  data = {};

  constructor() {
    super();
  }

  set<T>(key: string, value: T) {
    this.data[key] = value;
  }

  get<T>(key: string) {
    return this.data[key];
  }
}

export class MockRobot extends hubot.Robot {

  adapter: MockRoom;

  brain: MockBrain;

  constructor(name = 'hubot', httpd = true) {
    super(null, null, httpd, name);
  }

  loadAdapter() {
    this.adapter = new MockRoom(this);
  }

}

export class MockRoom extends hubot.Adapter {

  messages: string[] = [];

  privateMessages: {[user: string]: string[]};

  user = {
    say: (userName, message) => {
      return this.receive(userName, message);
    }
  };

  robot: MockRobot;

  constructor(robot: MockRobot) {
    super();
    this.robot = robot;
  }
  /*
  user = new Hubot.User(userName, { room: @name })
     @robot.receive(new Hubot.TextMessage(user, message), resolve)

     */
  receive(userName, message) {
    return new Promise(resolve => {
      this.messages.push(message);
      let user = new hubot.User(userName, {room: this.name});
      this.robot.receive(new hubot.TextMessage(user, message), resolve);
    });
  }

  destroy() {
    console.log(this.robot.server.close);
    this.robot.server.close();
  }

  reply(envelope, ...strings) {
    console.log('replying!');
    strings.forEach(str => {
      this.messages.push(`@${envelope.user.name} ${str}`);
    });
  }

  sendPrivate(envelope, ...strings) {
    let userName = envelope.user.name;
    if (!this.privateMessages[userName]) {
      this.privateMessages[userName] = [];
    }
    strings.forEach(str => {
      this.privateMessages[userName].push(str);
    });
  }

  robotEvent() {
    this.robot.emit.apply(this.robot, arguments);
  }
}

export class Helper {
  Response = MockResponse;
  scriptsPath: string;

  constructor(scriptsPath) {
    this.scriptsPath = path.resolve(path.dirname(module.parent.filename), scriptsPath);
  }

  createRoom(options = {}) {
    let robot = new MockRobot();
    let sp = this.scriptsPath;

    if (fs.statSync(sp).isDirectory()) {
        fs.readdirSync(sp)
          .sort()
          .forEach(file => robot.loadFile(sp, file));
    } else {
      robot.loadFile(path.dirname(sp), path.basename(sp));
    }

    robot.brain.emit('loaded');

    robot.adapter.name = 'room1';

    return robot.adapter;
  }
}
