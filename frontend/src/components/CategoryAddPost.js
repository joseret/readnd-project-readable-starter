import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addEditPost } from '../actions'

class CategoryAddPost extends Component {
  
  state = {
    isButtonDisabled: false,
    postInfo: {}
  }

  formAddPost = (e) => {
    e.preventDefault()
    const { categoryId, addEditPost, closePostModal, postId } = this.props
    if (categoryId) {
      if (!this.textInputTitle.value) {
        return
      }
      if (!this.textInputBody.value) {
        return
      }
      this.setState( {isButtonDisabled: true})
      // this.setState(() => ({loadingFood: true}))
      
      addEditPost(categoryId, {title: this.textInputTitle.value, body: this.textInputBody.value}, postId)
      closePostModal()
    }
  
  }

  componentWillRender = () => {
    const { categoryId, postId, post } = this.props
    console.log('CategoryAddPost-componentDidUpdate', categoryId, postId, post, post[categoryId], post[categoryId].postsMap[postId])
    this.state.isButtonDisabled = false

    if (postId) {
      this.setState({postInfo: post[categoryId].postsMap[postId]})
      console.log('CategoryAddPost-componentDidUpdate-Input', this.textInputBody, this.textInputBody)
      if (this.textInputTitle) {
        this.textInputTitle.value = post[categoryId].postsMap[postId].title
      }
      if (this.textInputBody) {
        this.textInputTitle.value = post[categoryId].postsMap[postId].body
      }
    } 
  }

  render() {
    const { categoryId, postId, post } = this.props
    console.log('CategoryAddPost', this.state.postInfo, categoryId, postId, post, post[categoryId], post[categoryId].postsMap[postId])
    var postInfo = {}
    if (postId) {
      postInfo= post[categoryId].postsMap[postId]
    } 
    return (
      <form>
        <div class="form-group">
        <input
          className='post-input-title'
          type='text'
          placeholder='Add new title'
          defaultValue={postInfo.title?postInfo.title:''}
          ref={(input) => this.textInputTitle = input}
        />
        </div>
        <div class="form-group">
        <input
          className='post-input-body'
          type='textarea' rows='4'
          placeholder='Add new Post Body'
          defaultValue={postInfo.body?postInfo.body:''}
          ref={(input) => this.textInputBody = input}
        />
        </div>
        <div class="form-group">
      <button
        className='btn btn-primary'
        onClick={this.formAddPost}
        disabled={this.state.isButtonDisabled}>Add Post</button>
        <button
        className='btn'
        disabled={this.state.isButtonDisabled}>Cancel</button>
        </div>
      </form>
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
    addEditPost: (categoryId, postInfo, postId) => dispatch(addEditPost(categoryId, postInfo, postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddPost)