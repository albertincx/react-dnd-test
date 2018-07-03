import React from 'react'
import GeneratedList from './components/containers/GeneratedList'
import BuildList from './components/containers/BuildList'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { handleClick } from './components/observers/Observe'
import StaticModal from './components/StaticModal'

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="container">
          <GeneratedList/>
          <BuildList/>
        </div>
        <StaticModal/>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)