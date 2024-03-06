import { useRef } from "react";
import Modal from "./Modal";
import Input from "./Input"
import Button from "./Button";
export default function NewTodo({onAddTodo, onCancel}) {
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    const modalValidateExistedID = useRef();
    const modalValidateID = useRef();

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
            modalValidateID.current.open();
            return;
        }

        onAddTodo({
            userId: parseInt(enteredUserId),
            id: parseInt(enteredId),
            title: enteredTitle,
            completed: enteredCompleted
        })
    }

    return (
        <>
            <Modal ref={modalValidateID} buttonCaption="OK">
                <h2>検証</h2>
                <p>ID is only in number !!!</p>
            </Modal>

            <div>
                <article className="todo-item">
                <div>
                    <p>
                    <label>タスク ID:</label>
                    <input style={{marginLeft: "46px", width: "200px"}} ref={id} />
                    </p>
                    <p>
                    <label>ユーザー ID:</label>
                    <input style={{marginLeft: "30px", width: "200px"}} ref={userId} />
                    </p>
                    <p>
                    <label>タイトル:</label>
                    <input style={{marginLeft: "50px", width: "200px"}} ref={title} />
                    </p>
                    <button className="button" onClick={handleSave}>確認</button>
                    <button className="button-del" style={{paddingTop: "14px", marginLeft: "16px", fontSize:10}} onClick={onCancel}>キャンセル</button>
                </div>
                </article>
            </div>
        </>
    )
}