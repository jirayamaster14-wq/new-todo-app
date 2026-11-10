import { useEffect, useState } from 'react';
import {
  db, collection, addDoc, onSnapshot, getDoc,
  deleteDoc, doc, updateDoc, query, where,
} from '../Config/firebase';

function Home() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {

    const q = query(collection(db, "todos"), where("city", "==", "lahore"))

    onSnapshot(q, (snapshot) => {
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
    if (value.trim() === "") {
      return;
    }

    await addDoc(collection(db, "todos"), {
      todo: value,
      country: "pakistan",
      createdAt: Date.now()
    });

    setValue("");
  };

  const deleteAll = async () => {
    todos.forEach((data) => {
      deleteDoc(doc(db, "todos", data.id));
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const editTodo = (data) => {
    setValue(data.todo);
    setEditId(data.id);
  };

  const updateTodo = async () => {
    await updateDoc(doc(db, "todos", editId), {
      todo: value
    });

    setValue("");
    setEditId(null);
  };

  return (
    <div style={{
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '580px',
        backgroundColor: '#131c2e',
        padding: '35px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.1)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>

        <h1 style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '25px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '2.2rem',
          fontWeight: '800'
        }}>Task Manager</h1>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              padding: '14px 18px',
              backgroundColor: '#0b0f19',
              border: '2px solid #1e293b',
              borderRadius: '12px',
              color: '#ffffff',
              outline: 'none',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          />

          {
            editId ? (
              <button onClick={updateTodo} style={primaryBtnStyle}>Update</button>
            ) : (
              <button onClick={addText} style={primaryBtnStyle}>Add Task</button>
            )
          }
        </div>

        {todos.length > 0 && (
          <button onClick={deleteAll} style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            color: '#f87171',
            border: '2px dashed #f87171',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '25px',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}>Clear All Tasks</button>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
          {
            todos.map((data) => {
              return (
                <li key={data.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#0b0f19',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  borderLeft: '5px solid #38bdf8',
                  border: '1px solid #1e293b',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease'
                }}>

                  <span style={{ wordBreak: 'break-all', marginRight: '15px', fontWeight: '500' }}>{data.todo}</span>

                  <div style={{ display: 'flex', gap: '8px', minWidth: 'fit-content' }}>
                    <button onClick={() => editTodo(data)} style={editBtnStyle}>
                      Edit
                    </button>

                    <button onClick={() => deleteTodo(data.id)} style={deleteBtnStyle}>
                      Delete
                    </button>
                  </div>

                </li>
              )
            })
          }
        </ul>

      </div>
    </div>
  );
}

const primaryBtnStyle = {
  padding: '12px 22px',
  background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
  color: '#0b0f19',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '700',
  cursor: 'pointer',
  fontSize: '0.95rem',
  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)',
  transition: 'all 0.3s ease'
};

const editBtnStyle = {
  padding: '8px 14px',
  backgroundColor: '#f59e0b',
  color: '#0b0f19',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '0.85rem',
  transition: 'opacity 0.2s'
};

const deleteBtnStyle = {
  padding: '8px 14px',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '0.85rem',
  transition: 'opacity 0.2s'
};

export default Home;