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



export default function SelectedTodo({todo, onEditTodo, onDeleteTodo, onCancel}) {
    console.log("selected to-do:")
    console.log(todo)
    const modalConfirm = useRef();
    const modalValidate = useRef();
    const userId = useRef();
    const id = useRef();
    const title = useRef();
    let enteredCompleted = todo.completed;

    function handleConfirmClick() {
        if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
          handleSave();
        } else {
          console.log("Hành động đã bị hủy!");
        }
      }
    
      function handleCompletedClick() {
        if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
          handleCompleted();
        } else {
          console.log("Hành động đã bị hủy!");
        }
      }
    
      function handleInCompletedClick() {
        if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
          handleInCompleted();
        } else {
          console.log("Hành động đã bị hủy!");
        }
      }

    function handleCompleted() {

        enteredCompleted = true
        handleSave()
        
    }

    function handleInCompleted() {

        enteredCompleted = false
        
        
        handleSave()
        
    }

    function handleSave() {
        var enteredUserId = todo.userId;
        var enteredTitle = todo.title;
        //var enteredCompleted = completed.current.checked

        // if (completed.current.value === "false") {
        //     enteredCompleted = false
        // }
        console.log("start handle save")
        //console.log("completed value from select box")
        //console.log((completed.current.value))
        //console.log((completed.current.checked))
        console.log(todo)
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
                modalValidate.current.open();
                return;
            }
        }
        
        if (title.current.value !== "") {
            enteredTitle = title.current.value
        }

        onEditTodo({
            userId: enteredUserId,
            id: enteredId,
            title: enteredTitle,
            completed: enteredCompleted
        })

        
    }

    return (
    <>

            <Modal ref={modalValidate} buttonCaption="OK">
                <h2>検証</h2>
                <p>ID is only in number !!!</p>
            </Modal>
            <Modal ref={modalConfirm} buttonCaption="OK">
                <h2>検証</h2>
                <p>ARE YOU SURE</p>
            </Modal>
    <div>
        <header>
        <article className="todo-item">
            <div>
                <p>                    
                <label >タスク ID:</label>     
                <input style={{marginLeft: "47px", width: "200px"}} ref={id} disabled value={todo.id}/>        
                </p>
                <p>
                <label >ユーザー ID:</label>
                <input style={{marginLeft: "30px", width: "200px"}} ref={userId} defaultValue={todo.userId} />
                </p>
                <p>
                <label >タイトル:</label>  
                <input style={{marginLeft: "50px", width: "200px"}} ref={title} defaultValue={todo.title} />
                </p>
                <label>もう終わった?</label>
                <p>
                <input type="checkbox" defaultValue={todo.completed}/>
                <button className="button-done" onClick={handleCompletedClick}>DONE</button>
                <button className="button-undone" style={{marginLeft: "16px"}} onClick={handleInCompletedClick}>UNDONE</button>
                </p>
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                <button className="button" onClick={handleConfirmClick}>確認</button>
                <button className="button-del" style={{marginTop: "12px", marginLeft: "10px"}} onClick={() => onDeleteTodo(todo.id)}>削除</button>
                <button className="button-del" style={{paddingTop: "14px", marginLeft: "16px", fontSize:10}} onClick={onCancel}>キャンセル</button>
            </div>
            </article>
        </header>
    </div>
    </>
    )
}