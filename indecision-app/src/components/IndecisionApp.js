import React from 'react';
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
     options:[],
     selectedOption: undefined
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

    handleDeleteOptions = ()=>{
        this.setState(() => ({options:[]}))
    }

    handleClearSelectedOption = ()=>{
        this.setState(()=>({selectedOption: undefined}))
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState)=>({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[randomNum]

        this.setState(()=>({
            selectedOption: option
        }))
    }
    handleAddOption = (option)=>{
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
             <div className='container' >
                 <Action
                     hasOptions={this.state.options.length > 0}
                     handlePick={this.handlePick}/>
                 <div className='widget'>

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
             handleClearSelectedOption={this.handleClearSelectedOption}
             selectedOption={this.state.selectedOption}
            />
        </div>
    }
}