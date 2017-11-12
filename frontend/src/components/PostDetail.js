import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'
import PostCommentList from './PostCommentList'
import PostAddComment from './PostAddComment'
import { fetchPostComments, addPostVote, addEditPost  } from '../actions'
import CategoryAddPost from './CategoryAddPost'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostDetail extends Component {

  state = {
    categoryParam: null,
    postIdParam: null,
    addPostOpen: false,
    modalCategoryType: null,
    modalPostId: null,
  }

  doVote = (direction, categoryId, postId) => {
    const { addPostVote } = this.props
    addPostVote(categoryId, postId, direction)
  }

  openPostModal = (modalCategoryType, modalPostId) => {
    console.log('openPostModal', modalCategoryType, modalPostId)
    this.setState({
      addPostOpen: true,
      modalCategoryType,
      modalPostId
    } )
  }

  closePostModal = () => {
    this.setState(() => ({
      addPostOpen: false,
      modalCategoryType: null,
      modalPostId: null
    }))
  }

  render() {
    const { category, post, comment, addEditPost } = this.props
    const { categoryType, modalCategoryType, modalPostId, addPostOpen } = this.state
    console.log("PostDetail-props", this.props)
    const categoryParam = (this.props.match 
      && this.props.match.params 
      && this.props.match.params.category) ? this.props.match.params.category : null   
    const postIdParam = (this.props.match 
        && this.props.match.params 
        && this.props.match.params.post) ? this.props.match.params.post : null      

    console.log('PostDetail-render', categoryParam, postIdParam, this.props)
    if (postIdParam 
      && categoryParam && category.categoriesMap[categoryParam] 
      && post && post[categoryParam] 
      && post[categoryParam].postsMap && post[categoryParam].postsMap[postIdParam]) {
      const item = post[categoryParam].postsMap[postIdParam]
      if (comment[postIdParam] && comment[postIdParam].comments) {
          post[categoryParam].postsMap[postIdParam].comments = comment[postIdParam].comments
      } 
      console.log('PostDetail-render-item', item)
      

      return (
        <div className='container'>
          <div className="row">
            <div className='col-md-4'>Title</div>
            <div className='col-md-1'>Author</div>
            <div className='col-md-1'># Cmts</div>            
            <div className='col-md-1'>Score</div>
          </div>   

          <div className='row'>
            <div className='col-md-4'>{item.title}</div>
            <div className='col-md-1'>{item.author}</div>
            <div className='col-md-1'>{item.comments?item.comments.length:0}</div>
            <div className='col-md-2'>
              <div className="btn-group">
              <div className="vote circle">
              <div className="increment up" onClick={() => this.doVote('upVote', categoryParam, item.id)}>></div>
              <div className="increment down"onClick={() => this.doVote('downVote', categoryParam, item.id)}></div>
              <div className="count">{item.voteScore}</div>
            </div>  
            </div>
            </div>
              <div className='col-md-2'>
                <div class="btn-group">
                  <button onClick={() => this.openPostModal(categoryParam, item.id)} >Edit Post</button>
                  <button onClick={() => addEditPost(categoryParam, item, item.id, true)} >Delete</button>
                </div>
              </div>
            </div>
              <div className="row">
            <div className='col-md-12'>
              {item.body}
            </div>
            </div>
            <div className="row">
            <div className='col-md-12'>
            <PostAddComment postId={item.id} categoryId={categoryParam}/>
            </div>
            </div>
            <div className='col-md-12'>
              <div className='row'>
                <PostCommentList postId={item.id} />
              </div>
          </div>
          <Modal
          className='modal'
          overlayClassName='overlay'
          contentLabel='Modal'
          isOpen={addPostOpen}
          onRequestClose={this.closePostModal}
        >
        <div>
        { addPostOpen && <CategoryAddPost categoryId={modalCategoryType} postId={modalPostId} closePostModal={this.closePostModal} />}
        </div>
        </Modal>
        </div>
          
      )
    }
    return (
      <Redirect to="/oops/404" />
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
    addPostVote: (categoryId, postId, direction) => dispatch(addPostVote(categoryId, postId, direction)),
    addEditPost: (categoryId, postInfo, postId, isDelete) => dispatch(addEditPost(categoryId, postInfo, postId, isDelete))  
    
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)