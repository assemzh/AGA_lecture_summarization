import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideo: false,
            editMode: false,
        }
    }

    render() {
        return (
            <div className="container-fluid min-vh-100">
                {(this.state.showVideo) ?

                <div className="row">
                    <div className="col-12 video-col">
                        <div className="row edit-video-container">
                            <iframe title="video"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            className="video"/>
                        </div>
                    </div>
                </div>
                :
                <div/>
                }

                <div className="row edit-video-info-container">
                    <div className="col-10">
                        <h4 className="subtitle">Title</h4>
                        Author
                        <br/>
                        # Visualizations
                    </div>
                    <div className="col-2" style={{textAlign: "right"}}>
                        <button type="button" className="btn btn-danger btnEdit"
                        onClick={() => this.props.setPage("main")}>Hide Original Text</button>
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-warning btnEdit"
                        onClick={() => this.setState({showVideo: !this.state.showVideo})}>{(this.state.showVideo) ? "Hide Video" : "Show Video"}</button>

                    </div>
                </div>



                <div className="row">
                    <div className="col-6 text-col">
                            <div className="container">
                                <div className="edit-summary-header">
                                    <div style={{display: "inline-block"}}>
                                        <h4>Original Text</h4>
                                    </div>
                                    <div style={{display: "inline-block", float: "right"}}>
                                        <button type="button" className="btn btn-warning"
                                         onClick={() => this.props.createSpanSummary()}>Summarize</button>
                                    </div>
                                </div>
                                <div className="summary min-vh-100">
                                    <ContentEditable
                                    innerRef={this.ContentEditable}
                                    html={this.props.fullText}
                                    disabled={false}
                                    onChange={this.props.editFullText}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 text-col">
                            <div className="container">
                              <div className="edit-summary-header">
                                  <div style={{display: "inline-block"}}>
                                      <h4>Summary</h4>
                                  </div>
                                  <div style={{display: "inline-block", float: "right"}}>
                                      <button type="button" className="btn btn-warning btnEdit"
                                      onClick={() => this.setState({editMode: !this.state.editMode})}>{(this.state.editMode) ? "Save" : "Edit"}</button>
                                  </div>
                              </div>
                                <div className="summary min-vh-100">
                                  {(this.state.editMode) ?
                                    <ContentEditable
                                    innerRef={this.ContentEditable}
                                    html={this.props.summary}
                                    disabled={false}
                                    onChange={this.props.editSummary}/>
                                    :
                                    <ContentEditable
                                    innerRef={this.ContentEditable}
                                    html={this.props.sentSpan}
                                    disabled={true}
                                    />
                                  }

                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Edit;
