import React from 'react'
import { Calendar, Header, Sidebar } from './components'

const App = () => {
  return (
    <div>
      <Header/>
      <div className='flex flex-row'>
      <Sidebar/>
      <Calendar/>
      </div>
    </div>
  )
}

export default App