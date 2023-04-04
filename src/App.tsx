import { Calendar, Header, Sidebar } from './components'
import { Provider } from 'react-redux'
import { store } from '../utils/store'

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <Header/>
        <div className='flex flex-row h-[90vh]'>
          <Sidebar/>
          <Calendar/>
        </div>
      </div>
    </Provider>
  )
}

export default App