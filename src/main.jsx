import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TaskList from "./components/taskList";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      <nav className='nav'>
          <h1>
            Task List
          </h1>
      </nav>
      <TaskList/>
  </>
)
