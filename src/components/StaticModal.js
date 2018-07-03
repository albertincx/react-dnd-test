import React from 'react'
import { connect } from 'react-redux'

class StaticModal extends React.Component {

  constructor (props) {
    super(props)
    this.isOpen = false
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate () {
    if (this.props.modalIsOpen) {
      this.isOpen = true
      window.addEventListener('click', this.handleClick)
    } else {
      window.removeEventListener('click', this.handleClick)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleClick)
  }

  handleClick (event) {
    if (this.isOpen && !this.props.isDoubleClick) {
      this.isOpen = false
      return
    }
    const el = event.target
    if(el === this.modal || el.closest('.modal') === this.modal){
      //
    } else {
      this.props.dispatch({type: 'hide'})
    }
  }

  render () {
    const {html, modalIsOpen} = this.props
    return modalIsOpen ? (
      <div className='overlay'>
        <div
          className="modal build-modal"
          ref={r => this.modal = r}>
          <div className="content" dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
      </div>
    ) : null
  }
}

function mapStateToProps (state) {
  const {html, modalIsOpen, isDoubleClick} = state.modal
  return {
    html, modalIsOpen, isDoubleClick
  }
}

export default connect(mapStateToProps)(StaticModal)