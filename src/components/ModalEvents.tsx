import dayjs from "dayjs";
import { EventType } from "../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  date: dayjs.Dayjs;
  events: EventType[];
  showModalEvents: boolean;
  setShowModalEvents: (value: React.SetStateAction<boolean>) => void;
  setShowModalSingleEvent: (value: React.SetStateAction<boolean>) => void;
  setSelectedEvent: (value: React.SetStateAction<EventType | undefined>) => void;
}

const ModalEvents = ({ date, events, showModalEvents,setShowModalEvents, setShowModalSingleEvent, setSelectedEvent }: ModalProps) => {

  const clickOutside = (): void => {
    if (showModalEvents) {
      setShowModalEvents(false)
    }
  }

  return (
    <div>
      <div
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'
        onClick={clickOutside}
      >
        <div className='relative w-auto my-6 mx-auto max-w-2xl text-black'>
          <div 
            className='flex flex-col relative w-full rounded-xl shadow-2xl bg-white'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex es:p-5 p-3 border-b-2 border-slate-200'>
              <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex justify-center items-center lg:text-3xl md:text-2xl es:text-xl text-[18px] mb-4 es:space-x-4 space-x-2'>
                  <FontAwesomeIcon icon={faLayerGroup}/>
                  <p className='font-semibold'>
                    All events
                  </p>
                </div>
                <p className='lg:text-xl es:text-[20px] text-[14px] font-semibold text-slate-600'>
                  {date.locale('en').format('dddd').substring(0, 3)} {date.format('DD')}. {date.format('MM')}. {date.format('YYYY')}
                </p>
              </div>
            </div>
            <div className='relative es:p-5 p-0 flex-auto mx-10 space-y-3 es:mt-0 mt-4'>
              {events.map((event, index) => (
              <div 
                key={index} 
                className={`w-full h-[20px] ${event.color} rounded-md text-white font-medium text-sm mb-1 pl-1 pr-2 cursor-pointer`}
                onClick={() => {
                  setSelectedEvent(event)
                  setShowModalEvents(false)
                  setShowModalSingleEvent(true)
                }} 
              >
                <span className='overflow-hidden whitespace-nowrap lg:text-[14px] text-[12px]'>
                  {`${event.title} (${event.from.format('HH:mm')} - ${event.to.format('HH:mm')})`}
                </span>
              </div>
              ))}
            </div>
            <div className='flex items-center justify-center p-5'>
              <button
                className='md:text-[18px] sm:text-[16px] text-[14px] text-white bg-red-500 rounded-xl p-1
                font-medium es:px-8 px-4 py-2 select-none space-x-2'
                type='button'
                onClick={() => setShowModalEvents(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-40 fixed inset-0 z-40 bg-black'/>
    </div>
  )
}

export default ModalEvents