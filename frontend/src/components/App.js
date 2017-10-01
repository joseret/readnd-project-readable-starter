import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList'

class App extends Component {

  state = {
    categoryPathFilter: null,
  }

  render() {
    const { categories } = this.props
    console.log('render-props', this.props)
    let categoriesView = categories.filter(
      category => (this.state.categoryPathFilter == null) ||
      category.path == this.state.categoryPathFilter
    )
    return (

      <div className='container'>
        <div className='nav'>
          <h1 className='header'>Project - Readable</h1>
          <ul className='category-types'>
          {
            categoriesView.map((categoryType) => (
              <li key={categoryType.name} className='subheader'>
                {categoryType.name}
              </li>
            ))
          }
          </ul>
        </div>
        <div className='categories'>
          <ul className='category-types'>
            {
              categoriesView.map((categoryType) => (
                <li key={categoryType.name} className='subheader'>
                  <CategoryList categoryPath={categoryType.path} />
                </li>
              ))
            }
            </ul>          
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(App)