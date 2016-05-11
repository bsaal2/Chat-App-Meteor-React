import React,{Component} from 'react';

export default class MessageList extends Component{
  render(){
    return (<div className="mapped-data">
      <p className="data"><strong>{this.props.data.username}:</strong>&nbsp;{this.props.data.message}&nbsp;<small>{new Date(this.props.data.createdAt).toString().substr(0,15)}</small></p>
      <p><img src={this.props.data.imageUrl} /></p>
    </div>
   );
  }
}
