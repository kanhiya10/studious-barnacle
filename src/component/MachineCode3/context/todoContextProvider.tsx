import react,{useState,ReactNode}from 'react'
import TodoContext from "./todoContext";

interface TodoContextType{
    children:ReactNode;
}

const TodoContextProvider:React.FC<TodoContextType>=({children})=>{
    const [completed,setCompleted]=useState<string[] >([]);
    const [todoItems,setTodoItems]=useState<string[]>([]);
    return(
        <TodoContext.Provider value={{completed,setCompleted,todoItems,setTodoItems}}>
            {children}
        </TodoContext.Provider>
    )
} 