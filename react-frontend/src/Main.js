import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: "Medium"
        }

        this.ContentEditable = React.createRef();
    }

    hoverSpan(event) {
        if (event.target.nodeName === "SPAN") { // IT CAN GET THE TEXT INSIDE THE SPAN, SO PUT EVERY WORD INSIDE A SPAN
            console.log(event.target.textContent);
        }
    }

    componentDidMount() {
        console.log(this.ContentEditable.current);
        this.ContentEditable.current.addEventListener("mouseover", this.hoverSpan);
    }



    render() {
        var btns = ["Low", "Medium", "High"];

        var tmp = "<span>Text 1</span>     <span>Text 2</span>";

        return (
            <div className="container-fluid min-vh-100">
                <div className="row">
                    <div className="col-6 video-col">
                        <div className="row video-container">
                            <iframe title="video"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            className="video"/>
                        </div>
                        <div className="row video-info-container">
                            <div>
                                <h4 className="subtitle">Title</h4>
                                Author
                                <br/>
                                # Visualizations
                            </div>
                            
                        </div>
                        <hr/>
                        <div className="row complexity-info-container">
                            <div className="row">
                            <div className="col-7">
                                <h2 className="subtitle">Level of Detail</h2>
                                How summarized you want your lecture to be
                            </div>
                            <div className="col-4">
                                <div className="col-btn">
                                    {btns.map((name, idx) => (
                                        <button type="button" key={"btn" + name}
                                        className={(name === this.state.detail)? "btn btn-light detail-btn" : "btn btn-dark detail-btn"}
                                        onClick={() => this.setState({detail: name})}>
                                            {name}
                                        </button>
                                    ))}
                                    {/* <button type="button" className="btn btn-light detail-btn">Low</button>
                                    <button type="button" className="btn btn-light detail-btn">Medium</button>
                                    <button type="button" className="btn btn-light detail-btn">High</button> */}
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        <hr/>
                    </div>
                    <div className="col-6 text-col">
                        <div className="container">
                            <div className="summary-header">
                                <button type="button" className="btn btn-danger"
                                onClick={() => this.props.setPage("edit")}>Show Original Text</button>
                            </div>
                            <div className="summary min-vh-100">
                                <ContentEditable 
                                innerRef={this.ContentEditable} 
                                html={tmp}
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

export default Main;