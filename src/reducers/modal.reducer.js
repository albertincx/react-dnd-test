export function modal (state = {}, action) {
  switch (action.type) {

    case 'show': {
      return {
        html: action.html,
        modalIsOpen: true,
        isDoubleClick: action.isDoubleClick
      }
    }
    case 'hide': {
      return {
        modalIsOpen: false
      }
    }
    default:
      return state
  }
}