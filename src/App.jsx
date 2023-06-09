import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'
import Draggable from 'react-draggable'

function App() {

  return (
    <>

      <div className='container-box'>
        <Draggable>
          <div className='draggable-el'>
            <p>Drag me 1</p>
          </div>
        </Draggable>
        <Draggable>
          <div className='draggable-el-2'>
            <p>Drag me 2</p>
          </div>
        </Draggable>
      </div>
    </>
  )
}

export default App
