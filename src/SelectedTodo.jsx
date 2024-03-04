import { useRef } from "react";
import Input from "./Input";
export default function SelectedTodo({todo}) {
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    return <div>
        <header>
            <div>
                <h3>ユーザー ID:{todo.userId}</h3>
                <h3>ID:{todo.id}</h3>
                <h3>タイトル:{todo.title}</h3>
                <h3>完了</h3>
            </div>
        </header>
    </div>
}