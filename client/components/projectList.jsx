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
        return (
            <div className="ui segment" key={i}>
                <div className="ui label floated right">{project.bounty?project.bounty:"Make an offer"}</div>
                <div className="header">{project.name}</div>
                <div className="ui label">Submission Date:
                    <span className="details">{moment(project.submissionDate).format("MMM Do YY")}</span>
                </div>
            </div>
        )
    },
    render() {
        return (
            <div className="ui segments">
                {_.map(this.data.projects, this.renderProject)}
            </div>
        )
    }
});