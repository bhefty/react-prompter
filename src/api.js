function fetchAllScripts(user, cb) {
  return fetch(`api/all/${user}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    console.log(error)
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

const Prompt = { fetchAllScripts }
export default Prompt
