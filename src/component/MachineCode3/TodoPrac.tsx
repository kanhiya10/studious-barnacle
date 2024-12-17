import React,{useState} from 'react'
import TodoFn from './TodoFn';
import './TodoPrac.css';
import TodoFooter from './TodoFooter';

 function TodoPrac() {
  const[CompletedTask,setCompletedTask]=useState<string[]>([]);
  console.log('CompletedTask',CompletedTask);
  return (
    <div className="outerTodoBox">
     <div className="todoBox">
        <div>
            <h1>ToDo</h1>
        </div>
        <div>
            <TodoFn CompletedTask={CompletedTask} setCompletedTask={setCompletedTask}
            />
        </div>
        <TodoFooter  CompletedTask={CompletedTask}/>
     </div>
    </div>
  )
}
export default TodoPrac;