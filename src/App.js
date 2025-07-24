import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nameInputRef = useRef(null);

  
  // Fetch users from backend
  useEffect(() => {
    fetch('https://crud-app-node-production.up.railway.app/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Handle new user submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://crud-app-node-production.up.railway.app/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name,email })
    })
    .then(res => res.json())
    .then(newUser => setUsers([...users, newUser]));

    setName('');
    setEmail('');
    nameInputRef.current.focus();
  };

  // Delete User Function
  const deleteUser = (id) => {
    fetch(`https://crud-app-node-production.up.railway.app/user/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then( () => {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
    });
  }

  return (
    <div style={{ paddingTop: '20px', margin:"auto", width:'max-content' }}>
      <form onSubmit={handleSubmit}>

        <div style={{marginTop:'0.5rem'}}>
          <input 
            type="text" 
            placeholder="Enter name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            ref={nameInputRef}
          />
        </div>
        <div style={{marginTop:'0.5rem'}}>
          <input 
            type="text" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div style={{marginTop:'0.5rem'}}>
          <button type="submit"
            style={{ background:'green', color:'white' }}
          >
            Add User
          </button>
        </div>  
      </form>

      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginTop:'1rem' }}>
            <div style={{ display: 'flex' }}>
              <div> 
                {user.name} ({user.email}) 
              </div>
              <div> 
                <button
                  onClick={() => deleteUser(user.id)} 
                  style={{ background:'red', color: 'white', border: 'none', cursor: 'pointer' ,marginLeft: '1rem' }}
                >
                  Delete
                </button> 
              </div>
            </div> 
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
