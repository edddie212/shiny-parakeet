import React from 'react';

const Header = (props) => {
    return <div className='header'>
        <div className="container">
        <h1 className='header__title'>{props.title}</h1>
        {props.subTitle && <h2 className='.header__subTitle'>{props.subTitle}</h2>}
        </div>
        </div>
}

Header.defaultProps = {
    title: "Indecision App"
}

export default Header;
