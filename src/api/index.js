const BASE_URL = 'http://localhost:3001'

// Generic function for making API calls
const apiCall = async (endpoint, method, data = null) => {
  const url = `${BASE_URL}${endpoint}`
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Include body only for methods that require data
  if (data && (method === 'POST' || method === 'PATCH')) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)

  // Throw an error for non-2xx responses
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  // Parse response as JSON for methods that return data
  if (method !== 'DELETE') {
    return await response.json()
  }
}

export default apiCall