FlowRouter.route('/login', {
    action() {
        ReactLayout.render(Layout, {content: <Login/>});
    }
});
