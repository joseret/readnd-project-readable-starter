import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment } from '../actions/actions'

class PostAddComment extends Component {
  

  formAddComment = (e) => {
    e.preventDefault()
    const { postId, addComment } = this.props
    if (postId) {
      if (!this.input.value) {
        return
      }

      // this.setState(() => ({loadingFood: true}))

      addComment(postId, this.input.value)
    }
  
  }

  render() {
    const { post, comment, postId } = this.props

    return (
      <form>
        <input
          className='comment-input'
          type='text'
          placeholder='Add new comment'
          ref={(input) => this.input = input}
        />
      <button
        className='icon-btn'
        onClick={this.formAddComment}>Add Comment</button>
      </form>
    )
    }

}

function mapStateToProps({ category, post, comment } ) {
  return {
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addComment: (postId, commentText) => dispatch(addComment(postId, commentText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddComment)