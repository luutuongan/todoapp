import Button from "./Button";

export default function NoTodoSelected({onStartAddTodo}) {
    return (
        <div>
            <p>Bấm nút này để tạo mới một To-Do nhé</p>
            <p>
                <button className="button" onClick={onStartAddTodo}>新規作成</button>
            </p>
        </div>
    )
}