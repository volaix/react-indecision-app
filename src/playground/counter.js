class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.handleAddOne = this.handleAddOne.bind(this)
		this.handleMinusOne = this.handleMinusOne.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.state = {
			count: 0
		}
	}
	componentDidMount() {
		try {
			const count = parseInt(localStorage.getItem("count"))
			this.setState(() => ({ count }))
			console.log(`successfully got the state of ${count}`)
		} catch (e){
			console.log(`failed to get the state`)
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.count !== this.state.count) {
			console.log("saving to local storage")
			localStorage.setItem("count", this.state.count)
		}
	}
	handleAddOne() {
		this.setState((prevState) => {
			return {
				count: prevState.count + 1
			}
		})
	}
	handleMinusOne() {
		this.setState((prevState) => {
			return {
				count: prevState.count - 1
			}
		})
	}
	handleReset() {
		this.setState((prevState) => {
			return {
				count: 0
			}
		})
	}
	render() {
		return (
			<div>
				<h1>Counter App: {this.state.count}</h1>
				<button key="+1" onClick={this.handleAddOne}>+1</button>
				<button key="-1" onClick={this.handleMinusOne}>-1</button>
				<button key="reset" onClick={this.handleReset}>reset</button>
			</div>
		)
	}
}
ReactDOM.render(<Counter count={[20]} />, document.getElementById("app"))