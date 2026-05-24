import "./index.css";
import { useState } from "react";

interface Task {
  id:number;
  text:string;
}

export default function App() {
  const [leftInput,setLeftInput] =useState("")
  const [rightInput, setRightInput]= useState("")

    // const [leftTodos, setLeftTodos]=useState<Task[]>
  // const [rightTodos, setRightTodos]= useState<Task[]>


  const [leftTodos, setLeftTodos]=useState<Task[]>([])
  const [rightTodos, setRightTodos]= useState<Task[]>([])

// add todo 
  const addLeftTodo =() => 
    {
    if (!leftInput.trim()) return

    const newTask= 
    {
      id:Date.now(),
      text:leftInput,
    };

    setLeftTodos([...leftTodos,  newTask]);
    setLeftInput("")
    // setLeftInput("");
  };

// similarly, adding todo
  const addRightTodo = () => {
    if (!rightInput.trim()) 
      return

    const newTask = 
    {
      id:Date.now(),
      text:rightInput,
    };

    setRightTodos([...rightTodos,newTask]);
    setRightInput("");
  };

//move l to r
  const moveToRight=(task: Task) => 
    {

    setLeftTodos(leftTodos.filter((item) =>  item.id !== task.id))
    setRightTodos([...rightTodos, task])
  };

// move r to l
  const moveToLeft=(task: Task) => {
 
    setRightTodos(rightTodos.filter((item) =>  item.id !== task.id))
    setLeftTodos([...leftTodos, task])
  };

  return (
    <div className="container">
      <div className="box">
        <div className="todo-list">
          {leftTodos.map((task) => (
            <div className="card"
             key={task.id}>
              <div className="card-content">
                <input type="checkbox" onChange={() => moveToRight(task)} />

                <span>{task.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="add-box">
          <input
            type="text"
            placeholder="Add field"
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
          />

          <button onClick={addLeftTodo}>
            Add Field
            </button>
        </div>
      </div>

// right side
      <div className="box">
        <div className="todo-list">
          {rightTodos.map((task) =>  (
            <div className="card" key={task.id}>
              <div className="card-content">
                <input type="checkbox" onChange={() =>moveToLeft(task)} 
                />

                <span>
                  {task.text}
                  
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="add-box">
          <input
            type="text"
            placeholder="Add field"
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
          />

          <button onClick={addRightTodo}>Add Field</button>
        </div>
      </div>
    </div>
  );
}
