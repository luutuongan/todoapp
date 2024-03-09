import TodoItem from "./TodoItem";

export default function Todos({todos, onEditTodo, onDeleteTodo}) {

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
  console.log("Todo List start rendering")

  
    return (
      <div>
        <h2>TO-DO の 一覧</h2>
        <p>Hướng dẫn: với mỗi một To-Do, bấm nút bên TRÁI để SỬA, nút bên PHẢI để XÓA nhé</p>
        <p>Để đánh dấu To-Do đã làm xong, hãy bấm nút màu XANH</p>
        <p>Để đánh dấu chưa làm xong, hãy bấm nút màu ĐỎ nhé</p>
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
         <h2 style={{color: "#00FF00"}}>終わった TO-DO:</h2>
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
            <li className="todo-item">         
            <div>
            <h3>#{todo.id}</h3>
                  <h3>ユーザー{todo.userId}</h3>
                  <h3>{todo.title}</h3>
                  <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>                
            </div>
            </li>
        );
        })}</ul>         
      </div>)
}