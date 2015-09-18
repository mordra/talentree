Meteor.startup(function () {
    if (Meteor.isClient) {
        AutoForm.setDefaultTemplate("semanticUI");
    }
});

tt = {};

tt.Category = {
    'Music': {
        'Composer': 'Composer',
        'Bassist': 'Bassist',
        'Cellist': 'Cellist',
        'Conductor': 'Conductor',
        'DJ': 'DJ',
        'Drummer': 'Drummer',
        'Guitarist': 'Guitarist',
        'Pianist': 'Pianist',
        'Rapper': 'Rapper',
        'Saxophonist': 'Saxophonist',
        'Trumpeter': 'Trumpeter',
        'Violinist': 'Violinist',
        'Vocalist': 'Vocalist'
    },
    'FilmVideo': {
        'Actor': 'Actor',
        'Actress': 'Actress',
        'CostumeDesigner': 'CostumeDesigner',
        'CostumeStylist': 'CostumeStylist',
        'Stuntman': 'Stuntman',
        'Videographer': 'Videographer'
    },
    'PhotographyArts': {
        'Cartoonist': 'Cartoonist',
        'GraffitiArtist': 'GraffitiArtist',
        'Magician': 'Magician',
        'Painter': 'Painter',
        'Photographer': 'Photographer',
        'Sculptor': 'Sculptor'
    },
    'Modelling': {
        'FashionDesigner': 'FashionDesigner',
        'Hairstylist': 'Hairstylist',
        'MakeupArtist': 'MakeupArtist',
        'Model': 'Model'
    },
    'Dance': {
        'Backup': 'Backup',
        'Choreographer': 'Choreographer',
        'Lead': 'Lead'
    }
};