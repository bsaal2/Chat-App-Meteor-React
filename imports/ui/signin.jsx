import React,{Component} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signin extends Component{
  handleSubmit(e){
     e.preventDefault();
     let email=ReactDOM.findDOMNode(this.refs.email).value;
     let pswd=ReactDOM.findDOMNode(this.refs.password).value;
     Meteor.loginWithPassword(email,pswd,function(err){
       if(!err){
         FlowRouter.go('chat');
       }
       else{
         console.log(err);
       }
     });
  }

  render(){
    return(
      <div className="signin">
       <h3>Sign in here</h3>

       <form onSubmit={this.handleSubmit.bind(this)}>
         <p>Email:<input type="email" ref="email" required/></p>
         <p>Password:<input type="password" ref="password" required/></p>
         <input type="submit" value="Log in" />
       </form>

       <p>Don't have an account?<a href="/">Register here</a></p>
      </div>
    );
  }
}
