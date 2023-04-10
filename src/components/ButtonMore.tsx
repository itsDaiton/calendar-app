import React from 'react'

type ButtonMoreProps = {
  setShowModalEvents: (value: React.SetStateAction<boolean>) => void;
}

const ButtonMore = ({ setShowModalEvents }: ButtonMoreProps) => {
  return (
    <div className='w-full flex justify-center'>
    <button
      className='text-blue-500 font-medium hover:text-blue-700 cursor-pointer md:text-[14px] es:text-[12px] text-[10px]'
      onClick={() => setShowModalEvents(true)}
    >
      More...
    </button>
  </div>
  )
}

export default ButtonMore