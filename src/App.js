import { useState, useEffect } from 'react';
import Box from './components/base/Box'
import UserForm from './components/form/UserForm';
import InfoRow from './components/info/InfoRow';

export default function App() {
  const [users, setUsers] = useState([])

  const addUser = (user) => {
    const added = [
      ...users,
      {
        ...user,
        id: Math.random().toString().split('.')[1]
      }
    ]
    setUsers(added)
    localStorage.setItem('users', JSON.stringify(added))
  }

  const removeUser = (id) => {
    let removed = users.filter(x => x.id !== id)
    setUsers(removed)
    localStorage.setItem('users', JSON.stringify(removed))
  }

  useEffect(() => {
    if(localStorage.getItem('users')) {
      setUsers(JSON.parse(localStorage.getItem('users')))
    }
  }, [])
  

  return (
    <div data-theme="valentine" style={{minHeight: '100vh'}}>
      <div className="container mx-auto md:py-8 py-4">
        <Box>
          <UserForm addUser={addUser}></UserForm>
        </Box>
        <div>
          {
            users.map(user => (
              <div key={user.id} className="my-1">
                <Box>
                  <InfoRow user={user} removeUser={removeUser}></InfoRow>
                </Box>
              </div>
            ))
          }
        </div>
      </div>
    </div>  
  );
}