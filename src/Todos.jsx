import TodoItem from "./TodoItem";
import SelectedTodo from "./SelectedTodo";

export default function Todos({todos, onEditTodo, onDeleteTodo}) {
  console.log("Todo List start rendering")
  console.log(todos)
  console.log("handle edit")
    return (
      <div>
        <h2>TO-DO LIST</h2>
        <p>Hướng dẫn: với mỗi một To-Do, nút bên trái để Sửa, nút bên phải để xóa nhé</p>
        <ul id="todos">{todos.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            })
        .map((todo) => {
          return (
            <li className="todo-item"> <TodoItem key={todo.id} todo={todo} onEditTodo={onEditTodo} onDeleteTodo={onDeleteTodo}/>
            </li>
          )
        })}
        </ul>
         {/* <h2>DONE:</h2>
        <ul id="todos">{todos
        .filter((todo) => todo.completed)
        .sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
        .map((todo) => {
          return (        
          <li className="todo-item" key={todo.id}>
            <article>
              <div>
                <h3>#{todo.id}</h3>
                <h3>ユーザー{todo.userId}</h3>
                <h3>{todo.title}</h3>
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                <button className="button" onClick={() => onSelectTodo(todo)}>編集</button>
                <button className="button-del" style={{marginTop: "12px", marginLeft: "10px"}}onClick={() => onDeleteTodo(todo.id)}>削除</button>
              </div>
            </article>
          </li>
        );
        })}</ul>          */}
      </div>)
}