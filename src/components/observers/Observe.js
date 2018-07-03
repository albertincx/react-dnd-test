let observers = {}
let data = -1
let observerName = ''

function emitChange (method) {
  if (observers[observerName]) {
    if (observers[observerName][method]) {
      observers[observerName][method](data)
    } else {
      observers[observerName][method](data)
    }
  }
}

export default function observe (name, listeners) {
  observers[name] = listeners
  emitChange()
  return () => {
    observers = null
  }
}

export function removeItem (name, index) {
  observerName = name
  data = index
  emitChange('remove')
}

export function dropAll (name, items) {
  observerName = name
  data = items
  emitChange('dropAll')
}