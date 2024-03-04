import {useState, useEffect } from "react";
import Header from './Header.jsx';
import NoTodoSelected from './NoTodoSelected.jsx';
import Todos from './Todos.jsx'
import NewTodo from './NewTodo.jsx';
import TodosCreated from './TodosCreated.jsx';
import SelectedTodo from './SelectedTodo.jsx';
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function App() {
  //const fetchedTodos = localStorage.getItem('fetchedTodos')
  const [loadedTodos, setLoadedTodos] = useState([])
  useEffect(() => {
      async function fetchTodos() {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos')

       if (!response.ok) {

          }
          const todos = await response.json()
          setLoadedTodos(getMultipleRandom(todos, 10)
          .sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            }))
            //console.log(todos)
      }
          fetchTodos()
          //handleFetchTodos()
          //const jsonList = JSON.stringify(loadedTodos);
          //console.log(loadedTodos)
          //console.log(jsonList)
          //localStorage.setItem('fetchedTodos', jsonList);
  }, [])
// return (<ul id="todos">{loadedTodos.map(todos => <li key={todos.id}>{todos.title}</li>)}</ul>)
//console.log(todos)
  console.log(loadedTodos)
  const [todosState, setTodosState] = useState({
    selectedTodoId: undefined,
    todos: []
  })

  function handleStartAddTodo() {
    setTodosState(prevState => {
      return {
        ...prevState,
        selectedTodoId: null,
        todos: [...prevState.todos, loadedTodos]
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

  function handleSelectTodo(id) {
      setTodosState((prevState) => {
        return {
          ...prevState,
          selectedTodoId: id
        }
      })
  }

  console.log(todosState)
  const selectedTodo = todosState.todos.find(todo => todo.id === todosState.selectedTodoId)
  //console.log(selectedTodo)
  let content = <SelectedTodo todo={selectedTodo}/>;
  //let content;

  if (todosState.selectedTodoId === null) {
    content = <NewTodo onAdd={handleAddTodo}/>
  } else if (todosState.selectedTodoId === undefined) {
    content = <NoTodoSelected onStartAddTodo={handleStartAddTodo}/>;
  }
  return (
    
    <main>
      <Header/>
      
      <Todos todos={todosState.todos}
      onSelectTodo={handleSelectTodo}
                         
      />
      
      <nav>
        {content}
      </nav>
    </main>
  );
}

export default App;
