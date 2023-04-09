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
            <div className='flex p-5 border-b-2 border-slate-200'>
              <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex justify-center items-center text-3xl mb-4 space-x-4'>
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <p className='font-semibold'>
                    All events
                  </p>
                </div>
                <p className='text-xl font-semibold text-slate-600'>
                  {date.locale('en').format('dddd').substring(0, 3)} {date.format('DD')}. {date.format('MM')}. {date.format('YYYY')}
                </p>
              </div>
            </div>
            <div className='relative p-5 flex-auto mx-10 space-y-3'>
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
                <span>{`${event.title} (${event.from.format('HH:mm')} - ${event.to.format('HH:mm')})`}</span>
              </div>
              ))}
            </div>
            <div className='flex items-center justify-center p-5'>
              <button
                className='text-[18px] text-white bg-red-500 rounded-xl p-1 font-medium px-8 py-2 select-none space-x-2'
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