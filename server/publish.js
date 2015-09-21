Meteor.publish(null, function () {
    return Meteor.users.find();
});

Meteor.publish('projects', function () {
    return db.Projects.find();
});

Meteor.publishComposite('project', function (id) {
    return {
        find: function () {
            return db.Projects.find(id);
        },
        children: [
            {
                find: function (project) {
                    return db.Submissions.find({_id: {$in: project.submissions}});
                }
            }
        ]
    }
});