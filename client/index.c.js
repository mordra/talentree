Template.index.onCreated(function () {
    this.subscribe('projects');
});

Template.index.helpers({
    projects: function () {
        return db.Projects.find();
    }
});