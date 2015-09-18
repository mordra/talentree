Template.landing.onCreated(function () {
    this.subscribe('projects');
});

Template.landing.helpers({
    projects: function () {
        return db.Projects.find();
    }
});