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

TopNav = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    render() {
        var loginLogout = this.data.currentUser ?
            <a href="/">Logout</a> :
            <LoginButton />;

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
                    {loginLogout}
                </div>
            </div>
        )
    }
});