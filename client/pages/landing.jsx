FlowRouter.route('/', {
    action() {
        ReactLayout.render(Layout, {content: <Landing/>});
    }
});

Landing = React.createClass({
    render() {
        return (
            <div className="container">
                <h1>
                    Welcome to Talentree!
                </h1>
            </div>
        );
    }
});