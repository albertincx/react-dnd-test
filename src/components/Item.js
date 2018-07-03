import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

import Colors from './Colors'
import { connect } from 'react-redux'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}
const ColorSource = {
  canDrag (props) {
    return !props.forbidDrag
  },

  beginDrag (props) {
    return props.item
  },
  endDrag (props, monitor) {}
}

class Item extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.el.addEventListener('dblclick', this.handleClick)
  }

  componentWillUnmount () {
    this.el.removeEventListener('dblclick', this.handleClick)
  }

  handleClick () {
    const item = this.props.item

    let html = `${item.text} Created in ` +
      `${item.created.toLocaleDateString()} ` +
      `${item.created.toLocaleTimeString()}`

    this.props.dispatch({type: 'show', html, isDoubleClick: true})
  }

  render () {
    const {
      item,
      color,
      isDragging,
      connectDragSource,
      forbidDrag,
      onToggleForbidDrag,
    } = this.props
    const opacity = isDragging ? 0.4 : 1

    let backgroundColor
    switch (color) {
      case Colors.YELLOW:
        backgroundColor = 'lightgoldenrodyellow'
        break
      case Colors.BLUE:
        backgroundColor = 'lightblue'
        break
      default:
        break
    }

    return connectDragSource &&
      connectDragSource(
        <div
          style={{
            ...style,
            backgroundColor,
            opacity,
            cursor: forbidDrag ? 'default' : 'move',
          }} ref={(el) => this.el = el}
        >
          <div className='text'>{item.text}</div>
        </div>
      )
  }
}

const SourceBox = DragSource(
  (props) => props.type + '',
  ColorSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(Item)

class StatefulSourceBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forbidDrag: false,
    }
  }

  render () {
    return (
      <SourceBox
        {...this.props}
        forbidDrag={this.state.forbidDrag}
        onToggleForbidDrag={() => this.handleToggleForbidDrag()}
      />
    )
  }

  handleToggleForbidDrag () {
    this.setState({
      forbidDrag: !this.state.forbidDrag,
    })
  }
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(StatefulSourceBox)