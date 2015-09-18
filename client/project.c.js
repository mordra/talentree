Router.route('/project/:id/:subPage?', function () {
    if (this.params.subPage === 'submit') {
        this.render('submit');
    } else {
        this.render('project');
    }
});

Template.project.onCreated(function () {
    console.log("Goto: Project");
    var self = this;
    Util.setTemplateState(this, {
        'project':null,
        'subPage': Router.current().params.subPage || 'details'
    });
    var id = Router.current().params.id;
    this.subscribe('project', id, function () {
        var project = db.Projects.findOne(id);
        self.state('project', project);
    });

    Tracker.autorun(function () {
        self.state('subPage', Router.current().params.subPage);
    })
});

function daysAway(project) {
    var due = moment(project.submissionDate);
    return due.diff(moment(), 'days');
}

Template.project.helpers({
    isSubPage: function (subpage) {
        return Template.instance().state('subPage') === subpage;
    },
    isSubPageActive: function (subpage) {
        return (Template.instance().state('subPage') === subpage)?'active':'';
    },
    isParticipate: function () {
        var project = Template.instance().state('project');
        if (!project) return;

        return daysAway(project) >= 0;
    },
    daysAwayPretty: function() {
        var project = Template.instance().state('project');
        if (!project) return;
        return daysAway(project) === 0 ? "Today" : moment(project.submissionDate)
    }

});