Meteor.methods({
    'SubmitProject': function (project) {

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
    }
});