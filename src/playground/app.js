import React from 'react'
import ReactDOM from 'react-dom'

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      options: ["starting", "list"]
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
    try {
      const json = localStorage.getItem("options")
      const options = JSON.parse(json)
      if (json) {
        this.setState(() => ({ options }))
      }
    } catch (e) {
      console.log("error for local storage trying to getItem")
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate called')
    if (prevState.options.length !== this.state.options.length) {
      console.log("Saving Data")
      localStorage.setItem("options", JSON.stringify(this.state.options))
    }
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((a) => a !== optionToRemove)
    }))
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomNum]
    console.log(option)
  }
  handleAddOption(option) {
    if (!option) {
      return "Please put in some valid text"
    } else if (this.state.options.indexOf(option) > -1) {
      return "Aiyah, this value is already in the list"
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    })
    )
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
}
const Action = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}
      >
        What should I do?
      </button>
    </div>
  )
}
const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {
        props.options.map((option) => (
          <Option key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption} />
        )
        )
      }
    </div>
  )
}
const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button onClick={(e) => {
        props.handleDeleteOption(props.optionText)
      }
      }>Delete</button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option)
    this.setState(() => ({ error }))
    if (!error) {
      e.target.elements.option.value = ""
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
