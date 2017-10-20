import React, { Component } from 'react';
import { connect } from 'react-redux'

// import { fetchPosts } from '../actions/actions'
//GET /posts/:id/comments
function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostCommentList extends Component {
  componentDidMount() {
    console.log('componentDidMount', this.props)
  }

  render() {
    const { post, comment, postId} = this.props
    console.log('PostCommentList-check-props', this.props)
    if (postId 
      && comment[postId] 
      && comment[postId].comments) {
      
        return (
          <div className='comment-in-list'>
          {
            comment[postId].comments.map((item) => (
              <div className='row'>
                <div>{item.body}</div>
              </div>
            ))
          }
          </div>
        )


      }

    return null
    }

}

function mapStateToProps({ category, post, comment } ) {
  return {
    category,
    post,
    comment
  }
}


function mapDispatchToProps(dispatch) {
  return {
    // fetchPosts: (category) => dispatch(fetchPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentList)