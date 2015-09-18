Template.editProject.onCreated(function () {

});
Template.editProject.helpers({
    defaultSubmissionDate: function () {
        return new Date();
    },
    bountyType: function () {
        return false;
    },
    typeOptions: function () {
        return [
            {label: 'Collaborate', value: 'collaborate'},
            {label: 'Barter', value: 'barter'},
            {label: 'Bounty', value: 'bounty'}
        ]
    },
    activeProject: function (type) {
    }
});
Template.editProject.events({
    submitProject: function () {
        if (!AutoForm.validateForm('newProject')) return;

        var doc = AutoForm.getFormValues('newProject').insertDoc;
        console.log("insert project called: " + JSON.stringify(doc));
        Meteor.call('insertProject', doc, function (err, res) {
            if (err) {
                console.error("An error has occured! " + err.description);
            } else {
                Router.go('/');
            }
        });
    }
});