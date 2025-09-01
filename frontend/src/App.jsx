import { useState } from 'react'
import NavBar from './components/NavBar'
import TopBar from './components/TopBar'

function App() {

  return (
    <>
      <TopBar />
      <div className="flex">
        {/* <NavBar /> */}
        <main className='bg-gray-50 flex-1 p-4'>
          <p className='text-2xl font-bold'>Teste</p>
        </main>
      </div>
    </>
  )
}

export default App
