Submit = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return {
            newVideo: '',
            media: [],
            description: ''
        }
    },
    changeSubmissionDate (date) {
        this.setState({submissionDate: date});
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    addMedia() {
        console.log('Adding video: ' + this.state.newVideo);
        this.state.media.push(this.state.newVideo);
        this.setState({newVideo: ''});
    },
    renderMedia(video, key) {
        if (video.indexOf("youtube") > -1)
            return (<Youtube url={video} opts={{width:'100%'}}/>);
        else if (video.indexOf('vimeo') > -1) {
            var id = video.match(/\d*$/);
            if (id.length || _.isNumber(id[0]))
                return (<Vimeo videoId={id}/>);
        } else if (video.indexOf('soundcloud') > -1) {
            return (
                <SoundCloud url={video} />
            )
        }
    },
    submitProject() {
        var submission = _.extend({}, this.state);
        Meteor.call('NewSubmission', this.props.id, submission, function (err, res) {
            if (err) {
                console.error(err);
            } else {
                FlowRouter.go('/project/'+this.props.id+'/submissions');
            }
        });
    },
    onDescriptionChange(value) {
        this.setState({description: value})
    },
    render() {
        return (
            <div className="ui container">
                <h1>New Submission</h1>
                <div className="ui header">Media:</div>
                {
                    _.map(this.state.media, function (video, i) {
                        return <div className="ui card">
                            {this.renderMedia(video, i)}
                            <div className="content">
                                <a href="" className="header">Blah blah</a>
                                <div className="meta">Description stuff</div>
                            </div>
                        </div>
                    }, this)
                }
                <div className="ui fluid action input">
                    <input type="text" placeholder="Add a Youtube/Vimeo video by url..."
                           valueLink={this.linkState('newVideo')}/>
                    <button className="ui icon button" onClick={this.addMedia}><i
                        className="ui icon green plus"></i></button>
                </div>
                <div>
                    <div className="ui button primary" onClick={this.submitProject}>Submit</div>
                </div>
            </div>
        )
    }
});