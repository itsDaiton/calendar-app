import React from 'react'

type ButtonMoreProps = {
  setShowModalEvents: (value: React.SetStateAction<boolean>) => void;
}

const ButtonMore = ({ setShowModalEvents }: ButtonMoreProps) => {
  return (
    <div className='w-full flex justify-center mt-1'>
    <button
      className='text-blue-500 font-medium hover:text-blue-700 cursor-pointer'
      onClick={() => setShowModalEvents(true)}
    >
      More...
    </button>
  </div>
  )
}

export default ButtonMore