
const session = sessionStorage
const prefix = 'smer'

/**
 * cache data to sessionStorage
 * @export
 * @param {string} id 
 * @param {Object} body 
 */
export function setCache (id, body) {
  if (!body) return
  session.setItem(`${prefix}${id}`, JSON.stringify(body))
}

/**
 * 
 * get cache data from sessionStorage
 * @export
 * @param {string} id 
 * @returns {Object} cache 
 */
export function getCache (id) {
  try {
    const cache = session.getItem(`${prefix}${id}`)
    return cache
      ? JSON.parse(cache)
      : null
  } catch (err) {
    throw new Error('parse body err')
  }
}
