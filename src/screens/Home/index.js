import React, { Component } from 'react';
import {getData, getLocation} from '../../utils/data';
import Logo from '../../resources/ChooseTheFoodLogo.svg';


export class Home extends Component {
state = {
    result : null,
    location: null,
    first: false,
}

componentDidUpdate(prevprops, prevstate){
    if (this.state.result !== prevstate.result) {
        console.log(typeof this.state.result);        
    }
}

componentDidMount(){
    getLocation((location)=> {
        console.log(location);
        this.setState({location : location})
    });
}

Categories (props) {
    return <h4 className = "Categories"> {props.categories[0]} </h4>;
}

FoodInfo (props) {
    return (
    <div className = "Container">    
    <div className ="LogoWrapper">
        <div class = "FoodInfo" height = "250" width= "250">
        <h3>{props.name} </h3>
         {props.is_closed ? 'Currently Closed': 'Currently Open'}
        <ul>
            <li> <i className = "fa fa-map-marker"/> <div class = "Values"> {props.location.address1}</div> </li>
            <li><i class="fa fa-phone" aria-hidden="true"></i> <div class= "Values"> {props.display_phone ? props.display_phone: 'No number on file'} </div> </li>
            <li><div class= "Values"> { this.Rating(props) } </div></li>
            <li><div class= "Values">{this.Price(props)} </div></li>
            
        </ul>
        </div> 
    </div>
    </div>
    );
}

Rating (props) {
    console.log(this.props.rating)
    const yelpRating = props;
    let ratings = []
    for (let i = 0; i < yelpRating.rating; i++){
        ratings.push( <i class="fa fa-star" aria-hidden="true"></i> )
    }
    return ratings;
}

Price (props) {
    console.log(this.props.price)
    const yelpPrice = props;
    let prices = []
    for (let i = 0; i < yelpPrice.price.length; i++){
        prices.push( <i class="fa fa-usd" aria-hidden="true"></i> )
    }
    return prices;
}

ShuffleBurger (props) {
    return (
    <div className = "Container">    
        <div className = "LogoWrapper">
            <img src= { Logo } alt = "Burger" height = "250" width = "250"/>
        </div>
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
            <div className = "Container">
                <div class = "LogoWrapper">
                <img src= { Logo } alt = "BurgerLoading" role = "loading" height = "250" width = "250"/>
                </div>
            </div>
            ); 
    }
    else return this.FoodInfo(props);
}

    render() {

        return (
        <span>
            <div className = "Header">
                <h1> Choose The Food </h1>
            </div>
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
