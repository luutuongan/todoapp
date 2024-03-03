import Button from "./Button";

export default function NoTodoSelected({onStartAddTodo}) {
    return (
        <div>
            <h2>No To-Do Selected</h2>
            <p>Select a To-Do or get started with a new one</p>
            <p>
                <Button onClick={onStartAddTodo}>Create new To-Do</Button>
            </p>
        </div>
    )
}