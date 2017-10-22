import uuidv4 from 'uuid/v4'
import { fetchPosts, fetchPostComments } from './actions'

const API_URL = 'http://localhost:3001'


export const REQUEST_ADD_COMMENT = 'REQUEST_ADD_COMMENT'
function requestAddComment() {
  return {
    type: REQUEST_ADD_COMMENT,
  }
}

export const RECEIVE_ADD_COMMENT= 'REQUEST_ADD_COMMENT'
function receiveAddComment(postId, commentText, json) {
  console.log(RECEIVE_ADD_COMMENT+ "-json", json)
  return {
    type: RECEIVE_ADD_COMMENT,
    json: json,
    receivedAt: Date.now()
  }
}


export function addEditComment(categoryId, postId, commentId, commentText, isDelete) {
  const funcLogName = 'middleware-addEditComment:'
  console.log(funcLogName + 'entry', {categoryId, postId, commentId, commentText, isDelete})
  return  dispatch => {
    console.log(funcLogName + 'before-fetch')
    const url = commentId ? `/comments/${commentId}` : '/comments'
    
    var parameterMethod = 'post'
    const parameterMap = {
      timestamp: Date.now(),
      body: commentText,
      author: 'joseret',
      parentId: postId
    }
    if (commentId) {
      parameterMethod = isDelete ? 'delete' : 'put'
    } else {
      parameterMap['id'] = uuidv4()

    }
    console.log(funcLogName + 'before-fetch', {url, parameterMethod, parameterMap})
    return fetch(API_URL + url,
      {
        method: parameterMethod,
        headers: { 
          'Authorization': 'whatever-you-want',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameterMap)
      })
      .then(
        response => response.json(),
        error => console.log(funcLogName + '<<ERROR>>', error)
      )
      .then(json => {
        console.log(funcLogName + 'success-fetch', json)
        dispatch(fetchPostComments(categoryId, postId))
      }
      )
  }
}


export const REQUEST_ADD_COMMENT_VOTE = 'REQUEST_ADD_COMMENT_VOTE'
function requestAddCommentVote(postId, direction) {
  return {
    type: REQUEST_ADD_COMMENT_VOTE,
  }
}

export const RECEIVE_ADD_COMMENT_VOTE= 'RECEIVE_ADD_COMMENT_VOTE'
function receiveAddCommentVote(postId, direction, json) {
  console.log(RECEIVE_ADD_COMMENT+ "-json", json)
  return {
    type: RECEIVE_ADD_COMMENT,
    json: json,
    receivedAt: Date.now()
  }
}


export function addCommentVote(categoryId, postId, commentId, direction) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('postAddCommentVote')
  return  dispatch => {
    console.log('actions-addCommentVote-pre-requestPostComments')
    dispatch(receiveAddCommentVote(postId, direction))
    console.log('actions-addCommentVote-post-requestPostComments', JSON.stringify(
      { 
        option: direction
      }))
    /*
      `POST /comments` 
      | Add a comment to a post. 
      | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> 
        **timestamp** - [Timestamp] Get this however you want. <br> 
        **body** - [String] <br> 
        **author** - [String] <br> 
        **parentId** - Should match a post id in the database. 
      |
    */
    return fetch(API_URL + '/comments/'+ commentId,
      {
        method: 'post',
        headers: { 
          'Authorization': 'whatever-you-want',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { 
            option: direction
          })
        
      
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => {
        console.log('Comment Addded', json)
        dispatch(fetchPostComments(categoryId, postId))
      }
      )
  }
}


export const REQUEST_ADD_POST_VOTE = 'RECEIVE_ADD_POST_VOTE'
function requestAddPostVote(postId, direction) {
  return {
    type: REQUEST_ADD_POST_VOTE,
  }
}

export const RECEIVE_ADD_POST_VOTE= 'RECEIVE_ADD_POST_VOTE'
function receiveAddPostVote(postId, direction, json) {
  console.log(RECEIVE_ADD_POST_VOTE+ "-json", json)
  return {
    type: RECEIVE_ADD_POST_VOTE,
    json: json,
    receivedAt: Date.now()
  }
}


export function addPostVote(categoryId, postId, direction) {
  const funcLogName = 'middleware-addPostVote:'
  console.log(funcLogName + 'Entry'
    ,'categoryId', categoryId, 'postId', postId, 'direction', direction)
  return  dispatch => {
    console.log(funcLogName + 'dispatch-before-fetch')
  
    return fetch(API_URL + '/posts/'+ postId,
      {
        method: 'post',
        headers: { 
          'Authorization': 'whatever-you-want',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { 
            option: direction
          })
        
      
      })
      .then(
        response => response.json(),
        error => console.log(funcLogName + '<<ERROR>>', error)
      )
      .then(json => {
        console.log(funcLogName + 'success', 'postId', postId, 'data', json)
        dispatch(fetchPosts(categoryId, postId))
      }
      )
  }
}




export function addPost(categoryId, postTitle, postBody) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

}