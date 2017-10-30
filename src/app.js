import React from 'react'
import ReactDOM from 'react-dom'

class ToDoListApp extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            items: ["whatup","item 2","worldd"],
            completeItems: ["item that has been complete", "lol"]
        }
        this.addnewItem = this.addnewItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.deletefurreal = this.deletefurreal.bind(this)
    }
    addnewItem(a){
        this.setState((prevState)=>{
            return {
                items: prevState.items.concat(a) 
            }
        })
    }
   deleteItem(b){
       console.log("delete item is getting the argument: ", b)
        this.setState((prevState)=>{
            return {
                items: prevState.items.filter((a)=>{
                    return a !== b
                }),
                completeItems: prevState.completeItems.concat(b)
            }
        })
    }

   deletefurreal(b){
        this.setState((prevState)=>{
            return {
                completeItems: prevState.completeItems.filter((a)=>{
                    return a !== b
                })
            }
        })
   }
   render(){
       return (
       <div>
           <h1>ToDoListApp</h1>
           <Items 
           items={this.state.items}
          deleteItem={this.deleteItem} />
           <AddItem func={this.addnewItem}/>
           <Fin 
           completeItems={this.state.completeItems}
           deletefurreal={this.deletefurreal}
             />
       </div>
       )
   } 
}
//Stateless Functional Components
class AddItem extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick (e) {
        e.preventDefault()
        console.log("i've been clicked")
        this.props.func(e.target.poop.value)
        e.target.poop.value = ""

    }
    render(){
        return(
            <form onSubmit={this.handleClick}>
                <input name='poop'/>
                <button >Submit</button>
            </form>
        )
    }
}
const Items = (props) => {
    return (
        <div>
            <h4>The Todo List</h4>
                    {props.items.map((item)=>{
                        return <Item 
                        singleItem={item}
                        key={item}
                        deleteItem={props.deleteItem}
                         />
                    })}
        </div>

    )
}
const Item = (props) => {
    return (
        <div>
            {props.singleItem}
            <button onClick={(a)=>{props.deleteItem(props.singleItem)
            }}>Complete</button>
        </div>

    )
}
const Fin = (props) => {
    return (
        <div>
            <h4>Finished Tasks</h4>
                    {props.completeItems.map((item)=>{
                        return <FinTasks 
                        singleItem={item}
                        key={item}
                        deletefurreal={props.deletefurreal}
                         />
                    })}
        </div>
    )
}
const FinTasks = (props) => {
    return (
        <div>
            {props.singleItem}
            <button onClick={(a)=>{
                props.deletefurreal(props.singleItem)
            }}             >Delete</button>
        </div>
    )
}

ReactDOM.render(<ToDoListApp />,document.getElementById('app'))
