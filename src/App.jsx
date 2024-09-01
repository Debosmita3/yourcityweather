import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Weather from './components/Weather';

const App = () => {
  return (
    <div className='app'>
      <Weather/>
      <ToastContainer/>
    </div>
  )
}

export default App
