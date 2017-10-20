import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostCommentList from './PostCommentList'
import { fetchPostComments } from '../actions/actions'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

class PostList extends Component {
  // componentWillUpdate() {
  //   console.log('componentWillUpdate', this.props)
  //   if (this.props.post 
  //     && this.props.post[this.props.categoryPath] 
  //     && this.props.post[this.props.categoryPath].posts      
  //   ) {
  //     this.props.post[this.props.categoryPath].posts.map((postEntry) => {
  //       this.props.fetchPostComments(this.props.categoryPath, postEntry.id) 
  //     })
  //   }
  // }

  render() {
    const { category, post, categoryPath, comment } = this.props
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
    postsForCategory.sort(function(x, y) {return x.title > y.title});

    // if (post[categoryPath] && post[categoryPath].posts) {
    //   postsForCategory = post[categoryPath].posts.filter((post) => !post.deleted)

    // }
    console.log('PostList-posts', categoryPath, postsForCategory)
    return (
      <div className='container'>
        <div className="row">
            <div className='col-md-4'>Title</div>
            <div className='col-md-1'>Author</div>
            <div className='col-md-1'># Cmts</div>            
            <div className='col-md-1'>Score</div>
            <div className='col-md-1'>Vote</div>
        </div>       
    
        {
          
          postsForCategory.map((item) => (
            <div className='row'>
              <div className='col-md-1'><Link to={`/category/${categoryPath}/post/${item.id}`}> Detail</Link></div>
              <div className='col-md-4'>{item.title}</div>
              <div className='col-md-1'>{item.author}</div>
              <div className='col-md-1'>{item.comments?item.comments.length:0}</div>
              <div className='col-md-1'>{item.voteScore}</div>     
              <div className='col-md-1'>{item.id}</div>  
              <div className='col-md-2'>
                <div class="btn-group">
                  <button>Up</button>
                  <button>Down</button>
                </div>
              </div>  
              {/* <div className='col-md-12'>
                <div className='row'>
              <PostCommentList postId={item.id} />
               </div>
            </div> */}
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
    fetchPostComments: (category, postId) => dispatch(fetchPostComments(category, postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)