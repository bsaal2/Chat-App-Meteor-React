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
      currentUser=(<button className="btn btn-default btn-xs signout text-right" onClick={this.signOut.bind(this)}>SignOut</button>)
    }
    else{
      currentUser="";
    }

    return(
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <h3>Chat App<small>made with react</small></h3>
        </div>
        <div className="col-xs-1 col-xs-offset-5 col-sm-1 col-sm-offset-5 col-md-1 col-md-offset-5 col-lg-1 col-lg-offset-5">
          {currentUser}
        </div>
      </div>
    );
  }
}
