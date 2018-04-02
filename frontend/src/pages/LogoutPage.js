import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom';

export class LogoutPage extends Component {

  componentWillMount = () => {
    alert("Logging out");
  }
  

  render() {
    return (
      <Redirect to="/"/>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
