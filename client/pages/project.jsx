FlowRouter.route('/project/:id?', {
    action(params) {
        console.log("Going to project: " + params.id);
        if (params.id === 'new') {
            ReactLayout.render(Layout, {content: <EditProject id={params.id} />});
        } else {
            ReactLayout.render(Layout, {content: <Project id={params.id} /> });
        }
    }
});

Project = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe('project', this.props.id);
        return {
            project: db.Projects.findOne(this.props.id)
        };
    },
    render() {
        return (
            <div>
                <h1>{this.data.project?this.data.project.name:'Loading...'}</h1>
                <p>{this.data.project?this.data.project.description:''}</p>

            </div>
        );
    }
});