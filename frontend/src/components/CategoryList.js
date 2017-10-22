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
  state = {
    categoryPath: "",
  }

  componentDidMount() {
    this.props.fetchPosts(this.props.categoryPath)
  }

  componentWillReceiveProps(nextProps) {
    console.log('CategoryList-componentWillReceiveProps')
     this.setState({
        categoryPath: this.props.categoryPath
    });
  }  

  render() {
    const { category, categoryPath } = this.props
    console.log('CategoryList-render', this.props)
    // this.props.fetchPosts(this.props.categoryPath)
    return (
 
      <div>
        <PostList sortBy={this.props.sortBy} sortDesc={this.props.sortDesc} changeSort={this.props.changeSort }categoryPath={categoryPath}  openPostModal={this.props.openPostModal}/>
      </div>
    )
  }
}

function mapStateToProps({ category, post, comment } ) {
  return {
    category,
    post,
    comment,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)