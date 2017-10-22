import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addEditComment } from '../actions'

class PostAddComment extends Component {
  
  state = {
    isButtonDisabled: false,
  }

  formAddComment = (e) => {
    e.preventDefault()
    const { postId, categoryId, addEditComment } = this.props
    if (postId) {
      if (!this.input.value) {
        return
      }
      this.setState( {isButtonDisabled: true})
      // this.setState(() => ({loadingFood: true}))
      
      addEditComment(categoryId, postId, null, this.input.value)
    }
  
  }

  render() {
    const { post, comment, postId, categoryId } = this.props
    this.state.isButtonDisabled = false
    if (this.input) {
        this.input.value = ''
    }
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
        onClick={this.formAddComment}
        disabled={this.state.isButtonDisabled}>Add Comment</button>
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
    addEditComment: (categoryId, postId, commentId, commentText) => dispatch(addEditComment(categoryId, postId, commentId, commentText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddComment)