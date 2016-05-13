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
    <div className="row">
      <div className="col-xs-7 col-xs-offset-2 col-sm-7 col-sm-offset-2 col-md-7 col-md-offset-2 col-lg-7 col-lg-offset-2">
         <h1 className="lead">Messages</h1>
         {this.renderMessage()}
     </div>

      <div className="col-xs-5 col-xs-offset-2 col-sm-5 col-sm-offset-2 col-md-5 col-md-offset-2 col-lg-5 col-lg-offset-2">
        <form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
         <input type="hidden" ref="fileid" value={this.state.imageId} />
         <div className="form-group message-group">
          <input className="form-control" type="text" ref="message" placeholder="Type here to chat" required />
         </div>
          <input onChange={this.uploadFile.bind(this)} className="form-control" id="fileupload" type="file" />
          <button className="btn btn-default message-submit" type="submit">Submit</button>
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
