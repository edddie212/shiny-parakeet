const app = document.getElementById('appOld2');

class VisToggleVisibility extends React.Component{
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this)
        this.state = {
            visibility: false
       }
    }
    toggleVisibility(){
     this.setState(()=>{
        return this.state.visibility = !this.state.visibility

     })
    }
    render(){
        return <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.toggleVisibility}>
                {this.state.visibility ? 'Hide details' : 'Show details'}
            </button>
            {this.state.visibility && (
                <div>
                    <p>Hey. These are some details you can now see!</p>
                </div>
            )}
        </div>
    }
}

ReactDOM.render(<VisToggleVisibility/>, app)



