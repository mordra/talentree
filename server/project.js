Meteor.methods({
    'insertProject': function (project) {
        console.log('Insert project called: ' + JSON.stringify(project));

        // remove extraneous fields
        project = _.pick(project, _.keys(db.Schemas.Project.schema()));
        if (project.bounty) {
            var bounty =  parseInt(project.bounty);
            if (bounty && _.isNumber(bounty) && !_.isNaN(bounty)) {
                project.bounty = bounty;
            } else {
                console.log("Bounty is not a number: " + project.bounty);
                throw new Meteor.Error("Bad input", "Bounty is not a number.");
            }
        }

        check(project, db.Schemas.Project);
        db.Projects.insert(project);
    },
    'insertSubmission': function (submission) {
        console.log('Insert submission ' + JSON.stringify(submission));

        submission = _.pick(submission, _.keys(db.Schemas.Submission.schema()));
        submission.createdAt = new Date();
        check(submission, db.Schemas.Submission);
        var submissionId = db.Submissions.insert(submission);
        db.Projects.update({_id:submission.projectId}, {$push:{submissions:submissionId}});

    }
});