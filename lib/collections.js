db = {};

db.Schemas = {};

db.Schemas.Project = new SimpleSchema({
    name: {
        type: String,
        min: 1
    },
    submissionDate: {
        type: Date,
        optional: true,
        defaultValue: new Date()
    },
    projectType: {
        type: String,
        autoform: {
            type: 'select'
        }
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
    'media.$': {
        type: String,
        label: "URL",
        regEx: SimpleSchema.RegEx.Url
    },
    creativeCategory: {
        type: [Object],
        optional: true
    },
    'creativeCategory.$': {
        type: Object
    },
    'creativeCategory.$.category': {
        type: String,
        autoform: {
            type: 'select',
            options: function () {
                return [
                    {
                        itemGroup: "Music",
                        items: [
                            {value: 'Composer', label: 'Composer'},
                            {value: 'Bassist', label: 'Bassist'},
                            {value: 'Cellist', label: 'Cellist'},
                            {value: 'Conductor', label: 'Conductor'},
                            {value: 'DJ', label: 'DJ'},
                            {value: 'Drummer', label: 'Drummer'},
                            {value: 'Guitarist', label: 'Guitarist'},
                            {value: 'Pianist', label: 'Pianist'},
                            {value: 'Rapper', label: 'Rapper'},
                            {value: 'Saxophonist', label: 'Saxophonist'},
                            {value: 'Trumpeter', label: 'Trumpeter'},
                            {value: 'Violinist', label: 'Violinist'},
                            {value: 'Vocalist', label: 'Vocalist'}
                        ]
                    },
                    {
                        itemGroup: "FilmVideo",
                        items: [
                            {value: 'Actor', label: 'Actor'},
                            {value: 'Actress', label: 'Actress'},
                            {value: 'CostumeDesigner', label: 'CostumeDesigner'},
                            {value: 'CostumeStylist', label: 'CostumeStylist'},
                            {value: 'Stuntman', label: 'Stuntman'},
                            {value: 'Videographer', label: 'Videographer'}
                        ]
                    },
                    {
                        itemGroup: "PhotographyArts",
                        items: [
                            {value: 'Cartoonist', label:'Cartoonist'},
                            {value: 'GraffitiArtist', label:'GraffitiArtist'},
                            {value: 'Magician', label:'Magician'},
                            {value: 'Painter', label:'Painter'},
                            {value: 'Photographer', label:'Photographer'},
                            {value: 'Sculptor', label:'Sculptor'}
                        ]
                    },
                    {
                        itemGroup: "Modelling",
                        items: [
                            {value: 'FashionDesigner', label: 'FashionDesigner'},
                            {value: 'Hairstylist', label: 'Hairstylist'},
                            {value: 'MakeupArtist', label: 'MakeupArtist'},
                            {value: 'Model', label: 'Model'}
                        ]
                    },
                    {
                        itemGroup: "Dance",
                        items: [
                            {value: 'Backup', label: 'Backup'},
                            {value: 'Choreographer', label: 'Choreographer'},
                            {value: 'Lead', label: 'Lead'}
                        ]
                    }
                ]
            }
        }
    },
    'creativeCategory.$.amt': {
        type: Number,
        defaultValue: 1
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            type: 'hidden'
        }
    },
    submissions: {
        type: [String],
        optional: true
    }

});

db.Schemas.Submission = new SimpleSchema({
    projectId: {
        type: String,
        optional: true
    },
    owner: {
        type: String,
        optional: true
    },
    description: {
        type: String
    },
    media: {
        type: [String]
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    liked: {
        type: Boolean,
        optional: true
    }
});

db.Projects = new Mongo.Collection('projects');
db.Projects.attachSchema(db.Schemas.Project);

db.Submissions = new Mongo.Collection('submissions');
db.Submissions.attachSchema(db.Schemas.Submission);

if (Meteor.isServer) {
    db.Submissions.permit(['insert', 'update']).apply();
}
