import Input from "./Input"
export default function NewTodo() {
    return (
        <div>
            <menu>
            <li><button>Cancel</button></li>
            <li><button>Save</button></li>
            </menu>
            <div>
                <Input label="User ID" />
                <Input label="ID" />
                <Input label="Title" />
                <Input label="Completed" />
            </div>
        </div>
    )
}