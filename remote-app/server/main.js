Notification = new Meteor.Collection("notification");

Router.route('/sensit-callback/:type', {where: 'server'})
  .get(function () {
    if (['temperature', 'motion', 'button'].indexOf(this.params.type) < 0)
      throw new Error('Invalid type');

    var notification = _.extend({type: this.params.type}, this.params.query, {data: JSON.parse(this.params.query.data)});

    Notification.insert(notification);
    this.response.end('notification ' + notification.type + ' saved\n');
  });

Meteor.publish("remote-temperature", function (argument) {
  return Notification.find({type: 'temperature'});
});
Meteor.publish("remote-motion", function (argument) {
  return Notification.find({type: 'motion'});
});
Meteor.publish("remote-button", function (argument) {
  return Notification.find({type: 'button'});
});
