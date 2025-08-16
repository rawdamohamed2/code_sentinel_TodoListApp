import TodoList from '../TodoList/TodoList.jsx' 
import { Component } from 'react'
import './App.css'
export class App extends Component {
  render() {
    return (
    <>
     <div className='flex flex-col items-center pt-2 md:pt-5 md:p-0 px-2 w-full min-h-dvh bgColor justify-center'>
        <TodoList/>
     </div>
    </>
  )
  }
}

export default App
