import {useState, useEffect, useRef } from "react";
import Header from './Header.jsx';
import NoTodoSelected from './NoTodoSelected.jsx';
import Todos from './Todos.jsx'
import NewTodo from './NewTodo.jsx';
import Modal from "./Modal.jsx";
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function App() {
  const modalValidateExistedID = useRef();
  const modalCongrats = useRef();
  //const fetchedTodos = localStorage.getItem('fetchedTodos')
  const [todosState, setTodosState] = useState({
    addTodoFlag: false,
    todos: []
  })
  useEffect(() => {
      async function fetchTodos() {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos')

       if (!response.ok) {

          }
          const todos = await response.json()
          setTodosState(prevState => {
            return {
              ...prevState,
              todos: (getMultipleRandom(todos, 10)
              .sort((a, b) => {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                }))
            }
          })
      }
          fetchTodos()
  }, [])

  console.log("fetched")
  
  function handleFetchTodos() {
    async function fetchTodos() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')

   if (!response.ok) {

      }
      const todos = await response.json()
      setTodosState(prevState => {
        return {
          ...prevState,
          todos: prevState.todos.concat(getMultipleRandom(todos, 10)
          )
        }
      })
  }
      fetchTodos()
      modalCongrats.current.open()
  }

  function handleFetchClick() {
    if (window.confirm("Bạn có chắc chắn muốn lấy thêm 10 to-do mẫu không?")) {
      handleFetchTodos();
    } else {
      console.log("Hành động đã bị hủy!");
    }
  }

  function handleDeleteClick(id) {
    if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
      handleDeleteTodo(id);
    } else {
      console.log("Hành động đã bị hủy!");
    }
  }

  function handleCancelClick() {
    if (window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?")) {
      handleCancelTodo();
    } else {
      console.log("Hành động đã bị hủy!");
    }
  }

  function handleStartAddTodo() {
    setTodosState(prevState => {
      return {
        ...prevState,
        addTodoFlag: true
      }
    })
  }

  function handleCancelTodo() {
    setTodosState(prevState => {
      return {
        ...prevState,
        addTodoFlag: false
      }
    })
  }

  function handleAddTodo(todoData) {
    console.log("find existing")
    
    const existedTodo = {
      ...todoData,
    }
    console.log(existedTodo)
    if ((todosState.todos.find(todo => todo.id === existedTodo.id)) === undefined) {
    setTodosState(prevState => {
      const newTodo = {
        ...todoData,
      }
      return {
        ...prevState,
        addTodoFlag: false,
        todos: [...prevState.todos, newTodo],
      }
    })
    modalCongrats.current.open()
    }
    else {setTodosState(prevState => {
      
      return {
        ...prevState,
      }
    })
    modalValidateExistedID.current.open()
  }
  }

  function handleEditTodo(todoData) {
    setTodosState(prevState => {
      const editedTodo = {
        ...todoData,
      }
      console.log("edit to-do values:")
      console.log(editedTodo)
      const querySelectedTodo = prevState.todos.find(todo => todo.id === editedTodo.id)
      console.log("handle edit selected to-do")
      console.log(querySelectedTodo)
      return {
        ...prevState,
        todos: prevState.todos.map((todo) => {
          if (todo.id === querySelectedTodo.id)
          {return editedTodo}
          return todo
          
      }
    )
    }
  })
  modalCongrats.current.open()
}

  function handleDeleteTodo(id) {
    console.log("id to delete:")
    console.log(id)
    
    setTodosState((prevState) => {
      return {
        ...prevState,
        addTodoFlag: false,
        todos: prevState.todos.filter((todo) => 
          todo.id !== id
        )
      }
    })
    modalCongrats.current.open()
  }
  
    

  console.log("to-do state:")
  console.log(todosState)

  var contentAddTodo;
  if (todosState.addTodoFlag) {
    contentAddTodo = <NewTodo onAddTodo={handleAddTodo} onCancel={handleCancelClick}/>
  } else {
    contentAddTodo = <NoTodoSelected onStartAddTodo={handleStartAddTodo}/>;
  }

  return (
    
    <main>
      <Header/>
      <h2>Lưu ý</h2>
      <p>Mặc định sẽ có sẵn 10 To-Do mẫu sắp xếp theo thứ tự từ điển,</p>
      <p>Bấm nút này nếu bạn muốn lấy thêm chục con To-Do mẫu nữa từ API nhé</p>
      <button className="button-del" visibility= "hidden" onClick={handleFetchClick}>APIからさらに10個のアイテムを取得します</button>
      {contentAddTodo}
      <Modal ref={modalValidateExistedID} buttonCaption="確認">
                <h2>検証</h2>
                <p>ID To-Do đã tồn tại, hãy nhập số khác !!!</p>
      </Modal>
      <Modal ref={modalCongrats} buttonCaption="確認">
                <h2>検証</h2>
                <p>Thao tác thành công</p>
      </Modal>
      <Todos todos={todosState.todos}
      onEditTodo={handleEditTodo}
      onDeleteTodo={handleDeleteClick}                 
      /> 
    </main>
  );
}

export default App;
