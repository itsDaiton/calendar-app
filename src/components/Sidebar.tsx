import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className='border-r-2 flex justify-center w-[15vw] font-poppins'>
      <div className='flex flex-col flex-wrap'>
        <button 
          className='flex items-center justify-center space-x-2 py-2 my-8 text-[18px] text-slate-500 bg-slate-200 
          rounded-xl font-medium select-none'
        >
          <FontAwesomeIcon icon={faPlus}/>
          <span>Create</span>
        </button>
        <p className='text-center'>TODO Mini-calendar.</p>
      </div>
    </div>
  )
}

export default Sidebar