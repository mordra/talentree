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