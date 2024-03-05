import {useState, useEffect } from "react";
import Header from './Header.jsx';
import NoTodoSelected from './NoTodoSelected.jsx';
import Todos from './Todos.jsx'
import NewTodo from './NewTodo.jsx';
import SelectedTodo from './SelectedTodo.jsx';
import Button from "./Button.jsx";
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function App() {
  //const fetchedTodos = localStorage.getItem('fetchedTodos')
  const [todosState, setTodosState] = useState({
    selectedTodoId: undefined,
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
  }

  function handleStartAddTodo() {
    setTodosState(prevState => {
      return {
        ...prevState,
        selectedTodoId: null
      }
    })
  }

  function handleAddTodo(todoData) {
    setTodosState(prevState => {
      const newTodo = {
        ...todoData,
      }
      return {
        ...prevState,
        todos: [...prevState.todos, newTodo],
      }
    })
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
}

  function handleDeleteTodo(id) {
    console.log("id to delete:")
    console.log(id)
    setTodosState((prevState) => {
      return {
        ...prevState,
        selectedTodoId: undefined,
        todos: prevState.todos.filter((todo) => 
          todo.id !== id
        )
      }
    })
  }

  function handleSelectTodo(id) {
      setTodosState((prevState) => {
        return {
          ...prevState,
          selectedTodoId: id
        }
      })
  }

  function handleCancelTodo() {
    setTodosState((prevState) => {
      return {
        ...prevState,
        selectedTodoId: undefined
      }
    })
}

  console.log("to-do state:")
  console.log(todosState)
  const selectedTodo = todosState.todos.find(todo => todo.id === todosState.selectedTodoId)
  //console.log(selectedTodo)
  let content = <SelectedTodo todo={selectedTodo} onEdit={handleEditTodo} onCancel={handleCancelTodo}/>;
  //let content;

  if (todosState.selectedTodoId === null) {
    content = <NewTodo onAdd={handleAddTodo} onCancel={handleCancelTodo}/>
  } else if (todosState.selectedTodoId === undefined) {
    content = <NoTodoSelected onStartAddTodo={handleStartAddTodo}/>;
  }
  return (
    
    <main>
      <Header/>
      <h2>Lưu ý</h2>
      <p>Mặc định sẽ có sẵn 10 To-Do mẫu,</p>
      <p>Bấm nút này nếu bạn muốn xin thêm chục con To-Do mẫu nữa nhé</p>
      <Button visibility= "hidden" onClick={handleFetchTodos}>GET MORE 10 EXAMPLES</Button>
      {content}
      
      <Todos todos={todosState.todos}
      onSelectTodo={handleSelectTodo}
      onDeleteTodo={handleDeleteTodo}                    
      /> 
    </main>
  );
}

export default App;
