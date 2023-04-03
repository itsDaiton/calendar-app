import React, { useState } from 'react'
import { Calendar, Header, Sidebar } from './components'
import dayjs from 'dayjs'

const App = () => {

  const currentDate = dayjs()
  const currentMonth = currentDate.month()
  const currentYear = currentDate.year()

  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    }
    else {
      setMonth(month + 1)
    }
  }

  const previousMonth = () => {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    }
    else {
      setMonth(month - 1)
    }
  }

  return (
    <div>
      <Header/>
      <div className='flex flex-row'>
        <Sidebar/>
        <div className='flex flex-row items-start space-x-5 p-10 text-[36px] font-poppins'>
          <button onClick={() => previousMonth()}>{'<'}</button>
          <button onClick={() => nextMonth()}>{'>'}</button>
        </div>
        <Calendar year={year} month={month}/>
      </div>
    </div>
  )
}

export default App