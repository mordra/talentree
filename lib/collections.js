db = {};

db.Schemas = {};

db.Schemas.Project = new SimpleSchema({
    name: {
        type: String,
        min: 1
    },
    submissionDate: {
        type: String,
        optional: true
    },
    type: {
        type: String
    },
    bounty: {
        type: Number,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    media: {
        type: [String],
        optional: true
    },
    creativeCategory: {
        type: String,
        optional: true
    },
    owner: {
        type: String
    }

});

db.Schemas.Submission = new SimpleSchema({

});

db.Projects = new Mongo.Collection('projects');
db.Projects.attachSchema(db.Schemas.Project);