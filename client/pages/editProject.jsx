
EditProject = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return {
            name: '',
            newVideo: '',
            submissionDate: moment(),
            media: [],
            description: '',
            collaborators: {},
            type: '',
            category:'',
            subcategory:''
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
                <SoundCloud url={video}/>
            )
        }
    },
    submitProject() {
        var project = _.extend({}, this.state);
        project.submissionDate = project.submissionDate.format();
        Meteor.call('NewProject', project, function (err, res) {
            if (err) {
                console.error(err);
            } else {
                FlowRouter.go('/');
            }
        });
    },
    onDescriptionChange(value) {
        this.setState({description: value})
    },
    setProjectType(type) {
        this.setState({type: type})
    },
    getTypeClasses(type) {
        return 'ui large icon button' + (this.state.type == type ? ' active' : '');
    },
    renderBounty() {
        return (
            <div className="ui labeled fluid input">
                <div className="ui label">$</div>
                <input type="text" placeholder="Enter a reasonable bounty"
                       valueLink={this.linkState('bounty')}/>
            </div>
        );
    },
    renderProjectTypeMessage() {
        if (!this.state.type) return;

        return (
            <div className="ui message">
                <div className="header">{this.state.type}</div>
                <p>Some text describing the selected project type.</p>
            </div>
        )
    },
    renderCategory(category) {
        var targetCategory = category?tt.Category[category]:tt.Category;

        return (
            <div className="ui floating dropdown button">
                <span className="text">Talent</span>
                <div className="menu">
                {
                    _.map(tt.Category, function (val, key) {
                        var opts = [<div className="divider"></div>,<div className="header">{key}</div>,<div className="divider"></div>];
                        _.forEach(val, function (val, key) {
                            opts.push(<div className="item" value={key}>{val}</div>);
                        });
                        return opts;
                    })
                }
                </div>
            </div>
        )
    },
    changeCategory(category, e) {
        if (category)
            this.setState({subcategory: e.target.value});
        else
            this.setState({category: e.target.value});
    },
    render() {
        return (
            <div className="ui container">

                <div className="ui fluid input huge header vertical basic segment">
                    <input type="text" placeholder="Title..." valueLink={this.linkState('name')}/>
                </div>

                <div className="ui stackable three column grid">
                    <div className="column">
                        <div className="ui header">Project Type</div>
                        <div className="ui three buttons">
                            <div className={this.getTypeClasses('collaborate')}
                                 onClick={this.setProjectType.bind(this, 'collaborate')}>
                                <i className="ui idea icon"></i>Collaborate
                            </div>
                            <div className="or"></div>
                            <div className={this.getTypeClasses('barter')}
                                 onClick={this.setProjectType.bind(this, 'barter')}>
                                <i className="ui gift icon"></i>Barter
                            </div>
                            <div className="or"></div>
                            <div className={this.getTypeClasses('bounty')}
                                 onClick={this.setProjectType.bind(this, 'bounty')}>
                                <i className="ui dollar icon"></i>Bounty
                            </div>
                            {this.state.type == 'bounty' ? this.renderBounty() : ''}
                        </div>
                        {this.renderProjectTypeMessage()}

                    </div>
                    <div className="column">
                        <div className="ui header">Submission Deadline</div>
                        <DatePicker onChange={this.changeSubmissionDate} selected={this.state.submissionDate}
                                    placeholder="End of submission date"/>
                    </div>
                    <div className="column">
                        <div className="ui header">Talents</div>
                        {this.renderCategory()}
                    </div>
                </div>



                <div className="ui header">Description</div>
                <div className="ui segment">
                    <ReactQuill theme="snow" value={this.state.description} onChange={this.onDescriptionChange}/>
                </div>

                <div className="ui header">Media:</div>
                <div className="ui cards">
                    {
                        _.map(this.state.media, function (video, i) {
                            return <div className="ui card">
                                {this.renderMedia(video, i)}
                            </div>
                        }, this)
                    }
                </div>
                <div className="ui action input">
                    <input type="text" placeholder="Add a Youtube/Vimeo video by url..."
                           valueLink={this.linkState('newVideo')}/>
                    <button className="ui icon button" onClick={this.addMedia}><i
                        className="ui icon green plus"></i></button>
                </div>
                <div>
                    <button className="ui button primary" onClick={this.submitProject}>Submit Project</button>
                </div>
            </div>
        )
    }
});