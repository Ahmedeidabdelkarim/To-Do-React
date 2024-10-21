import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTodos,action){
    switch(action.type){
        case "added":{
            const newTodo = {
                id: uuidv4(),
                title: action.payload.title,
                details: "####",
                isCompleted: false,
              };
              const updatedTodos = [...currentTodos, newTodo];
              localStorage.setItem("todos", JSON.stringify(updatedTodos));
              return updatedTodos;
              
        }
        case "deleted":{
            const updatedTodos = currentTodos.filter(todo=>todo.id!==action.payload);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "updated":{
            const updatedTodos = currentTodos.map(todo=>todo.id===action.payload.id?{...todo,title:action.payload.title,details:action.payload.details}:todo);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "get":{
            return JSON.parse(localStorage.getItem("todos")) || [];
        }

        case "toggled":{
            const updatedTodos=currentTodos.map((t)=>{
                return t.id===action.payload.id?{...t,isCompleted:!t.isCompleted}:t;
              })
              localStorage.setItem('todos', JSON.stringify(updatedTodos));
              return updatedTodos;
        }
        default:
            throw Error("unknown action" + action.type);
    }
    

}