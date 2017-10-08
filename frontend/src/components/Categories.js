import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList'
import { setupCategoryPathFilter } from '../actions/actions'
class Categories extends Component {

  state = {
    categoryType: null,
  }

  componentWillReceiveProps() {
    console.log("Categories-componentWillUpdateProps", this.props)
    const categoryType = (this.props.match 
      && this.props.match.params 
      && this.props.match.params.category) ? this.props.match.params.category : null    
    this.setState({categoryType})
  }

  render() {
    const { categories } = this.props
    const { categoryType } = this.state
    console.log('render-props', this.props)



    console.log('Categories-type', categoryType)
    let categoriesView = categories.filter(
      category => (categoryType == null) ||
      category.path == categoryType
    )
    return (
       <div className='categories-info'>
          <ul className='category-info-types'>
            {
              categoriesView.map((categoryType) => (
                <li key={categoryType.name} className='subheader'>
                  <CategoryList categoryPath={categoryType.path} />
                </li>
              ))
            }
            </ul>          
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
    // setupCategoryPathFilter: (category) => dispatch(setupCategoryPathFilter(category))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)