import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options';
import OptionModal from './OptionModal'


class IndecisionApp extends React.Component {
  state = {
    options: ['state kinda like a global','not using "this"'],
    selectedOption: undefined
  }
  handleClearSelectedOption = () => {
    console.log("handleClearSelectedOption")
    this.setState(()=>({selectedOption: undefined}) )
  }
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((a) => a !== optionToRemove)
    }))
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomNum]
    this.setState((prevState)=>( { selectedOption: option } ))
  }
  handleAddOption = (option) => {
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
  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}
export default IndecisionApp