import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostCommentList from './PostCommentList'
import PostAddComment from './PostAddComment'
import { fetchPostComments, addPostVote  } from '../actions'


function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostDetail extends Component {

  state = {
    categoryParam: null,
    postIdParam: null,
  }

  doVote = (direction, categoryId, postId) => {
    const { addPostVote } = this.props
    addPostVote(categoryId, postId, direction)
  }

  render() {
    const { category, post, comment } = this.props

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
      && post[categoryParam].postsMap) {
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
          </div>

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
    addPostVote: (categoryId, postId, direction) => dispatch(addPostVote(categoryId, postId, direction))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)