import React from 'react';
import './App.css';
import Input from './Input.js';
import Main from './Main.js';
import Edit from './Edit.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "main", // input, main, edit
      url: null,
      fullText: "full text",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet viverra velit fringilla condimentum. Vestibulum convallis ipsum non nunc laoreet venenatis. Morbi lacus turpis, ullamcorper et imperdiet ut, convallis sed ante. Sed vestibulum in arcu id varius. Duis dapibus aliquet pretium. Maecenas tristique, sem in interdum pharetra, quam tellus blandit lacus, ut imperdiet nisi metus vel ex. Maecenas sit amet risus eget justo pretium mollis. Sed ac tempor nibh. Suspendisse nec lectus lacus.            In hac habitasse platea dictumst. Nunc eu mi luctus metus commodo elementum nec at ipsum. Morbi nec sapien dapibus, pulvinar lacus nec, ullamcorper turpis. Maecenas venenatis hendrerit ante ut pretium. Donec tristique iaculis justo. Sed et dapibus turpis, sed sodales arcu. Vestibulum nisl ante, luctus in ex vel, maximus viverra risus. Donec at nisi eu felis suscipit tincidunt sed at orci. Etiam porta, leo quis vulputate pellentesque, lectus libero luctus tellus, vel molestie nulla magna in velit. Morbi mattis tincidunt semper. Morbi a dolor quis felis fringilla auctor. Donec rhoncus urna vitae arcu faucibus gravida. Nullam euismod lorem ac ligula vestibulum, non consectetur mauris vestibulum."
    }

    this.setVideo = this.setVideo.bind(this);
    this.setPage = this.setPage.bind(this);
    this.editSummary = this.editSummary.bind(this);
    this.editFullText = this.editFullText.bind(this);
  }

  editSummary(event) {
    this.setState({summary: event.target.value});
  }

  editFullText(event) {
    this.setState({fullText: event.target.value});
  }

  setVideo(url) {
    // check if url is valid
    // get summary, set state
    this.setState({url: url, page: "main"});
  }

  setPage(page) {
    this.setState({page: page});
  }

  render() {
    let content;

    if (this.state.page === "input") {
      content = <Input setVideo={this.setVideo}/>
    } else if (this.state.page === "main") {
      content = <Main summary={this.state.summary} setPage={this.setPage} editSummary={this.editSummary}/>
    } else if (this.state.page === "edit") {
      content = <Edit 
      summary={this.state.summary} setPage={this.setPage} editSummary={this.editSummary}
      fullText={this.state.fullText} editFullText={this.editFullText}/>
    }

    return (
      <div className="App">
        {content}
      </div>
    )
  }
}


export default App;
