import './App.css'
import TaskInput from './Components/TaskInput'
import TaskList from './Components/TaskList'
import WebTitle from './Components/WebTitle'

function App() {
  return (
    <>
      <div className='container'>
        <WebTitle />
        <TaskInput />
        <TaskList />
      </div>
    </>
  )
}

export default App
