import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostComment from './PostComment'

//GET /posts/:id/comments
function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}


class PostCommentList extends Component {


  render() {
    const { post, categoryId, comment, postId} = this.props
    console.log('PostCommentList-check-props', this.props)
    if (postId 
      && comment[postId] 
      && comment[postId].comments) {
      
        return (
          <div className='comment-in-list'>
            <div className='row'>
              <div className='col col-xs-1'>Score</div>
              <div className='col-md-2'>Action</div>
              <div className='col-sm-2'>Author</div>
              <div className='col-12  col-md-auto'>Comment</div>

            </div>
          {
            comment[postId].comments.map((item) => (
              <PostComment commentInfo={item} postId={postId} categoryId={categoryId} />
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
    // addCommentVote: (categoryId, postId, commentId, direction) => dispatch(addCommentVote(categoryId, postId, commentId, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentList)