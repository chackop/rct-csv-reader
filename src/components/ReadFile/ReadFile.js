import React, { Component } from 'react'

export default class ReadFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileData: null
    }
    this.handleFileChosen = this.handleFileChosen.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
  }

  handleFileRead() {
    const content = this.fileReader.result;
    console.log(content);
  }

  handleFileChosen(file) {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(file);
  }

  render() {
    return (
      <div>
        <input
          type='file'
          accept='.csv'
          onChange={e => this.handleFileChosen(e.target.files[0])}
        />
      </div>
    )
  }
}
