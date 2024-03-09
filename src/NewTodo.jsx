import { useEffect, useState, useRef } from "react";
import Modal from "./ModalAlert";

export default function NewTodo({onAddTodo, onCancel}) {
  function handleConfirmClick() {
    if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
      handleSave();
    } else {
      console.log("Hành động đã bị hủy!");
    }
  }

  const [todoCreated, setTodoState] = useState({
    id: "",
    userId: "",
    title: ""
  });

  const handleTodoChange = (event) => {
    const { name, value } = event.target;
    console.log("event.target")
    console.log(event.target.value)
    console.log("prev state:")
    console.log(todoCreated)
    setTodoState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("new state:")
    console.log(todoCreated)
  };

  const handleResetId = (event) => {
    console.log("reset !!!")
    console.log("prev state:")
    console.log(todoCreated)
    setTodoState((prevState) => ({
      ...prevState,
      id: ""
    }));
    console.log("new state:")
    console.log(todoCreated)
  };

  const handleResetUserId = (event) => {
    console.log("reset !!!")
    console.log("prev state:")
    console.log(todoCreated)
    setTodoState((prevState) => ({
      ...prevState,
      userId: ""
    }));
    console.log("new state:")
    console.log(todoCreated)
  };

  const handleResetTitle = (event) => {
    console.log("reset !!!")
    console.log("prev state:")
    console.log(todoCreated)
    setTodoState((prevState) => ({
      ...prevState,
      title: ""
    }));
    console.log("new state:")
    console.log(todoCreated)
  };

    const modalValidateExistedID = useRef();
    const modalValidateID = useRef();

    function validateNumber(input) {
        const regex = /^\d+$/; // Regular expression for digits only
        return regex.test(input);
      }

    function handleSave() {
      const enteredId = parseInt(todoCreated.id);
        const enteredUserId = parseInt(todoCreated.userId);
        const enteredTitle = todoCreated.title;
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
            <Modal ref={modalValidateID} buttonCaption="確認">
                <h2>検証</h2>
                <p>Vui lòng nhập ID dưới dạng số !!!</p>
            </Modal>

            <div>
                <article className="todo-item">
                <div>
                    <p>Vui lòng điền những thông tin dưới đây</p>
                    <p>
                    <label>タスク ID:</label>
                    <input style={{marginLeft: "54px", width: "200px"}} name="id" value={todoCreated.id} onChange={handleTodoChange} placeholder="vui lòng nhập dạng số"/>
                    <button className="text-button" style={{paddingTop: "14px", marginLeft: "16px", fontSize:14}} onClick={handleResetId}>リセット</button>
                    </p>
                    <p>
                    <label>ユーザー ID:</label>
                    <input style={{marginLeft: "38px", width: "200px"}} name="userId" value={todoCreated.userId} onChange={handleTodoChange} placeholder="vui lòng nhập dạng số"/>
                    <button className="text-button" style={{paddingTop: "14px", marginLeft: "16px", fontSize:14}} onClick={handleResetUserId}>リセット</button>
                    </p>
                    <p>
                    <label>タイトル:</label>
                    <input style={{marginLeft: "58px", width: "200px"}} name="title" value={todoCreated.title} onChange={handleTodoChange}/>
                    <button className="text-button" style={{paddingTop: "14px", marginLeft: "16px", fontSize:14}} onClick={handleResetTitle}>リセット</button>
                    </p>
                    <button className="button" style={{marginTop: "16px", marginLeft: "14px"}} onClick={handleConfirmClick}>確認</button>
                    
                    <button className="button-del" style={{marginTop: "16px", marginLeft: "16px"}} onClick={onCancel}>キャンセル</button>
                </div>
                </article>
            </div>
        </>
    )
}