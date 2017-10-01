import React, { Component } from 'react';
import { connect } from 'react-redux'

// import { fetchPosts } from '../actions/actions'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostCommentsList extends Component {
  componentDidMount() {
    console.log('componentDidMount', this.props)
    // this.props.fetchPosts(this.props.categoryPath)
  }

  render() {
    const { category, post, categoryPath } = this.props
    console.log('CategoryList-render', this.props)
    let commentsForPost = []
    if (post[categoryPath] && post[categoryPath].posts) {
      commentsForPost = post[categoryPath].posts.filter((post) => !post.deleted)

    }
    console.log('PostCommentList-posts', categoryPath, postsForCategory)
    return (
      <ul className='post-comment-list'>
      {
        commentsForPost.map((item) => (
        <li key={item.label}>
          <h3>{trim(item.title)}</h3>
          <div>{item.voteScore}</div>
        </li>
        ))
      }
      </ul>
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
    // fetchPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)