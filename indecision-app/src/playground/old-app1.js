const appDiv = document.getElementById('appOld2');
const wrapperDiv = 'wrapper';
const app = {
    title: 'Some Title',
    subTitle: 'This is a sub title see?',
    options: []
}



const formSubmit = (e)=>{
    e.preventDefault()
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp()
    }
}

const removeAll = ()=>{
    app.options = [];
    renderApp()
}

const onMakeDecision = ()=>{
    const  randomNum = Math.floor(Math.random()*app.options.length);
    const option = app.options[randomNum]
    alert(option)
}

const removeBtnID = 'remove-all-btn';

const renderApp = ()=>{
    const templateOne =
        <div id={wrapperDiv}>
            <h1>{app.title}</h1>
            {app.subTitle && <p>{app.subTitle}</p>}
            <p>{app.options.length > 0 ? app.options[0] : 'No options to display'}</p>
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What Should I Do?</button>
            <button id={removeBtnID} onClick={removeAll}>Remove All</button>
            <ul>
                {
                    app.options.map((option, index)=>{
                        return <li key={index}>Option : {++index}</li>
                    })
                }
            </ul>

            <form onSubmit={formSubmit}>
                <label>
                    <input type="text" name='option' placeholder='Enter Your Name'/>
                </label>
                <button>Add Option</button>
            </form>
        </div> ;
    ReactDOM.render(templateOne, appDiv);
}
renderApp()
