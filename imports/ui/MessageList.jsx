import React,{Component} from 'react';

export default class MessageList extends Component{
  render(){
    let image="";
    if(this.props.data.imageUrl){
      image=(
        <img src={this.props.data.imageUrl} className="img-thumbnail" />
      );
    }
    return (<div className="mapped-data">
      <p className="data"><strong>{this.props.data.username}:</strong>&nbsp;{this.props.data.message}&nbsp;<small className="createdAt">{new Date(this.props.data.createdAt).toString().substr(0,15)}</small></p>
      <p>{image}</p>
    </div>
   );
  }
}
