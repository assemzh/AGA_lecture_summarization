import React from 'react';
import './App.css';

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null
        }
    }

    handleClick() {
      // console.log(this.state.url);
      var url = this.state.url;
      if (url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        var vid = (match&&match[7].length==11)? match[7] : false;

        if (vid){
          this.props.setVideo(vid);
          this.props.getScript(vid)
        }else{
          alert('Please, insert valid URL!');
        }
      }

    }


    render() {
        return (
            <div className="container-fluid min-vh-100">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="vertical-align">
                            <h1>Automatic Lecture Summarization</h1>
                            <br/>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">YouTube Link</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                                onChange={(event) => this.setState({url: event.target.value})}/>
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button" onClick={() => this.handleClick() }>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>

                </div>
            </div>
        )
    }

}

export default Input;
