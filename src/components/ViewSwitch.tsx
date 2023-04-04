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
          className={`text-[18px] cursor-pointer flex justify-center items-center flex-col py-2 px-8 rounded-xl select-none
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
            <span>
              {viewType.text}
            </span>
        </label>
      ))}
    </div>
  )
}

export default ViewSwitch