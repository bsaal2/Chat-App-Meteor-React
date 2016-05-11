import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Images} from './file.js';
export const Messages = new Mongo.Collection("messages");

if(Meteor.isServer){
  Meteor.publish("chat-messages",function messagePublication(){
    return [
      Messages.find(),
      Images.find()
    ]
  });

  Meteor.methods({
  'messages.insert'(message,userId,username,imageid,imageUrl){
    check(message,String);
    check(userId,String);
    check(imageid,String);

    if(!Meteor.userId()){
      throw new Meteor.Error('Not authorized');
    }
    if(Meteor.userId()=="miArrnM2LAve9yKjH"){
    Messages.insert({message:message,owner:userId,username:username,imageid:imageid,imageUrl:imageUrl,createdAt:Date.now(),sentTo:"MQdpaG2tnE4jLpkST"});
   }
   else{
     Messages.insert({message:message,owner:userId,username:username,imageid:imageid,imageUrl:imageUrl,createdAt:Date.now(),sentTo:"miArrnM2LAve9yKjH"});
   }

  },

  });

}
