FlowRouter.route('/project/:pid?', {
    action(params) {
        console.log("Going to project: " + params.pid);
        ReactLayout.render(Layout, {content: <Project pid={params.pid}/>});
    }
});

Project = React.createClass({
    propTypes: {
        pid: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div>
                <h1>This is a project ({this.props.pid})</h1>
            </div>
        )
    }
});