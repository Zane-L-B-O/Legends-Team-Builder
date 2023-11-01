import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// JSON response data
import characters from './data/characters.json'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  http.get('http://localhost:1000/api/v1/', (info) => {
    const {
      request,
      params,
      cookies
    } = info
    return HttpResponse.json(characters) // respond using a mocked JSON body
  }),
  http.get('http://localhost:1000/api/v1/', ({ request, params, cookies }) => { // inline destructuring of the info object
    // JSON can be provided in-line
    // an options object can be provided as a second argument to change status and statusText
    return HttpResponse.json({status: 202, statusText: 'Accepted'})
  }),
)
