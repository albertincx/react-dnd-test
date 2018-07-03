import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import observe, { removeItem, dropAll } from './observers/Observe'

export function DropComponent (WrappedComponent) {

  const Target = {
    drop (props, monitor) {
      const item = monitor.getItem()
      if (item.type !== WrappedComponent.ITEM_TYPE) {
        removeItem(item.type, item.index)
        item.type = WrappedComponent.ITEM_TYPE
        item.moved = new Date()
        props.onDrop(item)
      }
    }
  }

  const TargetBox = DropTarget([ItemTypes.G, ItemTypes.B],
    Target, (connect, monitor) => {
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
      }
    })(WrappedComponent)

  class DnD extends Component {

    constructor (props) {
      super(props)
      this.state = {
        items: [],
        lastDroppedColor: null
      }
      this.removeItem = this.removeItem.bind(this)
      this.handleDropAll = this.handleDropAll.bind(this)
    }

    componentDidMount () {
      observe(WrappedComponent.ITEM_TYPE, {
        'remove': this.removeItem.bind(this),
        'dropAll': this.handleDropAll.bind(this)
      })
    }

    componentWillUnmount () {
      this.unobserve()
    }

    unobserve () {
      observe(null)
    }

    handleDropAll (d) {
      let clearContainerType = ''
      if (d && d.length) {
        clearContainerType = d[0].type
        let itemIndex = this.state.items.length
        d.map((item) => {
          //item.index = itemIndex
          item.type = WrappedComponent.ITEM_TYPE
          item.moved = new Date()
          itemIndex++
        })
        const items = this.state.items.concat(d)
        items.map((item, i) => item.index = i)
        this.setState({items})
        removeItem(clearContainerType, -1)
      }
    }

    moveAll (type) {
      dropAll(type, this.state.items)
    }

    removeItem (index) {
      let items = []
      if (index >= 0) {
        items = this.state.items.filter((item, i) => item.index !== index)
      }
      this.setState({items})
    }

    handleDrop (item) {
      const items = this.state.items
      if (!item.text) item.text = `Text${items.length}`
      item.type = WrappedComponent.ITEM_TYPE
      if(!item.created) item.created = new Date()
      item.index = items.length
      items.push(item)
      items.map((item, i) => item.index = i)

      this.setState({items})
    }

    render () {
      return (
        <div>
          <TargetBox
            moveAll={type => this.moveAll(type)}
            type={WrappedComponent.ITEM_TYPE}
            {...this.props}
            {...this.state}
            onDrop={(item => this.handleDrop(item))}
            modalIsOpen={this.props.modalIsOpen}
          />
          <p>Count {this.state.items.length}</p>
        </div>
      )
    }
  }

  function mapStateToProps () {
    return {}
  }

  return connect(mapStateToProps)(DnD)
}