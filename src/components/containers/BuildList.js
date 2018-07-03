import React, { Component } from 'react'
import Item from '../Item'

import { DropComponent } from '../DropWrapper'
import style from '../../styles/containerStyle'
import ItemTypes from '../ItemTypes'

class BuildList extends Component {

  static ITEM_TYPE = ItemTypes.B

  constructor (props) {
    super(props)
    this.moveAll = this.moveAll.bind(this)
  }

  openModal () {
    const {items} = this.props
    let html = ''
    items.map(
      (item, index) => html +=
        `<li><b>${index + 1}.</b> ${item.text} `
        + ` Moved in ${item.moved.toLocaleDateString('ru')} `
        + `${item.moved.toLocaleTimeString('ru')}</li>`
    )
    if (html) {
      html = `<ul>${html}</ul>`
      this.props.dispatch({type: 'show', html})
    }
  }

  moveAll () {
    this.props.moveAll(ItemTypes.G)
  }

  render () {

    const {
      type,
      items,
      isOver,
      itemType,
      lastDroppedColor,
      connectDropTarget,
    } = this.props

    const opacity = isOver ? 1 : 0.7
    let backgroundColor = '#fff'
    switch (itemType) {
      case ItemTypes.G:
        backgroundColor = 'lightblue'
        break
      case ItemTypes.B:
        backgroundColor = 'lightgoldenrodyellow'
        break
      default:
        break
    }
    return (
      <div>
        <button className='action-btn' onClick={() => {
          this.openModal()
        }}>Build
        </button>
        {items.length ? <button className='action-btn' onClick={() => {
          this.moveAll()
        }}>backAll
        </button> : null}
        {connectDropTarget && connectDropTarget(
          <div style={{...style, backgroundColor, opacity}}>
            <p>Drop here.</p>
            <div className='list'>
              {items.map((p, index) => (<Item
                type={type}
                key={index + type}
                index={index}
                item={p}/>))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DropComponent(BuildList)