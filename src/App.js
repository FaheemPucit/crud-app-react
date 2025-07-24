import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
  Paper,
  Stack,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Box sx={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(135deg, #1976d2 80%, #2196f3 100%)' }}>
      <Container maxWidth="xl" sx={{ pt: 4, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ width: '100%' }}>
          {/* Users list on the left */}
          <Paper elevation={1} sx={{
            p: 3,
            flex: 'none',
            width: { xs: '100%', md: "100%" },
            maxWidth: { xs: '100%', md: "60%" },
            background: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            mb: { xs: 3, md: 0 },
            minHeight: 480,
          }}>
            <Box sx={{ width: '100%' }}>
              {/* Sample Text Section */}
              <Typography variant="h4" fontWeight={700} sx={{ color: '#fff', mb: 1 }}>
                User Management CRUD App
              </Typography>
              <Typography variant="h6" fontWeight={400} sx={{ color: '#e3f2fd', mb: 2 }}>
                Built with the MERN-inspired stack
              </Typography>
              <List sx={{ color: '#e3f2fd', pl: 2, mb: 3 }} dense>
                <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                  <b>Frontend:</b> React.js with MUI (Material UI) for a clean and responsive UI.
                </ListItem>
                <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                  <b>Backend:</b> Node.js with Express.js for API handling.
                </ListItem>
                <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                  <b>Database:</b> PostgreSQL, connected using the pg library.
                </ListItem>
                <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                  <b>Deployment:</b>
                  <List sx={{ color: '#e3f2fd', pl: 3 }} dense>
                    <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                      <b>Frontend:</b> hosted on Netlify
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                      <b>Backend:</b> hosted on Railway
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', py: 1, pl: 1 }}>
                      <b>PostgreSQL database:</b> hosted on Neon
                    </ListItem>
                  </List>
                </ListItem>
              </List>
              {/* User Cards Section */}
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ width: '100%', minWidth: 0, flexWrap: 'wrap', rowGap: 2 }}>
                {users.map(user => (
                  <Box
                    key={user.id}
                    sx={{
                      borderRadius: 3,
                      boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
                      backgroundColor: '#fff',
                      px: 2,
                      py: 2,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    <IconButton size="small" aria-label="remove user" onClick={() => deleteUser(user.id)} sx={{ position: 'absolute', top: 6, right: 6, color: '#bbb', '&:hover': { color: '#d32f2f', background: 'transparent' }, zIndex: 1 }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#222', mb: 0.5, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1976d2', opacity: 0.85, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.email}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>
          {/* Form on the right */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'top',
            justifyContent: 'center',
            minHeight: { xs: 'auto', md: 'auto' },
            width: '100%',
          }}>
            <Paper elevation={3} sx={{
              px: { xs: 2, md: 5 },
              py: { xs: 2, md: 8 },
              borderRadius: { xs: 5, md: 10 },
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              background: '#fff',
              minWidth: {xs:"100%",md:"80%"},
              maxWidth: { xs: '100%', md: "40%" },
              mx: 'auto',
            }}>
              {/* Card Heading */}
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, mt: 1 }}>
                Welcome to <Box component="span" sx={{ color: '#1976d2' }}>CRUD</Box>
              </Typography>
              {/* Form Section */}
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={500} sx={{ mb: 2, mt: 1, color: '#222' }}>
                    Add New User
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0, ml: 0.5 }}>
                    Enter your name
                  </Typography>
                  <TextField
                    value={name}
                    inputRef={nameInputRef}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    size="medium"
                    sx={{ borderRadius: 2, boxShadow: 1, backgroundColor: '#fff' }}
                    placeholder="e.g. John Doe"
                    inputProps={{ style: { fontSize: 16, padding: '14px 12px' } }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0, mt: 2, ml: 0.5 }}>
                    Enter your email address
                  </Typography>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    size="medium"
                    sx={{ borderRadius: 2, boxShadow: 1, backgroundColor: '#fff' }}
                    placeholder="e.g. john@example.com"
                    inputProps={{ style: { fontSize: 16, padding: '14px 12px' } }}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    sx={{ borderRadius: 2, boxShadow: 1, mt: 1, fontWeight: 500, fontSize: 16, backgroundColor: '#1976d2', color: '#fff' }}
                  >
                    Add User
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Stack>
      </Container>
      {/* Footer */}
      <Box sx={{
        py: 2,
        px: 1,
        mt: 9,
        background: 'linear-gradient(90deg,rgb(28, 27, 31) 0%,rgb(48, 46, 59) 100%)',
        boxShadow: '0 -2px 16px 0 rgba(31, 38, 135, 0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        position: 'relative',
        fontSize: { xs: '0.95rem', md: '1.05rem' },
      }}>
        <Typography sx={{ color: '#fff', fontFamily: 'inherit', fontWeight: 500, letterSpacing: 0.2 }}>
          © 2025 Faheem |{' '}
          <a href="mailto:sample@email.com" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>Email</a> ·{' '}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>LinkedIn</a> ·{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>GitHub</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
