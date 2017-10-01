import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostList from './PostList'
import { fetchPosts } from '../actions/actions'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class CategoryList extends Component {
  componentDidMount() {
    console.log('componentDidMount', this.props)
    this.props.fetchPosts(this.props.categoryPath)
  }

  render() {
    const { category, categoryPath } = this.props
    console.log('CategoryList-render', this.props)
    return (
      <div>
      <h3 className='subheader'>{category.categoriesMap[categoryPath].name}</h3>
      <div>
        <PostList categoryPath={categoryPath} />
      </div>
      </div>
    )
  }
}

function mapStateToProps({ category, post } ) {
  return {
    category,
    post,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)