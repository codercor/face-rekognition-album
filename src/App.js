import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import "./App.css"
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  const [dataUri, setDataUri] = React.useState('');
  const [photos, setPhotos] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    setDataUri(dataUri);
  }
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
  function searchFace(dataUri) {
    const photo = dataURItoBlob(dataUri);
    const formData = new FormData();
    formData.append('selfie', photo);
    formData.append("folder","izmir_kamp");
    //post data to server
    setIsLoading(true);
    fetch('http://localhost:3000/rekognition/searchFace', {
      method: 'POST',
      body: formData
    }).then(response => response.json()).then(data => {
      setPhotos(data);
      setIsLoading(false);
    });
  }
  return (
    <ThemeProvider theme={theme}>
     { isLoading ? <h1  className="loading">
      <DownloadIcon /> Loading...
      </h1> : <div></div>}
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Face Album V.0.1 Alpha
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Face Album
            </Typography>
            <Card>
            {
              dataUri ? (
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  image={dataUri}
                  title="Contemplative Reptile"
                />
              ) : (
                <Camera
                  onTakePhoto={ (dataUri) => { handleTakePhoto(dataUri); } }
                  idealFacingMode="user"
                  imageType="jpg"
                />
              )
            }
            </Card>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={
               ()=> searchFace(dataUri)
              } variant="contained">OK</Button>
              <Button onClick={()=>{
                setDataUri('');
              }} variant="outlined">Cancel</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {photos.map((photo) => (
              <Grid item key={photo} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={"https://face-album-bucket.s3.amazonaws.com/"+photo}
                    alt="random"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}