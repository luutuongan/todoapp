import TodoItem from "./TodoItem"
import Button from "./Button";

export default function Todos({todos, onSelectTodo}) {
  console.log(todos)
    return (
      <div>
        <h2>TO-DO</h2>
        <ul id="todos">{todos
        .map((todo) => {
          return (        
          <li className="todo-item" key={todo.id}>
            <article>
              <div>
                <h3>@{todo.userId}</h3>
                <h3>#{todo.id}</h3>
                <h3>{todo.title}</h3>
                <h3>{todo.completed}</h3>
                <Button onClick={() => onSelectTodo(todo.id)}>編集</Button>
              </div>
            </article>
          </li>
        );
        })}
        </ul>
         <h2>DONE</h2>
        <ul id="todos">{todos
        .filter((todo) => todo.completed)
        .map((todo) => (<TodoItem key={todo.id} todo={todo}/>))}</ul>         
      </div>)
}