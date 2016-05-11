import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';

export default class Header extends Component{
  signOut(){
    Meteor.logout(function(){
      FlowRouter.go("home");
    });
  }

  render(){
  let currentUser=Meteor.userId();
    if(currentUser){
      currentUser=(<button className="signout" onClick={this.signOut.bind(this)}>SignOut</button>)
    }
    else{
      currentUser="";
    }

    return(
      <div>
        <h1 className="navbar">Chat here</h1>
        {currentUser}
      </div>
    );
  }
}
