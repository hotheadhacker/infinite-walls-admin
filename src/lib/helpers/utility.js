export function clearToken() {
  localStorage.removeItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', JSON.stringify(token))
}

export function getToken() {
  try {
    return JSON.parse(localStorage.getItem('token'))
  } catch (err) {
    clearToken();
    return null
  }
}

