///<reference path="../typings/tsd.d.ts" />

import {MockRobot, Helper} from './_mock-robot';
import {Promise} from 'es6-promise';
import * as assert from 'assert';
import * as hubot from 'hubot';

import {expect} from 'chai';
import {MockRoom} from './_mock-robot';
// import ava from 'ava';

//
describe('test', function () {
  let room: MockRoom, helper: Helper;
  beforeEach(() => {
    helper = new Helper('../dist/script.js');
    room = helper.createRoom();
  });

  it('should say hi', function () {
    return room.user.say('me', 'hi')
      .then(() => {
        expect(room.messages).to.deep.equal(['hi', '@me hi']);
      });
  });

  it('should add manual places', () => {
    let newRestaurantName = 'Bob\'s Place';
    let address = 'Bob street 1';
    return room.user.say('someone', '@hubot add a new restaurant')
      .then(() => {
        expect(room.messages).to.include('@someone sure! what is the name of the restaurant?');
        return room.user.say('someone', newRestaurantName);
      })
      .then(() => {
        expect(room.messages).to.include(`@someone got it! "${newRestaurantName}" was added`);
        expect(room.robot.brain.get('restaurants')).to.include(newRestaurantName);
      });
  });

  it('should cancel adding manual place if user asks', () => {
    return room.user.say('someone', '@hubot add a new restaurant')
      .then(() => {
        return room.user.say('someone', '@hubot cancel');
      })
      .then(() => {
        console.log(room.messages);
        expect(room.messages).to.include('@someone ok, not adding a new one');
      });
  });

  xit('should start deciding what to eat', () => {
    throw 'todo';
  });

  xit('should get places to eat from 10bis', () => {
    throw 'todo';
  });

  xit('should reply to place voting when deciding where to eat', () => {
    throw 'todo';
  });

  xit('should ignore food deicisions when not deciding when to eat', () => {
    throw 'todo';
  });

  xit('should announce a winner after a place was decided', () => {
    throw 'todo';
  });

  xit('should skip to the next place if not enough votes', () => {
    throw 'todo';
  });

  xit('should start manual vote when someone asks to', () => {
    throw 'todo';
  });

  xit('should blacklist restaurants', () => {
    throw 'todo';
  });

  xit('should show blacklisted restaurants', () => {
    throw 'todo';
  });

  afterEach(() => {
    room.destroy();
  });

});

// test('bot should say h2i', t => {
//   let robot = new MockRobot();
//   let room = MockRobot.buildRoom();
//   room.user.say('gabi', 'hi bob');
//   throw new Error(hubot.robot);
//   t.end();
// });
