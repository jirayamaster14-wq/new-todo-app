 
import { useEffect, useState } from 'react';
import {
  db, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc
} from '../Config/firebase';

function Todotest() {

  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "todos"), (snapshot) => {
      const todoList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((data) => data.todo)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setTodos(todoList);
    });
  }, []);

  const addText = async () => {
    if (value.trim() === "") return;

    await addDoc(collection(db, "todos"), {
      todo: value,
      country: "pakistan",
      createdAt: Date.now()
    });

    setValue("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const deleteAll = async () => {
    await Promise.all(
      todos.map((data) => deleteDoc(doc(db, "todos", data.id)))
    );
  };

  const editTodo = (data) => {
    setValue(data.todo);
    setEditId(data.id);
  };

  const updateTodo = async () => {
    if (value.trim() === "") return;

    await updateDoc(doc(db, "todos", editId), {
      todo: value
    });

    setValue("");
    setEditId(null);
  };

  const buttonStyle = {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "7px",
    margin: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "white",
      fontFamily: "Arial",
      textAlign: "center"
    }}>

      <h1 style={{
        color: "#38bdf8",
        fontSize: "38px",
        letterSpacing: "3px",
        marginBottom: "35px"
      }}>
        TODO APP
      </h1>

      <div style={{
        backgroundColor: "#1e293b",
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
        borderRadius: "15px",
        border: "1px solid #334155",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
      }}>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your todo..."
          style={{
            padding: "13px",
            width: "60%",
            backgroundColor: "#0f172a",
            color: "white",
            border: "1px solid #38bdf8",
            borderRadius: "7px",
            outline: "none",
            fontSize: "15px"
          }}
        />

        {editId ? (
          <button style={buttonStyle} onClick={updateTodo}>
            Update
          </button>
        ) : (
          <button style={buttonStyle} onClick={addText}>
            Add Todo
          </button>
        )}

        <button
          onClick={deleteAll}
          style={{
            ...buttonStyle,
            backgroundColor: "#dc2626"
          }}
        >
          Delete All
        </button>

        <ul style={{
          listStyle: "none",
          padding: "0",
          marginTop: "30px"
        }}>

          {todos.map((data) => {
            return (
              <li
                key={data.id}
                style={{
                  backgroundColor: "#0f172a",
                  padding: "15px",
                  margin: "12px 0",
                  borderRadius: "8px",
                  borderLeft: "4px solid #38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                  textAlign: "left"
                }}
              >

                <span style={{
                  color: "#e2e8f0",
                  fontSize: "16px",
                  flex: "1"
                }}>
                  {data.todo}
                </span>

                <div>
                  <button
                    onClick={() => editTodo(data)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: "#0891b2"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(data.id)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: "#dc2626"
                    }}
                  >
                    Delete
                  </button>
                </div>

              </li>
            );
          })}

        </ul>

      </div>
    </div>
  );
}

export default Todotest;
