class Visibility extends React.Component {
  constructor(props){
    super(props)
    this.handleVisiblity = this.handleVisiblity.bind(this)
    this.state = {
      visibility: false,
    }
  }
  handleVisiblity(){
    this.setState((prevState)=>{
      return {
        visibility: !prevState.visibility
      }
    })
  }
  render(){
    return (
      <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.handleVisiblity}>
            {this.state.visibility ?
              "Hide Text" :
              "Show Text"
            }
              </button>
            <p>{this.state.visibility && "We exist"}</p>
      </div>
    )
  }
}
ReactDOM.render(<Visibility />, document.getElementById("app"))
// let visibility = false;

// const toggleVisibility = () => {
//   visibility = !visibility;
//   render();
// };

// const render = () => {
//   const jsx = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleVisibility}>
//         {visibility ? 'Hide details' : 'Show details'}
//       </button>
//       {visibility && (
//         <div>
//           <p>Hey. These are some details you can now see!</p>
//         </div>
//       )}
//     </div>
//   );

//   ReactDOM.render(jsx, document.getElementById('app'));
// };

// render();

