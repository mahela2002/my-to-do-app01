import React, { useEffect } from 'react';
import {useState} from 'react';
import{AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import './App.css';
import { stringify } from 'querystring';


interface Todo{
  title:string;
  description:string;
  completedOn?: string;
}

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState<Todo[]>([]);
  const [newTitle,setNewTitle]=useState<string>("");
  const [newDescription,setNewdescription] = useState<string>("");
  const [complededTodos,setCompletedTodos] = useState<Todo[]>([]);

  const AddTodos = ()=>{
    const TodoItem: Todo={
      title:newTitle,
      description:newDescription
    }

    let updateTodoArr: Todo[]=[...allTodos,TodoItem];
    updateTodoArr.push(TodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify (updateTodoArr))
  };

  const deleteTodo =({index}: { index: any })=>{
    let reduceTodo = {...allTodos};
    reduceTodo.splice(index);

    localStorage.setItem('todoList',JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  }

  const Completed = ({index}: { index: any })=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let completedOn = dd+'-'+mm+'-'+yyyy;

    const todoItem = allTodos[index];

    const filteredItem = {
      ...todoItem,
      completedOn:completedOn
    }
    let updatedCompletedarr = [...complededTodos];
    updatedCompletedarr.push(filteredItem);
    setCompletedTodos(updatedCompletedarr);
    deleteTodo({index: index});
    localStorage.setItem('CompletedTodo',JSON.stringify (updatedCompletedarr));
  } 

  const deleteCompletedTodo=(index: number)=>{

    let reduceTodo=[...complededTodos];
    reduceTodo.splice(index);

    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  }


  useEffect(()=>{
    const savedTodo =localStorage.getItem('todoList');
    const savedCompletedTodo = localStorage.getItem('completedTodo');
    if(savedTodo){
      const parsedTodo = JSON.parse(savedTodo);
      setTodos(parsedTodo);
    }

    if(savedCompletedTodo){
      const parsedCompletedTodo = JSON.parse(savedCompletedTodo);
      setCompletedTodos(parsedCompletedTodo);
    }
  },[])
  return (
    <div className="App">
      <h1>My to Do's</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Whats the task title' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewdescription(e.target.value)} placeholder='Whats the task description' />
          </div>
          <div className='todo-input-item'>
            <label>add</label>
            <button type='button' onClick={AddTodos} className='primaryBtn'>Add</button>
          </div> 
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>To do</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                <h3>{item["title"]}</h3>
                <p>{item["description"]}</p>
              </div>
              <div>
                  <AiOutlineDelete className='icon' onClick={()=>deleteTodo({index: index})} title='Delete?'/>
                  <BsCheckLg className='check-icon' onClick={()=>Completed({index: index})} title='Complete?'/>
              </div>
              </div>
            )
          })}
          {isCompleteScreen===true && complededTodos.map((item,index)=>{
             return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on:{item.completedOn} </small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => deleteCompletedTodo(index)} title='Delete?'/>
                  <BsCheckLg className='check-icon' onClick={() => Completed({index: index})} title='Complete?'/>
                </div>
              </div>
             );
          })}
        </div>
      </div>
    </div>
  );
}


export default App;
