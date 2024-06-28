import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Kitap okumak",
      isCompleted: false,
    },
    {
      id: 2,
      name: "okula git",
      isCompleted: false,
    }
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef()

  const createId = () => {

    let newId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
    return newId
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return;

    const formData = new FormData(inputRef.current)
    const formObj = Object.fromEntries(formData.entries());

    let newId = createId()
    const newTodo = {
      id: newId,
      name: formObj.todo,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
    setInput('');

  }


  const deleteBtn = (index) => {
    let deletedTodo = todos.filter(todo => todo.id !== index)
    setTodos(deletedTodo)
  }

  const editBtn = (index) => {
    console.log("sjdfn");
    const updatedTodos = todos.map(todo =>
      todo.id === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodos(updatedTodos)

  }
  return (
    <>
      <div>
        <form ref={inputRef}>

          <input type="text" name='todo' onChange={(e) => setInput(e.target.value)} />
          <button type='submit' onClick={handleSubmit}>gönder</button>
        </form>

      </div>

      {todos.map(element => {
        return (

          <div key={element.id}>

            <li className={element.isCompleted === true ? "tamamlandı" : "tamamlanmadı"} > {element.name} </li> <button onClick={() => deleteBtn(element.id)}>Sil</button>  <button onClick={() => editBtn(element.id)} >Tamamlandı</button>

          </div>

        )
      })}
    </>
  )
}

export default App
