
export function def (obj, key, value) {
  Object.defineProperty(obj, key, {
    writable: false,
    enumerable: true,
    value: value
  })
}
