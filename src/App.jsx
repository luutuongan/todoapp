import { useState } from 'react';
import Header from './Header.jsx';
import NoTodoSelected from './NoTodoSelected.jsx';
import Todos from './Todos.jsx'
import NewTodo from './NewTodo.jsx';
function App() {
  const [todosState, setTodosState] = useState({
    selectedTodoId: undefined,
    todos: []
  })

  function handleStartAddTodo() {
    setTodosState(prevState => {
      return {
        ...prevState,
        selectedTodoId: null,
      }
    })
  }

  let content;

  if (todosState.selectedTodoId === null) {
    content = <NewTodo />
  } else if (todosState.selectedTodoId === undefined) {
    content = <NoTodoSelected onStartAddTodo={handleStartAddTodo}/>;
  }
  return (
    <main>
      <Header/>
      <Todos/>
      <nav>
        {content}
      </nav>
    </main>
  );
}

export default App;
