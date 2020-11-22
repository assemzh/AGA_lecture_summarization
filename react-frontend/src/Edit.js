import React from 'react';
import './App.css';
import ContentEditable from 'react-contenteditable';
// import { trackPromise } from 'react-promise-tracker';
import $ from 'jquery'
import ReactPlayer from 'react-player'

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideo: false,
            script: "",
            txt: [],
            timestamps: [],
            vid: null
        }
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
                            <ReactPlayer ref={this.ref} url = {url} onSeek = {() => this.handleSeek}/>
                        </div>
        return component
    }

    handleSeek = e => {
        // this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
      }

    navigateTo(ts) {
        console.log(ts)
        this.player.seekTo(ts, 'seconds')
    }

    ref = player => {
        this.player = player
      }

    getScript(url) {
        var text = ''
        var txt = []
        var timestamps = []
        var vid = url.split('v=')[1]
        var ampersandPosition = vid.indexOf('&')
        if(ampersandPosition !== -1) {
            vid = vid.substring(0, ampersandPosition)
        }
        // this.setState({vid: vid})
        var xml_url = "https://video.google.com/timedtext?lang=en&v=" + vid
        $.ajax({
        type: "POST",
        url: xml_url
        }).done( (response) => {                      
            // console.log(response);
            var xml = response.getElementsByTagName('text')
            // console.log(xml[0].getAttribute('start'))
            var len = xml.length
            for (var i = 0; i < len; i++) {
                var texti = xml[i].innerHTML
                // console.log(texti)
                while (texti.includes('&amp;#39;')) {
                    texti = texti.replace('&amp;#39;', "'")
                } 
                while (texti.includes('&amp;quot;')) {
                    texti = texti.replace('&amp;quot;', '"')
                }
                var timestamp = xml[i].getAttribute('start')
                // text.push ( <span style={{color:'blue',cursor:'pointer'}} onClick = {this.navigateTo(timestamp)}> {texti + ' '} </span> )
                txt.push(texti)
                timestamps.push(timestamp)
            }
            this.setState({script: text, txt: txt, timestamps: timestamps})
            // console.log(txt)
            return txt
        //    console.log(timestamps)
        }).fail( (response) => {
            console.log('here');
        });
    }

    render() {
        // console.log('edit', this.props.url)
        var txt = this.getScript(this.props.url)
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
                        onClick={() => this.setState({showVideo: !this.state.showVideo})}>{(this.showVideo) ? "Hide Video" : "Show Video"}</button>

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
                                    // html={this.props.fullText}
                                    html = {' '}
                                    disabled={false}
                                    onChange={this.props.editFullText}/>
                                {this.state.txt.map( (x, i) => (
                                        <span style={{color:'blue',cursor:'pointer'}} className="text_i" key = {this.state.timestamps[i]} onClick = {() => {this.navigateTo(this.state.timestamps[i])}}>{x + ' '}</span>
                                      ))}
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
