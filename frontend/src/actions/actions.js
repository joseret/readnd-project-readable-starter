
import uuidv4 from 'uuid/v4'
const API_URL = 'http://localhost:3001'


export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

export const RECEIVE_CATEGORIES= 'RECEIVE_CATEGORIES'
function receiveCategories(json) {
  console.log(RECEIVE_CATEGORIES+ "-json", json)
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories,
    receivedAt: Date.now()
  }
}

export function fetchCategories() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('fetchCategories')
  return  dispatch => {
    console.log('actions-fetchCategories-pre-requestCategories')
    dispatch(requestCategories())
    console.log('actions-fetchCategories-post-requestCategories')
    return fetch(API_URL + '/categories',
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receiveCategories(json))
      )
  }
}

export const SETUP_CATEGORY= 'SETUP_CATEGORY'
export function setupCategoryPathFilter(category) {
  console.log(SETUP_CATEGORY+ "-category", category)
  return {
    type: SETUP_CATEGORY,
    category,
    receivedAt: Date.now()
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS= 'RECEIVE_POSTS'
function receivePosts(dispatch, category, posts) {
  console.log(RECEIVE_POSTS+ "-json", posts)
  posts.map((post) => {
    dispatch(fetchPostComments(category, post.id))
  })
  return {
    type: RECEIVE_POSTS,
    category,
    posts,
    receivedAt: Date.now()
  }
}

export function fetchPosts(category) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('fetchPosts')
  return  dispatch => {
    console.log('actions-fetchPosts-pre-requestPosts')
    dispatch(requestPosts(category))
    console.log('actions-fetchPosts-post-requestPosts')
    return fetch(API_URL + `/${category}/posts`,
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receivePosts(dispatch, category, json))
      )
  }
}



export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS'
function requestPostComments(postId) {
  return {
    type: REQUEST_POST_COMMENTS,
    postId
  }
}

export const RECEIVE_POST_COMMENTS= 'RECEIVE_POST_COMMENTS'
function receivePostComments(categoryId, postId, json) {
  console.log(RECEIVE_POST_COMMENTS+ "-json", json)
  return {
    type: RECEIVE_POST_COMMENTS,
    categoryId,
    postId,
    comments: json,
    receivedAt: Date.now()
  }
}

export function fetchPostComments(categoryPath, postId) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('fetchPostComments')
  return  dispatch => {
    console.log('actions-fetchPostComments-pre-requestPostComments')
    dispatch(requestPosts(categoryPath, postId))
    console.log('actions-fetchPostComments-post-requestPostComments')
    return fetch(API_URL + `/posts/${postId}/comments`,
      {
        headers: { 'Authorization': 'whatever-you-want' }
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receivePostComments(categoryPath, postId, json))
      )
  }
}


export function addComment(postId, commentText) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log('postAddComment')
  return  dispatch => {
    console.log('actions-addComment-pre-requestPostComments')
    //dispatch(addComment(postId, commentText))
    console.log('actions-addComment-post-requestPostComments')
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
    return fetch(API_URL + `/comments`,
      {
        headers: { 'Authorization': 'whatever-you-want' },
        method: 'POST',
        body: {
          id: uuidv4(),
          timestamp: Date.now(),
          body: commentText,
          author: 'joseret',
          parentId: postId

        }
      
      })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        console.log('Comment Addded', json)
       // dispatch(receivePostComments(categoryPath, postId, json))
      )
  }
}