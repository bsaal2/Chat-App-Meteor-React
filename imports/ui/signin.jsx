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
      <div className="row">
       <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h3 className="lead">Sign in here</h3>

        <form onSubmit={this.handleSubmit.bind(this)} className="register-form">
         <div className="form-group">
          <label for="email">Email</label>
          <input className="form-control" type="email" ref="email" id="email" required/>
         </div>
         <div className="form-group">
          <label for="pswd">Password</label>
          <input className="form-control" type="password" ref="password" id="pswd" required/>
         </div>
         <button type="submit" className="btn btn-default submit">Login</button>
        </form>

        <p className="login-text">Don't have an account?<a href="/">Register here</a></p>

       </div>
      </div>
    );
  }
}
