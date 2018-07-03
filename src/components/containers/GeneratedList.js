import React, { Component } from 'react'
import Colors from '../Colors'
import Item from '../Item'

import { DropComponent } from '../DropWrapper'
import style from '../../styles/containerStyle'
import ItemTypes from '../ItemTypes'

class GeneratedList extends Component {

  static ITEM_TYPE = ItemTypes.G

  constructor (props) {
    super(props)
    // this.itemType = ItemTypes.G
    this.state = {
      modalIsOpen: false,
      item: {},
    }
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.appendItem = this.appendItem.bind(this)
    this.random = this.random.bind(this)
    this.moveAll = this.moveAll.bind(this)
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  handleChange (event) {
    const {item} = this.state
    const {value, name} = event.target
    item[name] = value
    this.setState({item})
  }

  closeModal (e) {
    e.preventDefault()
    this.setState({modalIsOpen: false})
  }

  appendItem () {
    this.props.onDrop(this.state.item)
    this.setState({modalIsOpen: false, item: {}})
  }

  randomInteger (min, max) {
    let rand = min + Math.random() * (max + 1 - min)
    rand = Math.floor(rand)
    return rand
  }

  random () {
    let rand = this.randomInteger(1, 10)
    for (let i = 0; i < rand; i++) {
      this.props.onDrop({})
    }
  }

  moveAll () {
    this.props.moveAll(ItemTypes.B)
  }

  render () {
    const {
      type,
      items,
      canDrop,
      isOver,
      itemType,
      lastDroppedColor,
      connectDropTarget,
    } = this.props

    const opacity = isOver ? 1 : 0.7

    let backgroundColor = '#fff'
    switch (itemType) {
      case ItemTypes.B:
        backgroundColor = 'lightblue'
        break
      case ItemTypes.G:
        backgroundColor = 'lightgoldenrodyellow'
        break
      default:
        break
    }
    return (
      <div>
        <button
          className='action-btn'
          onClick={() => {this.openModal()}}
        >Generate
        </button>
        <button
          className='action-btn'
          onClick={() => {this.random()}}
        >Rand
        </button>
        {items.length ? <button
          className='action-btn'
          onClick={() => {this.moveAll()}}
        >Move All
        </button>: null}
        {connectDropTarget && connectDropTarget(
          <div style={{...style, backgroundColor, opacity}}>
            <p>Drop here.</p>
            <div className='list'>
              {items.map((p, index) => (<Item
                color={Colors.YELLOW}
                type={type}
                key={index + type}
                index={index}
                item={p}/>))}
            </div>
          </div>
        )}
        {this.state.modalIsOpen ?
          <div className='overlay'>
            <div className='modal' ref={(me) => {this.modal = me}}>
              <form onSubmit={this.appendItem}>
                <div>Generate new element</div>
                <input type="text" required={true} name='text' onChange={this.handleChange}/>
                <button>OK</button>
                <button className='close' onClick={this.closeModal}>Cancel</button>
              </form>
            </div>
          </div> : null}
      </div>
    )
  }
}

export default DropComponent(GeneratedList)