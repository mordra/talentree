Layout = React.createClass({
    render() {
        return (
            <div>
                <TopNav/>
                <main>{this.props.content}</main>
            </div>
        );
    }
});

IncludeTemplate = React.createClass({
    componentDidMount: function() {
        var componentRoot = React.findDOMNode(this);
        var parentNode = componentRoot.parentNode;
        parentNode.removeChild(componentRoot);
        return Blaze.renderWithData(this.props.template, this.props.data?JSON.parse(this.props.data):null, parentNode);
    }, //<-- here, I'm creating the template and passing in data, manual json parsing
    render: function(template) {
        return (<div />)
    }
});
Login = React.createClass({
    render() {
        return (<IncludeTemplate template={Template.loginButtons} />);
    }
});

TopNav = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    render() {
        return (
            <div className="ui top attached menu">
                <a href="/" className="item">
                    <h1>
                        <i className="icon green pagelines"></i>
                        Talentree
                    </h1>
                </a>

                <div className="right menu">
                    <a href="/project/new" className="item">
                        <div className="h2">New Project</div>
                    </a>
                    <a href="/" className="item">{this.data.currentUser?'Logout':'Login'}</a>
                </div>
            </div>
        )
    }
});