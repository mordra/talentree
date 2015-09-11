Meteor.methods({
    'SubmitProject': function (project) {

        // remove extraneous fields
        project = _.pick(project, _.keys(db.Schemas.Project.schema()));

        console.log("Called submit project: " + JSON.stringify(project));
        try {
            check(project, db.Schemas.Project);

            db.Projects.insert(project);
        } catch (e) {
            console.log(e);
        }
    }
});