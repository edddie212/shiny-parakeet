const app = document.getElementById('appOld2');
class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.plusOne = this.plusOne.bind(this)
        this.minusOne = this.minusOne.bind(this)
        this.resetCount = this.resetCount.bind(this)
        this.state = {
            count:0,
        }
    }

    componentDidMount() {
          const count = parseInt(localStorage.getItem('count'), 10);
          this.state.count = count;
           if(!isNaN(count)) {
            this.setState(()=>({count}))
            }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.count !== this.state.count ) {
        const prevCount = prevState.count.toString()
        localStorage.setItem('count', prevCount);
      }
    }

    plusOne() {
       this.setState((prevState)=>{
          return {
              count:++prevState.count,
          }
       });
      }
    minusOne() {
        this.setState((prevState)=>{
          if(this.state.count > 0) {
              return {
                  count:--prevState.count,
              }
          }
        });
    }
    resetCount() {

        this.setState(()=>{
            return {
                count:0
            }
        })
    }
      render() {
        return <div>
          <h1>Count: {this.state.count}</h1>
          <br/>
          <button onClick={this.plusOne}>+1</button>
          <button onClick={this.minusOne}>-1</button>
          <button onClick={this.resetCount}>Reset Count</button>
        </div>
    }
}

ReactDOM.render(<Counter/>, app)








// let count = 0;
// const someId = 'my-btn-plus';
// const someMinusId = 'my-btn-minus';
// const addOne =()=>{
//     count++;
//     renderCounterApp();
// };
// const subtractOne =()=>{
//     count--;
//     renderCounterApp();
// };
// const reloadPage = ()=>{
//     count = 0;
//     renderCounterApp();
// }
//
// const appOld2 = document.getElementById('appOld2');
//
// const renderCounterApp = ()=>{
//     const templateOne =
//         <div id="wrapper">
//             <h1>Count {count}</h1>
//             <button onClick={addOne} id={someId} > Plus One</button>
//             <button onClick={subtractOne} id={someMinusId} > Minus One</button>
//             <br></br>        <br></br>
//             <button onClick={reloadPage }>Reset Count</button>
//         </div>;
//     ReactDOM.render(templateOne, appOld2);
// }
//
// renderCounterApp();