import Button from "./Button";

function checkCompleted(completed) {
  if (completed) {
    return "終わった ^.^"
  } else return "まだできてない !!!"
}

function renderColorCompleted(completed) {
  if (checkCompleted(completed) === "終わった ^.^") {
    return "#00FF00"
  } else return "#FF0000"
}

export default function Todos({todos, onSelectTodo, onDeleteTodo}) {
  //console.log(todos)
    return (
      <div>
        <h2>TO-DO LIST</h2>
        <p>Hướng dẫn: với mỗi một To-Do, nút bên trái để Sửa, nút bên phải để xóa nhé</p>
        <ul id="todos">{todos
        .map((todo) => {
          return (        
          <li className="todo-item" key={todo.id}>
            <article>
              <div>
                <h3>#{todo.id}</h3>
                <h3>ユーザー{todo.userId}</h3>
                <h3>{todo.title}</h3>
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                <Button onClick={() => onSelectTodo(todo.id)}>編集</Button>
                <Button onClick={() => onDeleteTodo(todo.id)}>削除</Button>
              </div>
            </article>
          </li>
        );
        })}
        </ul>
         <h2>DONE:</h2>
        <ul id="todos">{todos
        .filter((todo) => todo.completed)
        .map((todo) => {
          return (        
          <li className="todo-item" key={todo.id}>
            <article>
              <div>
                <h3>#{todo.id}</h3>
                <h3>ユーザー{todo.userId}</h3>
                <h3>{todo.title}</h3>
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                <Button onClick={() => onSelectTodo(todo.id)}>編集</Button>
                <Button onClick={() => onDeleteTodo(todo.id)}>削除</Button>
              </div>
            </article>
          </li>
        );
        })}</ul>         
      </div>)
}