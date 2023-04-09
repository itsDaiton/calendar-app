import { Calendar, Header } from './components'
import { Provider } from 'react-redux'
import { store } from '../utils/store'

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <Header/>
        <Calendar/>
      </div>
    </Provider>
  )
}

export default App