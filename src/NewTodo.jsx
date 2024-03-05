import { useRef } from "react";
import Modal from "./Modal";
import Input from "./Input"
import Button from "./Button";
export default function NewTodo({onAdd, onCancel}) {
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    const modal = useRef();

    function validateNumber(input) {
        const regex = /^\d+$/; // Regular expression for digits only
        return regex.test(input);
      }

    function handleSave() {
        const enteredUserId = userId.current.value;
        const enteredId = id.current.value;
        const enteredTitle = title.current.value;
        const enteredCompleted = false

        if (!validateNumber(enteredId) || !validateNumber(enteredUserId)) {
            modal.current.open();
            return;
        }

        onAdd({
            userId: parseInt(enteredUserId),
            id: parseInt(enteredId),
            title: enteredTitle,
            completed: enteredCompleted
        })
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="OK">
                <h2>検証</h2>
                <p>ID is only in number !!!</p>
            </Modal>
            <div>
                <article className="todo-item">
                <div>
                    <Input ref={id} label="ID" />
                    <Input ref={userId} label="ユーザー ID" />
                    <Input ref={title} label="タイトル" />
                    <Button onClick={handleSave}> 保存</Button>
                    <Button onClick={onCancel}>キャンセル</Button>
                </div>
                </article>
            </div>
        </>
    )
}