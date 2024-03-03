import {useState, useEffect } from "react"
import TodoItem from "./TodoItem"
function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }
export default function Todos() {
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
            }
                fetchTodos()
        }, [])
    // return (<ul id="todos">{loadedTodos.map(todos => <li key={todos.id}>{todos.title}</li>)}</ul>)
    return (
      <div>
        <h2>TO-DO</h2>
        <ul id="todos">{loadedTodos
        .map((todo) => (<TodoItem key={todo.id} todo={todo}/>))}</ul>
        <h2>DONE</h2>
        <ul id="todos">{loadedTodos
        .filter((todo) => todo.completed)
        .map((todo) => (<TodoItem key={todo.id} todo={todo}/>))}</ul>        
      </div>)
}