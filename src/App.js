import React, { useState } from 'react';
import { Button, Typography, TextField, Container, Card, CardContent, Box, Grid, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline

// Create a custom theme with purple color
const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    background: {
      default: '#1c1b29', // Dark purple background for the entire page
    },
    text: {
      primary: '#ffffff', // White text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#ffffff', // White text for the header
    },
    h6: {
      color: '#ffffff', // White text for the subheader
    },
  },
});

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [media, setMedia] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    const newFileUrl = URL.createObjectURL(file);
    setFileUrl(newFileUrl);
  };

  const uploadFile = () => {
    if (!file) return;
    const newMedia = { url: URL.createObjectURL(file), type: file.type };

    if (editIndex !== null) {
      const updatedMedia = [...media];
      updatedMedia[editIndex] = newMedia;
      setMedia(updatedMedia);
      setEditIndex(null);
    } else {
      setMedia([...media, newMedia]);
    }

    setFile(null);
    setFileUrl('');
  };

  const deleteMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const editMedia = (index) => {
    setEditIndex(index);
    setFileUrl(media[index].url);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures the background applies to the entire body */}
      <div style={{ backgroundColor: '#1c1b29', minHeight: '100vh' }}>
        <Container maxWidth="lg" style={{ paddingTop: '40px' }}>
          {/* AWS Summit 2024 Banner */}
          <Box
            style={{
              background: 'linear-gradient(to right, #4b0082, #800080)', // Dark purple gradient
              padding: '60px 20px',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            <Typography variant="h4">
              AWS Summit - 2024 Toronto
            </Typography>
          </Box>

          {/* Media Upload Section */}
          <Card style={{ padding: 10, borderRadius: 15, backgroundColor: '#2e2b44', marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Your Event Media
              </Typography>

              <TextField
                variant="outlined"
                type="file"
                fullWidth
                onChange={handleFileChange}
                style={{ marginBottom: 20 }}
                inputProps={{ accept: 'image/*,video/*' }} // Accept image and video files
              />

              <Button variant="contained" color="primary" fullWidth onClick={uploadFile}>
                {editIndex !== null ? 'Update Media' : 'Upload Media'}
              </Button>

              {fileUrl && (
  <Box style={{ marginTop: 20, textAlign: 'center' }}>
    {fileUrl.endsWith('.mp4') ? (
      <video
        src={fileUrl}
        controls
        style={{
          maxWidth: '90%', // Increase width for video
          maxHeight: '400px',
          objectFit: 'contain', // Adjust fit if necessary
          borderRadius: 10,
        }}
      />
    ) : (
      <img
        src={fileUrl}
        alt="Uploaded media"
        style={{
          maxWidth: '80%', // Standard width for image
          maxHeight: '400px',
          objectFit: 'contain', // Adjust fit if necessary
          borderRadius: 10,
        }}
      />
    )}
  </Box>
)}
            </CardContent>
          </Card>

          {/* Media Gallery Section */}
          <Box style={{ marginTop: 40 }}>
            <Typography variant="h6" gutterBottom>
              Media Gallery
            </Typography>
            <Grid container spacing={3}>
              {media.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card style={{ position: 'relative', backgroundColor: '#2e2b44', padding: '10px' }}>
                    {item.type.startsWith('video/') ? (
                      <video
                        src={item.url}
                        controls
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={`Uploaded ${index}`}
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    )}
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 5,
                        padding: '5px',
                      }}
                    >
                      <IconButton color="secondary" onClick={() => editMedia(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => deleteMedia(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
