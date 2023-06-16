import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'
import Draggable from 'react-draggable'
import ToggleDraggableBox from './ToggleDraggableBox'

function App() {

  return (
    <>


      <ToggleDraggableBox ToggleDraggableBox={ToggleDraggableBox} />

    </>
  )
}

export default App
