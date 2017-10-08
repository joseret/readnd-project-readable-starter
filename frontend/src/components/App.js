import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories'
import PostCommentList from './PostCommentList'

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
        <div className='nav'>
          <h1 className='header'>Project - Readable</h1>
          <ul className='category-types'>
          <li key='h' className='subheader'>
                <Link to='/' >Home</Link>
          </li>
          {
            categories.map((categoryType) => (
              <li key={categoryType.name} className='subheader'>
                <Link to={`/${categoryType.path}`} >{categoryType.name}</Link>
              </li>
            ))
          }
          </ul>
        </div>
        <Route exact path="/" component={Categories} />
 
        <Route exact path="/:category" component={Categories} />
        <Route exact path="/category/:category/post/:post" component={PostCommentList} />        
      </div>
    );
  }
}


function mapStateToProps({ category, post } ) {
  return {
    categories: category.categoriesList,
    post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default App
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))