import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

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

export default function SelectedTodo({todo, onEdit, onCancel}) {
    console.log("selected to-do:")
    console.log(todo)
    const modal = useRef();
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    const completed = useRef();

    function handleSave() {
        var enteredUserId = todo.userId;
        var enteredTitle = todo.title;
        var enteredCompleted = todo.completed;
        console.log("start handle save")
        console.log(enteredUserId)
        const enteredId = todo.id;  
        
        function validateNumber(input) {
            const regex = /^\d+$/; // Regular expression for digits only
            return regex.test(input);
          }

        
        if (userId.current.value !== "") { // nếu không nhập thông tin mới
            enteredUserId = userId.current.value 
            console.log(enteredUserId)
            if (!validateNumber(enteredUserId)) {
                console.log("checking userID")
                console.log(enteredUserId)
                modal.current.open();
                return;
            }
        }
        
        if (title.current.value !== "") {
            enteredTitle = title.current.value
        }

        if (enteredCompleted !== completed.current.checked){
            enteredCompleted = completed.current.checked
        }

        onEdit({
            userId: enteredUserId,
            id: enteredId,
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
        <header>
        <article className="todo-item">
            <div>
                <Input ref={id} label="ID" value={todo.id}/>
                <Input ref={userId} label="ユーザー ID" placeholder={todo.userId} />
                <Input ref={title} label="タイトル" placeholder={todo.title} />
                <Input type="checkbox" label="もう終わった？" ref={completed} />    
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                    <button onClick={handleSave}>保存</button>
                    <button onClick={onCancel}>キャンセル</button>
            </div>
            </article>
        </header>
    </div>
    </>
    )
}