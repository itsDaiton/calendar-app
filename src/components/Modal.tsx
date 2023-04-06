import dayjs from "dayjs";

type ModalProps = {
  date: dayjs.Dayjs
  events: {
    title: string;
    from: dayjs.Dayjs;
    to: dayjs.Dayjs;
    color: string;
  }[];
  setShowModal: any;
  showModal: boolean;
}

const Modal = ({ date, events, setShowModal, showModal }: ModalProps) => {

  const clickOutside = (): void => {
    if (showModal) {
      setShowModal(false)
    }
  }

  return (
    <div>
      <div
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'
        onClick={clickOutside}
      >
        <div className='relative w-auto my-6 mx-auto max-w-2xl'>
          <div 
            className='flex flex-col relative w-full rounded-xl shadow-xl bg-white'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex p-5 border-b-2 border-slate-200'>
              <div className="flex flex-col justify-center items-center w-full">
              <p className='text-2xl font-semibold'>
                {date.locale('en').format('dddd').substring(0, 3)}
              </p>
              <p className='text-2xl font-semibold'>
                {date.date()}
              </p>
              </div>
            </div>
            <div className='relative p-5 flex-auto'>
              {events.map((event, index) => (
              <div key={index} className={`w-full h-[20px] ${event.color} rounded-md text-white font-medium text-sm mb-1 pl-1 pr-2`}>
                <span>{`${event.title} (${event.from.format('HH:mm')} - ${event.to.format('HH:mm')})`}</span>
              </div>
              ))}
            </div>
            <div className='flex items-center justify-center p-5 border-t-2 border-slate-200'>
              <button
                className='text-[18px] text-white bg-red-500 rounded-xl p-1 font-medium px-8 select-none space-x-2'
                type='button'
                onClick={() => setShowModal(false)}
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

export default Modal