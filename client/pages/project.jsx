FlowRouter.route('/project/:id?/:subPage?', {
    action(params) {
        console.log("Going to project: " + params.id);
        if (params.id === 'new') {
            ReactLayout.render(Layout, {content: <EditProject id={params.id}/>});
        } else {
            if (params.subPage == 'submit') {
                ReactLayout.render(Layout, {content: <Submit id={params.id}/>});
            } else {
                ReactLayout.render(Layout, {content: <Project id={params.id} subPage={params.subPage}/>});
            }
        }
    }
});

Project = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe('project', this.props.id);
        return {
            project: db.Projects.findOne(this.props.id)
        };
    },
    renderDetails() {
        return (
            <div className="ui vertical segment container">
                <h1>Details</h1>

                <div dangerouslySetInnerHTML={{__html: this.data.project.description}}></div>
            </div>
        )
    },
    renderSubmissions() {
        return (
            <div className="ui vertical segment container">
                <h1>Submissions</h1>

            </div>
        )
    },
    renderComments() {
        return (
            <div className="ui vertical segment container">
                <h1>Comments</h1>
            </div>
        )
    },
    render() {
        if (!this.data.project) return (<div>Loading...</div>);

        var submissionMoment = moment(this.data.project.submissionDate);
        var daysAway = submissionMoment.diff(moment(), 'days');
        var submissionStr = daysAway == 0 ? "Today" : moment().to(submissionMoment);

        var subPage;
        switch (this.props.subPage) {
            case 'submissions':
                subPage = this.renderSubmissions();
                break;
            case 'comments':
                subPage = this.renderComments();
                break;
            default:
                subPage = this.renderDetails();
        }

        return (
            <div>
                <div className="ui inverted vertical masthead segment">
                    <div className="ui container">
                        <h1>{this.data.project.name}</h1>
                        <h4>Submission {daysAway >= 0 ? "Due" : "Past"}: {submissionStr}</h4>
                        {daysAway >= 0 ?
                            <a href={"/project/"+this.props.id+"/submit"} className="ui inverted primary button">Participate</a> : ''}
                        <div className="ui vertical segment">
                            <div className="ui inverted secondary pointing menu">
                                <a href={"/project/"+this.props.id}
                                   className={!this.props.subPage?'item active':'item' }>Details</a>
                                <a href={"/project/"+this.props.id + "/submissions"}
                                   className={this.props.subPage=='submissions'?'item active':'item' }>Submissions</a>
                                <a href={"/project/"+this.props.id + "/comments"}
                                   className={this.props.subPage=='comments'?'item active':'item'}>Comments</a>
                            </div>
                        </div>
                    </div>
                </div>
                {subPage}
            </div>
        );
    }
});