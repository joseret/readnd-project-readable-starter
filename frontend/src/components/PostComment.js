import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addEditComment, addCommentVote } from '../actions'

//GET /posts/:id/comments
function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}


class PostComment extends Component {

  state = {
    commentEntryEnabled: false
  }

  formEditComment = (e) => {
    e.preventDefault()
    const { postId, categoryId, commentInfo, addEditComment } = this.props
    if (postId) {
      if (!this.textarea.value) {
        return
      }
      this.setState( {isButtonDisabled: true, commentEntryEnabled: false})
      // this.setState(() => ({loadingFood: true}))
      
      addEditComment(categoryId, postId, commentInfo.id, this.textarea.value, false)
    }
  
  }
  
  doVote = (direction, commentId) => {
    const { postId, categoryId, addCommentVote } = this.props
    addCommentVote(categoryId, postId, commentId, direction)
  }

  render() {
    const { commentInfo, postId, categoryId, addEditComment } = this.props
    const { commentEntryEnabled } = this.state
    return (
      <div className='row'>
        <div className='col col-xs-1'>
          <div className="vote circle">
            <div className="increment up" onClick={() => this.doVote('upVote', commentInfo.id)}>></div>
            <div className="increment down"onClick={() => this.doVote('downVote', commentInfo.id)}></div>
            <div className="count">{commentInfo.voteScore}</div>
          </div>
 
        </div>
          { commentEntryEnabled &&
          <div className='col-12 col-md-auto'>


  
          </div>
        } 

        { !commentEntryEnabled && 
          <div className="row">

          <div className='col-md-2'>
          <button
            className='icon-btn'
            onClick={() => addEditComment(categoryId, postId, commentInfo.id, commentInfo.body, true)}
          >Delete Comment</button>
          <button
            className='icon-btn'
            onClick={() =>this.setState({commentEntryEnabled: true})}>Edit Comment</button>
          </div>

          <div className='col-sm-2'>{commentInfo.author}-</div>
          <div className='col-12 col-md-auto' onClick={() => this.setState({commentEntryEnabled: true})}> {commentInfo.body? commentInfo.body : ''} 
          </div>
          </div>
        }
        { commentEntryEnabled &&
                     <div className="row">
             <div className='col-xs-2'/>

          
          <form>
                  <div className='col-12  col-md-auto'>
                  <textarea
                    className='comment-input'
                    defaultValue={commentInfo.body}
                    cols='40'
                    placeholder='Add new comment'
                    ref={(input) => this.textarea = input}
                  />

                  <button
                className='icon-btn'
                onClick={this.formEditComment}
                disabled={this.state.isButtonDisabled}>Update Comment</button>
              <button
                className='icon-btn'
                onClick={() => this.setState({commentEntryEnabled: false})}
                disabled={this.state.isButtonDisabled}>Cancel Update</button>
                </div>
              </form>
              </div>
        }
     </div>
    
    )
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
    addEditComment: (categoryId, postId, commentId, commentBody, isDelete) => 
      dispatch(addEditComment(categoryId, postId, commentId, commentBody, isDelete)),
    addCommentVote: (categoryId, postId, commentId, direction) => dispatch(addCommentVote(categoryId, postId, commentId, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComment)