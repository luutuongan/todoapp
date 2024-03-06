import TodoItem from "./TodoItem"
export default function TodosCreated({todos}) {
    
    return (
      <div>
        <h2>TO-DO CREATED</h2>
        <ul>
            {todos.map((todo) => (
            (<TodoItem key={todo.id} todo={todo}/>) ))}
        </ul>       
      </div>)
}