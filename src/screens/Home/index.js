import React, { Component } from 'react';
import {getData, getLocation} from '../../utils/data';
import Logo from '../../resources/ChooseTheFoodLogo.svg';


export class Home extends Component {
state = {
    result : null,
    location: null,
    first: false
}

componentDidUpdate(prevprops, prevstate){
    if (this.state.result !== prevstate.result) {
        console.log(typeof this.state.result);        
    }
}

componentDidMount(){
    getLocation((location)=> this.setState({location : location}));
}

Categories (props) {
    return <h4 className = "Categories"> {props.categories[0]} </h4>;
}

FoodInfo (props) {
    console.log(props);
    return (
    <div className ="LogoWrapper">
        <div class = "FoodInfo" height = "250" width= "250">
        <h3>{props.name} </h3>
         {props.is_closed ? 'Currently Closed': 'Currently Open'}
        <ul>
            <li>{props.location.address1}</li>
            <li>{props.display_phone ? props.display_phone: 'No number on file'}</li>
            <li>{props.rating} stars </li>
            <li>{props.price} </li>
            
        </ul>
        </div> 
    </div>
    );
}

ShuffleBurger (props) {
    return (
    <div class = "LogoWrapper">
        <img src= { Logo } alt = "Burger" height = "250" width = "250"/>
    </div>
    );
}

Icon (props)  {
    const resultReturned = props;
    if (!this.state.first){
        return this.ShuffleBurger(resultReturned);
    }
    return this.Loading(resultReturned);
}

Loading (props) {
    if (this.state.result === null){
        return (
            <div class = "LogoWrapper">
                <img src= { Logo } alt = "BurgerLoading" role = "loading" height = "250" width = "250"/>
            </div>
            ); 
    }
    else return this.FoodInfo(props);
}

    render() {

        return (
        <span>
            <h1> Choose The Food </h1>
            {
                this.Icon(this.state.result)
            }
            <br></br>
            <button disabled={!this.state.location} onClick={() =>{
                this.setState({result: null, first: true});
                getData(this.state, (result)=> this.setState({result : JSON.parse(JSON.parse(result))}))}
            }>
            <h2>
            {
                this.state.first ? 'Click to Choose Again': 'Click to Choose The Food'
            }
            </h2>
            </button> 
        </span>
        );
    }
}
