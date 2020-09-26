import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import Home from '../components/Home';

class HomePage extends Component {  //  containers != component
  constructor(props) {
    super(props);
    this.defaultRoomId = String(new Date() - new Date().setHours(0, 0, 0, 0));
    this.state = { roomId: this.defaultRoomId };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) { // 상태 변화
    this.setState({ roomId: e.target.value });
  }
  render(){
    return (
      <Home
        defaultRoomId={this.defaultRoomId}
        roomId={this.state.roomId}
        handleChange={this.handleChange}
      />
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

export default HomePage;