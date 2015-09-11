Meteor.publish(null, function () {
    return Meteor.users.find();
});

Meteor.publish('projects', function () {
    return db.Projects.find();
});