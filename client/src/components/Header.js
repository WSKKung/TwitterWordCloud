import "../styles/Header.css"
import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "asawa"
    }
  }

  render() {
	return (
        <header className="header">
          <picture className="logo">
            <source srcSet="TwitterLogo.png" />
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="TwitterLogo" style={{ width: 'auto' }} />
          </picture>
          <p className="title">
            WORD-CLOUD-API
          </p>
        </header>
	)
  }

}