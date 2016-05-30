import React from 'react';
import ReactDOM from 'react-dom';

import { default as marked } from 'marked';

// Stylesheets
require("../sass/style.scss");

const DEFAULT_VALUE = "# Heading\n\n## Sub-heading\n\n### Another deeper heading\n\n" +
  "Paragraphs are separated\nby a blank line.\n\n" +
  "Leave 2 spaces at the end of a line to do a  \nline break\n\n" +
  "Text attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\n" +
  "Shopping list:\n\n  * apples\n  * oranges\n  * pears\n\n" +
  "Numbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n" +
  "```\nvar code = \"awesome\";\n```\n\n" +
  "The rain---not the reign---in\nSpain.\n\n" +
  "*[Herman Fassett](https://freecodecamp.com/hermanfassett)*";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: DEFAULT_VALUE
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({userInput: e.target.value})
  }
  render() {
    const { userInput } = this.state, hc = this.handleChange;
    return (
      <div className="container">
        <header>
          <h1>Markdown Previewer</h1>
        </header>
        <Form userInput={userInput} handleChange={hc}/>
        <Output userInput={userInput}/>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    const { userInput, handleChange } = this.props;
    return (
      <div className="editor">
        <header>
          <h2>Input</h2>
        </header>
        <form>
          <textarea
            placeholder="Enter some text"
            value={userInput}
            onChange={handleChange}
          />
        </form>
      </div>
    );
  }
}

class Output extends React.Component {
  rawMarkup() {
    const raw = marked(this.props.userInput, {sanitize: true});
    return { __html: raw }
  }
  render() {
    return (
      <div className="output">
        <header>
          <h2>Output</h2>
        </header>
        <div>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

// Render the application
ReactDOM.render(<App/>, document.getElementById("app"));
