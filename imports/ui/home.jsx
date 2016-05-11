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
      <div className="content-area">
        <h3>Register here</h3>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <p>Name:<input type="text" ref="name" required/></p>
          <p>Email:<input type="email" ref="email" required/></p>
          <p>Password:<input type="password" ref="password" required/></p>
          <input type="submit" value="Register" />
        </form>

        <p>Already have a account?<strong><a href="/sign-in">Sign in here</a></strong></p>
      </div>
    );
  }
}
