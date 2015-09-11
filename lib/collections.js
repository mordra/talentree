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
    }
});

db.Projects = new Mongo.Collection('projects');
db.Projects.attachSchema(db.Schemas.Project);