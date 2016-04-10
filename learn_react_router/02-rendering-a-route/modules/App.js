import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'


export default React.createClass({
  render() {
    return (
      <div>
        <div>Hello, React Router!</div>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
