import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid min-vh-100">
                <div className="row">
                    <div className="col-12 video-col">
                        <div className="row edit-video-container">
                            <iframe title="video"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            className="video"/>
                        </div>
                    </div>
                </div>

                <div className="row edit-video-info-container">
                    Title
                    <br/>
                    Author
                    <br/>
                    # Visualizations
                </div>


                <div className="row">
                    <div className="col-6 text-col">
                            <div className="container">
                                <div className="edit-summary-header">
                                    <h4>Original Text</h4>
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
                                    <h4>Summary</h4>
                                </div>
                                <div className="summary min-vh-100">
                                    <ContentEditable 
                                    innerRef={this.ContentEditable} 
                                    html={this.props.summary}
                                    disabled={false}
                                    onChange={this.props.editSummary}/>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Edit;