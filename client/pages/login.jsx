FlowRouter.route('/login', {
    action() {
        ReactLayout.render(Layout, {content: <Login/>});
    }
});
Login = React.createClass({
    render() {
        return (
            <IncludeTemplate template={Template.atForm} />
        )
    }
});
LoginButton = React.createClass({
    render() {
        return (<IncludeTemplate template={Template.loginButtons} />);
    }
});