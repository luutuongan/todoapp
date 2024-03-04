export default function TodoItem({todo, onSelectTodo}) {

    return (
        <li className="todo-item">
        <article>
        <div>
            <h3>@{todo.userId}</h3>
            <h3>#{todo.id}</h3>
            <h3>{todo.title}</h3>
            <button onClick={() => onSelectTodo={handleSelectTodo}}>編集</button>
            <button>削除</button>
        </div>
        </article>
        </li>
        )
}