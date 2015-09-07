var Notification = new Meteor.Collection("notification");
var remote = DDP.connect('http://sensit.meteor.com/');
var RemoteNotification = new Meteor.Collection('notification', { connection: remote });
var isFlying = false;


RemoteNotification.find().observe({
  added: function(notification) {
    console.log('-- remote item --');
    console.log(notification);
    Notification.upsert({_id: notification._id}, {$set: notification});
  }
});
remote.subscribe('remote-button');

rollingSpider.connect(Meteor.bindEnvironment(function () {
  rollingSpider.setup(Meteor.bindEnvironment(function () {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    Notification.find().observe({
      added: function (notification) {
        if (!isFlying) {
          isFlying = true;
          rollingSpider.takeOff();
          rollingSpider.flatTrim();
        }
      }
    });
  }));
}));
