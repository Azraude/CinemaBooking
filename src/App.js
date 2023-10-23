import React from 'react';
import CinemaView from './Cinema';
import Stack from '@mui/material/Stack';
import './App.css';

function App() {
    return (
      <Stack spacing={2} direction="row">
            <CinemaView />
        </Stack>
    );
}

export default App;
