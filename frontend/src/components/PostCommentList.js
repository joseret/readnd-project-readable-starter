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
    // this.props.fetchPosts(this.props.categoryPath)
  }

  render() {
    const { category, post, comment} = this.props
    const categoryPath = (this.props.match 
      && this.props.match.params 
      && this.props.match.params.category) ? this.props.match.params.category : null
    const postId = (this.props.match 
      && this.props.match.params 
      && this.props.match.params.category) ? this.props.match.params.post : null      
    console.log('PostCommentList-render', categoryPath, postId, this.props)
    if (postId && this.props.post[postId]) {
      const postInfo = this.props.post[postId]
      let commentsForPost = []
      console.log('PostCommentList-posts')
      return (
        <div>
          <h1>{postInfo.title}</h1>
          <ul className='post-comment-list'>
        {
          commentsForPost.map((item) => (
          <li key={item.label}>
            <h3>{trim(item.title)}</h3>
            <div>{item.voteScore}</div>
          </li>
          ))
        }
        </ul>
        </div>
      ) 
    }
    return (<div>working</div>)
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