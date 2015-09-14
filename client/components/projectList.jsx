ProjectList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe('projects');
        return {
            projects: db.Projects.find().fetch()
        };
    },
    renderProject (project, i) {
        console.log('project: ' + project.name);
        var projectUrl = "/project/" + project._id;
        return (
            <a href={projectUrl} className="ui basic fluid button" key={i}>
                <div className="ui left aligned grid">
                    <div className="ten wide column"><h1>{project.name}</h1></div>
                    <div className="six wide right aligned column">
                        <div className="label">{project.bounty ? project.bounty : "Make an offer"}</div>
                    </div>
                <div className="sixteen wide column">
                    <span className="grey">Submission Date: {moment(project.submissionDate).format("MMM Do YY")}</span>
                </div>
                </div>
            </a>
        )
    },
    render() {
        return (
            <div className="ui one column segment container">
                {_.map(this.data.projects, this.renderProject)}
            </div>
        )
    }
});