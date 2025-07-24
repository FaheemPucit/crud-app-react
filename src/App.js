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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nameInputRef = useRef(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode
        ? {
            background: {
              default: '#181a20',
              paper: '#23272f',
            },
            primary: { main: '#90caf9' },
            text: { primary: '#fff' },
          }
        : {
            background: {
              default: '#f4f6fa',
              paper: '#fff',
            },
            primary: { main: '#1976d2' },
            text: { primary: '#222' },
          }),
    },
    typography: {
      fontFamily: 'inherit',
    },
  });
  const handleDarkModeToggle = () => setDarkMode((prev) => !prev);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // Dialog state
  const [confirmDialog, setConfirmDialog] = useState({ open: false, user: null });
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  
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
    .then(res => {
      if (!res.ok) throw new Error('Failed to add user');
      return res.json();
    })
    .then(newUser => {
      setUsers([...users, newUser]);
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
    })
    .catch(() => {
      setSnackbar({ open: true, message: 'Failed to add user.', severity: 'error' });
    });

    setName('');
    setEmail('');
    nameInputRef.current.focus();
  };

  // Delete User Function
  const handleDeleteClick = (user) => {
    setConfirmDialog({ open: true, user });
  };

  const handleDeleteConfirm = () => {
    const id = confirmDialog.user.id;
    fetch(`https://crud-app-node-production.up.railway.app/user/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then( () => {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
      setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
    })
    .catch(() => {
      setSnackbar({ open: true, message: 'Failed to delete user.', severity: 'error' });
    });
    setConfirmDialog({ open: false, user: null });
  };

  const handleDeleteCancel = () => {
    setConfirmDialog({ open: false, user: null });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        width: '100%',
        background: darkMode
          ? 'linear-gradient(135deg, #181a20 80%, #23272f 100%)'
          : 'linear-gradient(135deg, #1976d2 80%, #2196f3 100%)',
        transition: 'background 0.3s',
      }}>
        {/* Dark mode toggle */}
        <Box sx={{ position: 'fixed', top: 18, right: 32, zIndex: 2000 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                color="primary"
              />
            }
            label={darkMode ? <DarkModeIcon sx={{ color: '#90caf9' }} /> : <LightModeIcon sx={{ color: '#fbc02d' }} />}
            labelPlacement="start"
            sx={{
              '.MuiFormControlLabel-label': { ml: 1, mr: 0 },
              background: darkMode ? '#23272f' : '#fff',
              borderRadius: 3,
              px: 1.5,
              py: 0.5,
              boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
            }}
          />
        </Box>
        <Container maxWidth="xl" sx={{ pt: 4, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.text.primary }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ width: '100%' }}>
            {/* Users list on the left */}
            <Paper elevation={1} sx={{
              p: 3,
              flex: 'none',
              width: { xs: '100%', md: "100%" },
              maxWidth: { xs: '100%', md: "60%" },
              background: darkMode ? 'transparent' : 'transparent',
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
                      <IconButton size="small" aria-label="remove user" onClick={() => handleDeleteClick(user)} sx={{ position: 'absolute', top: 6, right: 6, color: '#bbb', '&:hover': { color: '#d32f2f', background: 'transparent' }, zIndex: 1 }}>
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
                background: darkMode ? theme.palette.background.paper : '#fff',
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
                    <Typography variant="h6" fontWeight={500} sx={{ mb: 2, mt: 1 }}>
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
                      sx={(theme) => ({
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
                        color: theme.palette.text.primary,
                        input: { color: theme.palette.text.primary },
                      })}
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
                      sx={(theme) => ({
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
                        color: theme.palette.text.primary,
                        input: { color: theme.palette.text.primary },
                      })}
                      placeholder="e.g. john@example.com"
                      inputProps={{ style: { fontSize: 16, padding: '14px 12px' } }}
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      type="submit"
                      sx={{
                        borderRadius: 2,
                        boxShadow: 1,
                        mt: 1,
                        fontWeight: 500,
                        fontSize: 16,
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                          color: '#fff',
                          boxShadow: '0 4px 20px 0 rgba(25, 118, 210, 0.18)',
                        },
                      }}
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
          background: darkMode
            ? 'linear-gradient(90deg, #181a20 0%, #23272f 100%)'
            : 'linear-gradient(90deg,rgb(28, 27, 31) 0%,rgb(48, 46, 59) 100%)',
          boxShadow: '0 -2px 16px 0 rgba(31, 38, 135, 0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'inherit',
          position: 'relative',
          fontSize: { xs: '0.95rem', md: '1.05rem' },
        }}>
          <Typography sx={{ color: '#fff', fontFamily: 'inherit', fontWeight: 500, letterSpacing: 0.2 }}>
            Connect Faheem @{' '}
            <a href="https://linkedin.com/in/muhammad-faheem-347795191" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>LinkedIn</a> ·{' '}
            <a href="https://github.com/FaheemPucit" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>GitHub</a> .{' '}
            <a href="mailto:faheem.pucit@gmail.com" style={{ color: '#fff', textDecoration: 'none', margin: '0 4px' }}>Email</a>
          </Typography>
        </Box>
        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
        {/* Delete Confirmation Dialog */}
        <Dialog open={confirmDialog.open} onClose={handleDeleteCancel}>
          <DialogTitle sx={{
            px:{ xs: 2, md:5 },
            pt:{ xs: 2, md:4 }
          }}>
            Confirm Deletion</DialogTitle>
          <DialogContent sx={{
            px:{ xs: 1, md:5 },
            pt:{ xs: 1, md:2 }
          }}>
            <DialogContentText>
              Are you sure you want to delete <b>{confirmDialog.user?.name}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{
            px:{ xs: 1, md:5 },
            pb:{ xs: 1, md:3 }
          }}>
            <Button sx={{ borderRadius: 2 }} onClick={handleDeleteCancel} color="primary" variant="outlined">Cancel</Button>
            <Button sx={{ borderRadius: 2 }} onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
