import uuidv4 from 'uuid/v4'

import { 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,  
  SETUP_CATEGORY,
  INCLUDE_LOCALHOST,
  API_URL
} from './types'






function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

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
  console.log('fetchCategories', INCLUDE_LOCALHOST)
  return  dispatch => {
    console.log('actions-fetchCategories-pre-requestCategories', API_URL)
    dispatch(requestCategories())
    console.log('actions-fetchCategories-post-requestCategories', API_URL + '/categories')
    return fetch(API_URL + '/categories',
      {
        headers: { 'Authorization': 'whatever-you-want' },
       credentials: INCLUDE_LOCALHOST
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


export function setupCategoryPathFilter(category) {
  console.log(SETUP_CATEGORY+ "-category", category)
  return {
    type: SETUP_CATEGORY,
    category,
    receivedAt: Date.now()
  }
}

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}


function receivePosts(dispatch, category, postId, postInfo) {
  console.log(RECEIVE_POSTS+ "-json", postInfo)
  if (postId) {
    dispatch(fetchPostComments(category, postId))
  } else {
    postInfo.map((post) => {
      dispatch(fetchPostComments(category, post.id))
    })
  }
  return {
    type: RECEIVE_POSTS,
    category,
    postId,
    postInfo,
    receivedAt: Date.now()
  }
}

export function fetchPosts(category, postId) {
  const funcLogName = 'middleware-fetchPosts:'
  console.log(funcLogName + 'entry', {category}, {postId})
  return  dispatch => {
    const url = postId ? `/posts/${postId}` : `/${category}/posts`
    console.log(funcLogName + 'before-fetch', {url})
    return fetch(API_URL + url,
      {
        headers: { 'Authorization': 'whatever-you-want' },
        credentials: INCLUDE_LOCALHOST,
      })
      .then(
        response => response.json(),
        error => console.log(funcLogName + '<<ERROR>>', error)
      )
      .then(json => {
          console.log(funcLogName + 'success', {category,postId,json})
          return dispatch(receivePosts(dispatch, category, postId, json))
      })
  }
}

export function addEditPost(category, postInfo, postId, isDelete) {
  const funcLogName = 'middleware-addEditPost:'
  console.log(funcLogName + 'Entry', {category, postInfo, postId, isDelete})

  return  dispatch => {
    const url = postId ? `/posts/${postId}` : '/posts'

    var parameterMethod = 'post'
    const parameterMap = {
      timestamp: Date.now(),
      category,
      title: postInfo.title,
      body: postInfo.body,
      author: 'joseret',
      parentId: postId
    }
    if (postId) {
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
        credentials: INCLUDE_LOCALHOST,
        body: JSON.stringify(parameterMap)
      })
      .then(
        response => parameterMethod != 'delete' ? response.json() : {},
        error => console.log('An error occured.', error)
      )
      .then(json => {
        console.log(funcLogName + 'success', {category, json})
        return dispatch(fetchPosts(category, isDelete ? null : postId))
        }
      )
  }
}



function requestPostComments(postId) {
  return {
    type: REQUEST_POST_COMMENTS,
    postId
  }
}

function receivePostComments(categoryId, postId, comments) {
  const funcLogName = 'middleware-generate-receivePostComments'
  console.log(funcLogName + RECEIVE_POST_COMMENTS, {categoryId, postId, comments})
  return {
    type: RECEIVE_POST_COMMENTS,
    categoryId,
    postId,
    comments: comments,
    receivedAt: Date.now()
  }
}

export function fetchPostComments(categoryPath, postId) {
  const funcLogName = 'middleware-fetchPostComments:'
  console.log(funcLogName + 'Entry', {categoryPath, postId})
  return  dispatch => {

    console.log(funcLogName + 'before-fetch')
    return fetch(API_URL + `/posts/${postId}/comments`,
      {
        headers: { 'Authorization': 'whatever-you-want' },        
        credentials: INCLUDE_LOCALHOST,
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
