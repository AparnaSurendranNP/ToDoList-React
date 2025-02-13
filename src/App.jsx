import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <div className="mainHeading">
      <h1>To-Do list</h1>
    </div>
  );
}

function InputForm({ toDo, setToDo, addToDo }) {
  return (
    <div className="input">
      <input
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
        type="text"
        placeholder="Add item..."
      />
      <i onClick={addToDo} className="fas fa-plus"></i>
    </div>
  );
}

function TodoItem({
  todo,
  toggleStatus,
  deleteToDo,
  startEdit,
  isEditing,
  updateText,
  saveEdit,
}) {
  return (
    <div className="todo">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.status}
          onChange={() => toggleStatus(todo.id)}
        />
        {isEditing ? (
          <div>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateText(todo.id, e.target.value)}
            />
          </div>
        ) : (
          <p>{todo.text}</p>
        )}
      </div>
      <div className="right">
        <i
          onClick={() => deleteToDo(todo.id)}
          className="fas fa-trash"
          title="Delete"
        ></i>
        <i
          onClick={() => startEdit(todo.id)}
          className={`fas ${isEditing ? "fa-check" : "fa-edit"}`}
          title={isEditing ? "Save" : "Edit"}
        ></i>
      </div>
    </div>
  );
}
function TodoList({
  toDos,
  toggleStatus,
  deleteToDo,
  startEdit,
  isEditing,
  updateText,
  saveEdit,
}) {
  return (
    <div className="todos">
      {toDos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleStatus={toggleStatus}
          deleteToDo={deleteToDo}
          startEdit={startEdit}
          isEditing={isEditing === todo.id} 
          updateText={updateText}
          saveEdit={saveEdit}
        />
      ))}
    </div>
  );
}

// main component
function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  // add a new to-do
  const addToDo = () => {
    if (toDo.trim() === "") return;
    setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    setToDo("");
  };

  const toggleStatus = (id) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteToDo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id) => {
    setIsEditing(isEditing === id ? null : id); 
  };

  const updateText = (id, text) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const saveEdit = (id) => {
    setIsEditing(null); 
  };

  return (
    <div className="app">
      <Header />
      <InputForm toDo={toDo} setToDo={setToDo} addToDo={addToDo} />
      <TodoList
        toDos={toDos}
        toggleStatus={toggleStatus}
        deleteToDo={deleteToDo}
        startEdit={startEdit}
        isEditing={isEditing}
        updateText={updateText}
        saveEdit={saveEdit}
      />
    </div>
  );
}

export default App;

