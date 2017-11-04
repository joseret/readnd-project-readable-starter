import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories'
import PostDetail from './PostDetail'

class App extends Component {



  render() {
    console.log('render-props', this.props)

    const categories = 
    [
      {  name: 'react', path: 'react'},
      {  name: 'redux', path: 'redux'},
      {  name: 'udacity', path: 'udacity'},            
    ]
    return (
      <div className='container'>
          <h1 className='header'>Project - Readable</h1>
          <ul className="nav nav-tabs">
          <li key='h' role="presentation" className="active">
                <Link to='/' >Home</Link>
          </li>
          {
            categories.map((categoryType) => (
              <li key={categoryType.name} role="presentation">
                <Link to={`/${categoryType.path}`} >{categoryType.name}</Link>
              </li>
            ))
          }
          </ul>
        <Route exact path="/" component={Categories} />
         <Route exact path="/:category" component={Categories} />
        <Route exact path="/category/:category/post/:post" component={PostDetail} />        
      </div>
    );
  }
}


export default App
