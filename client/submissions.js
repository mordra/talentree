Template.submissions.onCreated(function () {
    var t = Template.instance();
    this.subscribe('project', t.id);
});

Template.submissions.helpers({
    submissions: function () {
        var t = Template.instance();
        var p = db.Projects.findOne(t.id);
        return p? p.submissions : [];
    }
});