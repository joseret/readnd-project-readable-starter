import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostCommentList from './PostCommentList'
import { fetchPostComments, addPostVote , addEditPost } from '../actions'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostList extends Component {

 

  doVote = (direction, categoryId, postId) => {
    const { addPostVote } = this.props
    addPostVote(categoryId, postId, direction)
  }

  render() {
    const { category, post, categoryPath, comment, addEditPost } = this.props
    console.log('CategoryList-render', this.props)
    let postsForCategory=[]
    if (post && post[categoryPath] && post[categoryPath].postsMap) {
      postsForCategory = Object.keys(post[categoryPath].postsMap).map(function(key) {
        if (comment[key] && comment[key].comments) {
          post[categoryPath].postsMap[key].comments = comment[key].comments
        }
        return post[categoryPath].postsMap[key] 
      })
    }

    postsForCategory = postsForCategory.sort((x, y) => {
      let val = 0
      
      switch(this.props.sortBy) {
        case 'title':
        case 'voteScore':
          if (x[this.props.sortBy] == y[this.props.sortBy]) {
            return 0
          }
          val = x[this.props.sortBy] < y[this.props.sortBy] ? 1 : -1
          break;
        default:
          val = 0
          break;
      }

      return this.props.sortDesc ? -val : val

 
    })


    console.log('PostList-posts', categoryPath, postsForCategory)
    return (
      <div className='container'>
        <div className="row">
            <div className='col-md-2'>Action</div>
            <div className='col-md-4' onClick={() => this.props.changeSort('title')}>Title</div>
            <div className='col-md-1'>Author</div>
            <div className='col-md-1' onClick={() => this.props.changeSort('count')}># Cmts</div>            
            <div className='col-md-1' onClick={() => this.props.changeSort('voteScore')}>Score</div>
        </div>       
    
        {
          
          postsForCategory.map((item) => (
            <div className='row'>
              <div className='col-md-2'><Link to={`/category/${categoryPath}/post/${item.id}`}>More...</Link></div>
              <div className='col-md-4'>{item.title}</div>
              <div className='col-md-1'>{item.author}</div>
              <div className='col-md-1'>{item.comments?item.comments.length:0}</div> 
              <div className='col-md-2'>
                <div class="btn-group">
                  <div className="vote circle">
                    <div className="increment up" onClick={() => this.doVote('upVote', categoryPath, item.id)}>></div>
                    <div className="increment down"onClick={() => this.doVote('downVote', categoryPath, item.id)}></div>
                    <div className="count">{item.voteScore}</div>
                  </div>
                </div>
              </div>  
              <div className='col-md-2'>
              <div class="btn-group">
                <button onClick={() => this.props.openPostModal(categoryPath, item.id)} >Edit Post</button>
                <button onClick={() => addEditPost(categoryPath, item, item.id, true)} >Delete</button>
              </div>
                </div>

            </div>

          
          ))
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
    fetchPostComments: (category, postId) => dispatch(fetchPostComments(category, postId)),
    addPostVote: (categoryId, postId, direction) => dispatch(addPostVote(categoryId, postId, direction)),
    addEditPost: (categoryId, postInfo, postId, isDelete) => dispatch(addEditPost(categoryId, postInfo, postId, isDelete))  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)