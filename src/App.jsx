import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'
import Draggable from 'react-draggable'

function App() {

  return (
    <>
      <Draggable>
        <div className='container-box'>
          <div className='draggable-el'>
            <p>Drag me</p>
          </div>
        </div>
      </Draggable>

    </>
  )
}

export default App
