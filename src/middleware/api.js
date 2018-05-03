import {find, assign} from 'lodash';

const API_ROOT = 'http://gbcs-dev.embl.de:81/api/'

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }
  const nextLink = find(link.split(','), s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, fetchData, entityType, callback) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  //add noCache param to ignore cache mode
  const noCacheParam = `${fullUrl.indexOf('?') === -1 ? '?' : '&'}_=${new Date().getTime()}`
  return fetch(`${(fetchData.method === 'GET') ? fullUrl + noCacheParam : fullUrl}`, fetchData, callback)
    .then(response => {
        if (callback) {
          callback()
        }
        // fail request
        if (!response.ok) {
          return Promise.reject(response)
        }
        // No Content
        // if (response.status === 204) {
        //   return response
        // }

        // success request
        return response.json().then(json => {
          // const camelizedJson = camelizeKeys(json)
          const nextPageUrl = getNextPageUrl(response)
          const temp = {}
          temp[entityType] = json

          return assign({},
            temp,
            {nextPageUrl}
          )
        }, err => {
          const nextPageUrl = getNextPageUrl(response)
          const temp = {}
          temp[entityType] = null
          return assign({},
            temp,
            {nextPageUrl}
          )
        })
      }
    )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint} = callAPI
  const {types, fetchData, entityType} = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error(`Error: Endpoint url must a string \n ${endpoint} `);//new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error(`Error: Request require an array of three action types. Please check \n ${endpoint}  `);//new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error(`Error: ${endpoint} required action types to be strings.`)
  }

  const actionWith = data => {
    const finalAction = assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next({type: requestType})
  next(actionWith({type: 'SHOW_INDICATOR', endpoint}))

  return callApi(endpoint, fetchData, entityType, () => next({type: 'HIDE_INDICATOR', endpoint})).then(
    response =>
      next(actionWith({
        response,
        type: successType,
      })),
    error =>
      next(actionWith({
        type: failureType,
        error: error.message || error.statusText || `Error: ${endpoint} not return error message`//'Something bad happened',
      }))
  )
}