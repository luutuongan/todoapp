import { useState, useRef } from "react";
import Modal from "./Modal";
export default function TodoItem({todo, onEditTodo, onDeleteTodo}) {

    const [editState, setEditState] = useState({
        isCompleted: todo.completed,
        isEditing: false
    });

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
   const handleEdit = () => {
    console.log("handle edit")
    setEditState(() => {
        return {
          isCompleted: todo.completed,
          isEditing: true
        }
      })
    }

   const handleSubmit = () => {
     //e.preventDefault();
    //  handleResetUserId();
    //  handleResetTitle();
     setEditState((prevState) => {
        return {
          isCompleted: prevState.isCompleted,
          isEditing: false
        }
      }) 
   }

   const handleCancel = () => {
    //e.preventDefault();
    handleResetUserId();
    handleResetTitle();
    setEditState(() => {
       return {
         isCompleted: todo.completed,
         isEditing: false
       }
     }) 
  }

   console.log("selected to-do:")
  //  console.log(todo)
   const modalValidate = useRef();
   const modalUserNotExist = useRef();
   const [todoUpdate, setTodoState] = useState({
     userId: todo.userId,
     title: todo.title
   });
   console.log("todo props from parent")
  //  console.log(todo)
   console.log("initial state:")
   console.log(todoUpdate)
   
   const handleTodoChange = (event) => {
     const { name, value } = event.target;
     console.log("event.target")
     console.log(event.target.value)
     console.log("prev state:")
     console.log(todoUpdate)
     setTodoState((prevState) => ({
       ...prevState,
       [name]: value,
     }));
     console.log("new state:")
     console.log(todoUpdate)
   };

   console.log("new value")
   console.log(todoUpdate)

   const handleResetUserId = () => {
    console.log("reset userId !!!")
    console.log("prev state:")
    console.log(todoUpdate)
    setTodoState((prevState) => ({
      ...prevState,
      userId: todo.userId
    }));
    console.log("new state:")
    console.log(todoUpdate)
  };

  const handleResetTitle = () => {
    console.log("reset title !!!")
    console.log("prev state:")
    console.log(todoUpdate)
    setTodoState((prevState) => ({
      ...prevState,
      title: todo.title
    }));
    console.log("new state:")
    console.log(todoUpdate)
  };

   const id = todo.id;

   function handleConfirmClick() {
       if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
         handleSave();
       } else {
         console.log("Hành động đã bị hủy!");
       }
     }

    function handleCancelClick() {
       if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
         handleCancel();
       } else {
         console.log("Hành động đã bị hủy!");
       }
     }

   function handleCompleted() {
       
       setEditState(() => {
        return {
          isCompleted: true,
          isEditing: true
        }
      })
   }

   function handleInCompleted() {
    setEditState(() => {
        return {
          isCompleted: false,
          isEditing: true
        }
      })
   }

   function handleSave() {
       var enteredUserId = parseInt(todoUpdate.userId);
       var enteredTitle = todoUpdate.title;
       console.log("start handle save")
       console.log(todo)
       console.log("entered userId test") 
       
       function validateNumber(input) {
           const regex = /^\d+$/; // Regular expression for digits only
           return regex.test(input);
         }

       
       if (todoUpdate.userId !== undefined) { // nếu nhập thông tin mới
           enteredUserId = todoUpdate.userId
           console.log("entered userId")
           console.log(enteredUserId)
           console.log("checking userID")
           if (!validateNumber(enteredUserId)) {
               
               console.log(enteredUserId)
               console.log("ID not number")
               modalValidate.current.open();
               return;
           }
           if ((enteredUserId < 1) || (enteredUserId > 10)) {
            modalUserNotExist.current.open();
            return;
           }
       }
       
       if (todoUpdate.title !== "") {
           enteredTitle = todoUpdate.title
       }

       onEditTodo({
           userId: parseInt(enteredUserId),
           id: todo.id,
           title: enteredTitle,
           completed: editState.isCompleted
       })

       handleSubmit();
   }
   const displayContent = () => {
    if (editState.isEditing) {
        return (
        <>
        <Modal ref={modalValidate} buttonCaption="確認">
            <h2>検証</h2>
            <p>Vui lòng nhập User ID dưới dạng số !!!</p>
        </Modal>
        <Modal ref={modalUserNotExist} buttonCaption="確認">
            <h2>検証</h2>
            <p>User không tồn tại !!!</p>
        </Modal>
    <div>
        <header>
        <article>
        <div>
                <p>                    
                <label>タスク ID:</label>     
                <label style={{marginLeft: "112px", marginRight:"170px", fontWeight:"bolder"}}>#{todo.id}</label>       
                </p>
                <p>
                <label >ユーザー ID:</label>
                <input style={{marginLeft: "20px", width: "200px", marginTop:"28px"}} name="userId" value={todoUpdate.userId} onChange={handleTodoChange} />
                <button className="text-button" style={{marginLeft: "16px", fontSize:14}} onClick={handleResetUserId}>リセット</button>
                </p>
                <p>
                <label >タイトル:</label>  
                <textarea style={{marginLeft: "39px", width: "200px", marginTop:"18px"}} name="title" value={todoUpdate.title} onChange={handleTodoChange} />
                <button className="text-button" style={{marginLeft: "16px", fontSize:14}} onClick={handleResetTitle}>リセット</button>
                </p>
                <label>もう終わった?</label>
                <p>
                <button className="button-done" onClick={handleCompleted}>もう終わった</button>
                <button className="button-undone" style={{marginLeft: "18px", marginTop:"14px"}} onClick={handleInCompleted}>まだできてない</button>
                </p>
                <h3 style={{marginTop: "30px", color: renderColorCompleted(editState.isCompleted) }}>{checkCompleted(editState.isCompleted)}</h3>
                <button className="button" style={{marginTop: "14px"}} onClick={handleConfirmClick}>確認</button>
                <button className="button-del" style={{marginTop: "14px", marginLeft: "14px"}} onClick={() => onDeleteTodo(todo.id)}>削除</button>
                <button className="button-del" style={{marginTop: "14px", marginLeft: "16px"}} onClick={handleCancelClick}>キャンセル</button>
            </div>
            </article>
        </header>
    </div>
    </>
       )
    } else {
      return (
        <div>
          <h3>#{todo.id}</h3>
                <h3>ユーザー{todo.userId}</h3>
                <h3>{todo.title}</h3>
                <h3 style={{ color: renderColorCompleted(todo.completed) }}>{checkCompleted(todo.completed)}</h3>
                <button className="button" onClick={handleEdit}>編集</button>
                <button className="button-del" style={{marginTop: "12px", marginLeft: "10px"}} onClick={() => onDeleteTodo(todo.id)}>削除</button>
        </div>
      );
    }
  };

   return <div>{displayContent()}</div>;

}