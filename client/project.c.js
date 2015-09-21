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

function getEmbedUrl(url) {
    if (url.toLowerCase().indexOf('youtube') > -1)
        return "https://www.youtube.com/embed/"+Util.YouTubeGetID(url);
    else if (url.toLowerCase().indexOf('vimeo') > -1) {
        return "https://player.vimeo.com/video/"+Util.VimeoGetId(url);
    }
}

function getShortDescription(str) {
    if (str.length < 200) return str;

    return str.substr(0, 200) + "...";
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
    },
    prettifySubmission: function (submission) {
        submission.embedUrl = getEmbedUrl(submission.media[0]);
        submission.shortDescription = getShortDescription(submission.description);
        return submission;
    },
    submissions: function () {
        var t = Template.instance();
        var p = t.state('project');
        if (!p) return [];

        return submissions = db.Submissions.find({_id:{$in:p.submissions}});
    },
    isLiked: function () {
        return this.liked ? 'active': '';
    }
});

Template.project.events({
    'likeSubmission': function (e, t) {
        var submission = db.Submissions.findOne(this._id);
        this.liked = !this.liked;
        db.Submissions.update({_id:this._id}, {$set:{liked: this.liked}});
    }
});