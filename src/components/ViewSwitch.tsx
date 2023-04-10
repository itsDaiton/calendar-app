import React from 'react'
import { viewTypes } from '../../utils/data'
import { selectView, setView } from '../slices/viewSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

const ViewSwitch = () => {

  const view: string = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  const handleViewSwitch = (e: React.FormEvent<HTMLInputElement>): void => {
    dispatch(
      setView(e.currentTarget.value)
    )
  }

  return (
    <div className='flex justify-center items-center bg-slate-200 rounded-xl p-1 font-medium'>
      {viewTypes.map((viewType) => (
        <label 
          key={viewType.id}
          htmlFor={viewType.value}
          className={`xl:text-[18px] md:text-[16px] es:text-[14px] text-[10px] cursor-pointer flex justify-center items-center flex-col 
          py-2 xl:px-8 es:px-4 px-2 rounded-xl select-none
          ${viewType.value === view ? 'bg-purple-700 text-white' : 'text-slate-500'}`}
        >
          <input
            type='radio'
            id={viewType.value}
            name='viewType'
            value={viewType.value}
            checked={view === viewType.value}
            className='hidden'
            onChange={handleViewSwitch}
          />
            <span className='md:flex hidden'>
              {viewType.text}
            </span>
            <span className='md:hidden flex'>
              {viewType.text.substring(0, 1)}
            </span>
        </label>
      ))}
    </div>
  )
}

export default ViewSwitch