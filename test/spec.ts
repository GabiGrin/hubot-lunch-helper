///<reference path="../typings/tsd.d.ts" />

import {MockRobot, Helper} from './_mock-robot';
import {Promise} from 'es6-promise';
import * as assert from 'assert';
import * as hubot from 'hubot';

import * as chai from 'chai';
// import ava from 'ava';

console.log(hubot.Robot);
//
describe('test', function () {
  it('should say hi', function () {
    let helper = new Helper('../dist/script.js');
    let room = helper.createRoom();
    return room.user.say('me', 'hi')
      .then(() => {
        assert.equal(1, 1);
        console.log(room.messages);
        chai.expect(room.messages).to.deep.equal([['me', 'hi'], ['hubot', '@me hi']]);
        room.robot.shutdown();
        room.destroy();
      });
  });

  it('should start deciding what to eat', () => {
    throw 'todo';
  });

  it('should get places to eat from 10bis', () => {
    throw 'todo';
  });

  it('should reply to place voting when deciding where to eat', () => {
    throw 'todo';
  });

  it('should ignore food deicisions when not deciding when to eat', () => {
    throw 'todo';
  });

  it('should announce a winner after a place was decided', () => {
    throw 'todo';
  });

  it('should skip to the next place if not enough votes', () => {
    throw 'todo';
  });

  it('should start manual vote when someone asks to', () => {
    throw 'todo';
  });

  it('should blacklist restaurants', () => {
    throw 'todo';
  });

  it('should show blacklisted restaurants', () => {
    throw 'todo';
  });

  it('should add manual places', () => {
    throw 'todo';
  });

});

// test('bot should say h2i', t => {
//   let robot = new MockRobot();
//   let room = MockRobot.buildRoom();
//   room.user.say('gabi', 'hi bob');
//   throw new Error(hubot.robot);
//   t.end();
// });
