import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
// JSON response data
import characters from './data/characters.json'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  http.get('http://localhost:1000/api/v1/', ({ request }) => {
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url)
 
    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "http://localhost:1000/api/v1/?id=1", "id" will equal "1".
    const id = url.searchParams.get('id')
 
    // Note that query parameters are potentially undefined. If no query is given
    // In that cause return everything
    if (!id) {
      return HttpResponse.json(characters)
    }
    // else return the specific character by finding the element with the matching id
    console.log(id)
    // with the id, find the character from the characters json
    const character = characters.find((element) => element.id === id) // fill in the missing logic
    return HttpResponse.json(character)
  }),
)

