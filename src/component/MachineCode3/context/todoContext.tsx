import react,{createContext} from 'react';

type TodoType={
    todoItems:string[];
    setTodoItems:(args:string[])=>void;
    completed:string[];
    setCompleted:(args:string[])=>void;
}
const TodoContext=createContext<TodoType | null>(null);
export default TodoContext;