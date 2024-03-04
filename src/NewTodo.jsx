import { useRef } from "react";
import Modal from "./Modal";
import Input from "./Input"
export default function NewTodo({onAdd}) {
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    const modal = useRef();

    function checkDuplicatedID(input) {

    }

    function validateNumber(input) {
        const regex = /^\d+$/; // Regular expression for digits only
        return regex.test(input);
      }

    function handleSave() {
        const enteredUserId = userId.current.value;
        const enteredId = id.current.value;
        const enteredTitle = title.current.value;

        if (!validateNumber(enteredId) || !validateNumber(enteredUserId)) {
            modal.current.open();
            return;
        }

        onAdd({
            userId: enteredUserId,
            id: enteredId,
            title: enteredTitle
        })
    }

    function handleCancel() {
        
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="OK">
                <h2>検証</h2>
                <p>ID is only in number !!!</p>
            </Modal>
            <div>
                <menu>
                    <li><button>キャンセル</button></li>
                    <li><button onClick={handleSave}>保存</button></li>
                </menu>
                <div>
                    <Input ref={userId} label="ユーザー ID" />
                    <Input ref={id} label="ID" />
                    <Input ref={title} label="タイトル" />
                    <Input label="完了" />
                </div>
            </div>
        </>
    )
}