import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';

import {Messages} from '../api/messages.js';
import {Images} from '../api/file.js';
import MessageList from './MessageList.jsx';
import {createContainer} from 'meteor/react-meteor-data';

export default class Chat extends Component{
   constructor(props){
    super(props);
    this.state={imageId:""};
   }

  resetFields(){
      ReactDOM.findDOMNode(this.refs.message).value="";
  }

  renderMessage(){
    return this.props.chatMessages.map((messages) =>(
     <MessageList key={messages._id} data={messages}/>
    ));
  }

  uploadFile(e){
    e.preventDefault();
    var that=this;
   FS.Utility.eachFile(e,function(file){
     Images.insert(file,function(err,fileObj){
         console.log(fileObj._id+fileObj.data.blob.name);
         that.setState({imageId:fileObj._id});
     })
   });
  }

  handleSubmit(e){
    e.preventDefault();
    let imageurl="";
    let message=ReactDOM.findDOMNode(this.refs.message).value.trim();
    let imageid=ReactDOM.findDOMNode(this.refs.fileid).value;

    if(imageid){
     let images=Images.findOne({_id:imageid});
     imageurl=images.url();
     console.log(imageurl);
    }

    let user=Meteor.userId();
    let username=Meteor.user().profile.name;

    Meteor.call('messages.insert',message,user,username,imageid,imageurl);
    this.setState({imageId:""});
    this.resetFields();
  }

  render(){
    return(
    <div className="wrapper">
      <div className="chat-box">
         <p className="chat-heading">Messages</p>
         {this.renderMessage()}

      </div>

      <div className="chat-input">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" ref="fileid" value={this.state.imageId} />
          <input className="chat-message-typer" type="text" ref="message" placeholder="Type here to chat" required />
          <p><input onChange={this.uploadFile.bind(this)} className="file-picker" type="file" /></p>
          <input type="submit" />
        </form>

      </div>

    </div>
    );
  }

}

export default createContainer (() => {
  Meteor.subscribe("chat-messages");

  return {
   chatMessages:Messages.find().fetch(),
   imageData:Images.find().fetch()
 };
},Chat);
