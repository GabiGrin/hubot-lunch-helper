import {Robot} from 'hubot';

declare var module: any;

class LunchHelper {
  isAddingNewRestaurant = false;
  constructor (private robot: Robot) {}

  private restaurantsKey = 'restaurants';

  private addRestaurant(name) {
    let restaurants = this.robot.brain.get<string[]>(this.restaurantsKey) || [];
    restaurants.push(name);
    this.robot.brain.set(this.restaurantsKey, restaurants);
  }

  addNewRestaurantIfNeeded(msg) {
    if (this.isAddingNewRestaurant) {
      let name = msg.match[1];
      if (name) {
        msg.reply(`got it! "${name}" was added`);
        this.addRestaurant(name);
        this.isAddingNewRestaurant = false;
      }
    }
  }

  abortRestaurantAddIfNeeded(msg) {
    if (this.isAddingNewRestaurant) {
      this.isAddingNewRestaurant = false;
      msg.reply('ok, not adding a new one');
    }
  }
}

module.exports =  function (robot: any) {
  let lunchHelper = new LunchHelper(robot);

  robot.hear(/hi$/i,  msg => msg.reply('hi'));

  robot.hear(/.*cancel.*/i, msg => {
    lunchHelper.abortRestaurantAddIfNeeded(msg);
  });

  robot.hear(/\s*(.*)\s*/i, msg => {
    lunchHelper.addNewRestaurantIfNeeded(msg);
  });

  robot.respond(/add.*new.*restaurant/i, msg => {
    lunchHelper.isAddingNewRestaurant = true;
    msg.reply('sure! what is the name of the restaurant?');
  });

};
