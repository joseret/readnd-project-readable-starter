
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

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS= 'RECEIVE_POSTS'
function receivePosts(category, json) {
  console.log(RECEIVE_POSTS+ "-json", json)
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
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
        dispatch(receivePosts(category, json))
      )
  }
}