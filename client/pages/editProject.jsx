EditProject = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return {
            name: '',
            newVideo: '',
            submissionDate:moment(),
            media: [],
            description: '',
            collaborators: {}
        }
    },
    changeSubmissionDate (date) {
        this.setState({submissionDate: date});
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    addVideo() {
        console.log('Adding video: ' + this.state.newVideo);
        this.state.media.push(this.state.newVideo);
        this.setState({newVideo: ''});
    },
    renderVideo(video, key) {
        if (video.indexOf("youtube") > -1)
            return (<Youtube url={video}/>);
        else {
            var id = video.match(/\d*$/);
            if (id.length || _.isNumber(id[0]))
                return (<Vimeo videoId={id}/>);
            else
                return null;
        }
    },
    submitProject() {
        var project = _.extend({}, this.state);
        project.submissionDate = project.submissionDate.format();
        Meteor.call('SubmitProject', project, function () {
            FlowRouter.go('/');
        });
    },
    render() {
        return (
            <div>
                <div className="ui form">
                    <div className="field">
                        <input type="text" placeholder="Name your project..." valueLink={this.linkState('name')}/>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <textarea name="" id="" rows="5" valueLink={this.linkState('description')}></textarea>
                    </div>

                    <DatePicker onChange={this.changeSubmissionDate} selected={this.state.submissionDate} placeholder="End of submission date" />

                    <div className="field">
                        <div className="ui labeled input">
                            <div className="ui label">$</div>
                            <input type="text" placeholder="Bounty, leave blank to accept offers"
                                   valueLink={this.linkState('bounty')}/>
                        </div>
                    </div>
                    <div className="header">Media:</div>
                    {
                        _.map(this.state.media, function (video, i) {
                            return this.renderVideo(video, i);
                        }, this)
                    }
                    <div className="field">
                        <div className="ui action input">
                            <input type="text" placeholder="Add a Youtube/Vimeo video by url..." valueLink={this.linkState('newVideo')}/>
                            <button className="ui icon button" onClick={this.addVideo}><i className="ui icon green plus"></i></button>
                        </div>
                    </div>
                    <button className="ui button primary" onClick={this.submitProject}>Submit Project</button>
                </div>
            </div>
        )
    }
});