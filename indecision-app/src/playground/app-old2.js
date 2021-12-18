//Stateless functional component example
// const User = (props)=>{
//     return <div>
//         <p>Name: {props.name} </p>
//         <p>Age: {props.age}</p>
//     </div>
// }


const appOld2 = document.getElementById('appOld2');
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {options:[]};
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(()=>({options}))
            }
        } catch (e) {
             //Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    handleDeleteOptions(){
        this.setState(() => ({options:[]}))
    }

    handleDeleteOption(optionToRemove) {
      this.setState((prevState)=>({
          options: prevState.options.filter((option) => optionToRemove !== option)
      }))
    }

    handlePick(){
        const  randomNum = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[randomNum]
        alert(option)
    }
    handleAddOption(option){
        if(!option){
            return 'Enter Valid Value To Add Option';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This Option Already On The List';
        }
        this.setState((prevState)=>({options: prevState.options.concat(option)}))
    }

    render() {
        const subTitle = 'Put Your Life in The Hand of a Computer';
        return <div>
            <Header subTitle={subTitle} />
            <Action
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}/>
            <Options
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
                handleAddOption={this.handleAddOption}
            />
        </div>
    }
}


const Header = (props) => {
    return <div>
        <h1>{props.title}</h1>
        {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
}

Header.defaultProps = {
    title: "Indecision App"
}

const Action = (props) => {
      return <div>
               <button onClick={props.handlePick}
               disabled={!props.hasOptions}>
                   What Should I Do?
               </button>
             </div>
    }

const Options = (props)=> {
     return <div>
         {
             props.options.length === 0 && <p>Please add options to the list.</p> }
         {
             props.options.map((option) => (
                 <Option
                     key={option}
                     optionText={option}
                     handleDeleteOption={props.handleDeleteOption}
                 />
             ))
         }
            <br/>
        <button  onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
}

const Option = (props)=> {
     return  <div>{props.optionText }
     <button onClick={(e)=>{
         props.handleDeleteOption(props.optionText)
     } }
     > X </button>
     </div>
}



class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault()
       const option = e.target.elements.option.value.trim();
       const error = this.props.handleAddOption(option)
        this.setState(() =>({error}))

        if(!error) {
            e.target.elements.option.value = '';
        }

    }
    render() {

        return <div>
            <br/>
            {this.state.error && <p>{this.state.error}</p>}
            <form  onSubmit={this.handleAddOption}>
                <label htmlFor="option">
                    Add New Option:
                    <input type="text" name='option' placeholder='Add a New Option'/>
                </label>
                <button>Add Option</button>
            </form>
        </div>
    }
}




ReactDOM.render(<IndecisionApp/>, appOld2)

