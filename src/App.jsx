import { useState } from 'react'
import './App.css'

import StepFormContainer from './components/StepForm/StepFormContainer.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="App">
      <StepFormContainer />
    </div>
    </>
  )
}

export default App
