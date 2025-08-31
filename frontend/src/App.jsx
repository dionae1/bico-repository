import { useState } from 'react'
import NavBar from './NavBar'

function App() {

  return (
    <>
      <div className="flex">
        <NavBar />
        <main className="flex-1 p-4">
          <p className='text-2xl font-bold'>Teste</p>
        </main>
      </div>
    </>
  )
}

export default App
