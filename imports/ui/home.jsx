import React,{Component} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Home extends Component{
  constructor(props){
    super(props);
  }

  handleSubmit(e){
      e.preventDefault();
      Accounts.createUser({
        email:ReactDOM.findDOMNode(this.refs.email).value,
        password:ReactDOM.findDOMNode(this.refs.password).value,
        profile:{name:ReactDOM.findDOMNode(this.refs.name).value}
       },function(err){
        if(!err){
           FlowRouter.go("chat");
        }
     });

  }

  render(){
    return(
      <div className="row">
       <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h1 className="lead">Register here</h1>

        <form onSubmit={this.handleSubmit.bind(this)} className="register-form">
         <div className="form-group">
          <label for="names">Name</label>
          <input type="text" className="form-control" ref="name" id="names" required/>
         </div>
         <div className="form-group">
          <label for="email">Email</label>
          <input className="form-control" type="email" ref="email" id="email" required/>
        </div>
        <div className="form-group">
          <label for="pswd">Password</label>
          <input className="form-control" type="password" ref="password" id="pswd"required/>
        </div>
        <button type="submit" className="btn btn-default submit">Register</button>
        </form>

        <p className="login-text">Already have a account?<strong><a href="/sign-in">Sign in here</a></strong></p>

       </div>
      </div>
    );
  }
}
