Template.submit.onCreated(function () {
    console.log("Goto: Submit");
    var self = this;
    Util.setTemplateState(this, {
        'medias':[]
    });
    var id = Router.current().params.id;
    this.subscribe('project', id, function () {
        self.state('project', db.Projects.findOne(id));
    });
});

Template.submit.helpers({

});

Template.submit.events({
    uploadImage: function (e, t) {
        var files = $("input.file_bag")[0].files;

        S3.upload({
            files:files,
            path:"subfolder"
        },function(e,r){
            console.log(r);
        });
    },
    submit: function (e, t) {
        var doc = AutoForm.getFormValues('projectSubmission').insertDoc;
        doc.projectId = t.state('project')._id;

        if (!AutoForm.validateForm('projectSubmission')) return;

        console.log("submit to project: " + JSON.stringify(doc));
        Meteor.call('insertSubmission', doc, function (err, res) {
            if (err) {
                console.error("An error has occured! " + err.description);
            } else {
                Router.go('/');
            }
        });
    }
});