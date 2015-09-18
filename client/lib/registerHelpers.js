Template.registerHelper('prettyDate', function (date) {
    return moment(date).format("MMM Do YY");
});

