import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';
// import { trackPromise } from 'react-promise-tracker';
import ReactPlayer from 'react-player'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVideo: false,
            script: "",
            // txt: [],
            // timestamps: [],
            vid: null,
            editMode: false,
        }

        // this.handleSeek = this.handleSeek.bind(this.player);
    }

    findVideo(url) {
        // url = url.replace("watch?v=", "embed/")
        // console.log(url)
        // var vid = url.split('v=')[1]
        // var ampersandPosition = vid.indexOf('&')
        // if(ampersandPosition !== -1) {
        //     vid = vid.substring(0, ampersandPosition)
        // }
        var component = <div className="row edit-video-container">
                            <ReactPlayer ref={player => {this.player = player}}
                                        url = {this.props.url}
                                        onSeek = {this.handleSeek}
                                        playing
                                        controls
                                        width='100%'
                                        // height='100%'
                                        // onSeek={(e)=>console.log('onSeek', e)}
                                        />
                        </div>
        return component
    }

    handleSeek = p => {
        console.log('handleSeek', this.player.current)
        this.player.setState({ seeking: true })
        // this.player.seekTo(parseFloat(e.target.value))
        // if(this.player.current !== null) {
        //     console.log('seeking to', p)
        this.player.seekTo(p)
        // }
        setTimeout(()=>this.player.setState({ seeking: false }), 800)
    }

    navigateTo(ts) {
        console.log(ts, this.player)
        if (!this.state.showVideo) {
            this.setState({showVideo: true})
        }
        if (this.player){
            console.log('HERE', this.player)
            this.player.props.onSeek(ts)
            // var total = this.player.current.getDuration()
            // console.log('total', total)
            // this.player.seekTo(ts/total, )
            // this.player.seekTo(ts)
        }

    }


    render() {
        // console.log('edit', this.props.url)
        // var txt = this.getScript(this.props.url)
        var component = this.findVideo(this.props.url)
        // const data = {url: this.props.url};
        // fetch('/flask-backend/get-script', {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //     })
        //     .then(response =>
        //     {   console.log(response)
        //         response.json()})
        //     .then(data => {
        //     console.log(data);
        //     this.setState({script: data["text"]})
        //     }).catch((error) => {
        //     console.error('Error:', error);
        // })



        return (
            <div className="container-fluid min-vh-100">
                {(this.state.showVideo) ?

                <div className="row">
                    <div className="col-12 video-col">
                        {component}
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
                                    html = {' '}
                                    disabled={true}
                                    onChange={this.props.editFullText}/>
                                  {this.props.fullText.map( (x, i) => (
                                        <span style={{color:'blue',cursor:'pointer'}} className="text_i"
                                          key = {this.props.timestamps[i]}
                                          onClick = {() => {this.navigateTo(this.props.timestamps[i])}}
                                        >{x  + " "}</span>
                                      ))}

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
                                    html={this.props.sentSpan}
                                    // html={this.props.summary}
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
