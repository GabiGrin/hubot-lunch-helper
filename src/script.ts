// interface Robot {
//   hear
// }
declare var module: any;
module.exports =  function (robot: any) {
  robot.respond(/hi$/i,  msg => msg.reply('hi'));
};
