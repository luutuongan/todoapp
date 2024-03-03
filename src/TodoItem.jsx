export default function TodoItem({todo}) {
    return (
        <li className="todo-item">
        <article>
        <div>
            <h3>#{todo.id}</h3>
            <h3>{todo.title}</h3>
            <button>編集</button><button>削除</button>
        </div>
        </article>
        </li>
        )
}