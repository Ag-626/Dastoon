import './App.css';
import React, { useState } from 'react';
import { TextField, Button, Grid, ThemeProvider } from '@material-ui/core';
import backgroundImage from './background.avif';
import theme from './theme';
import query from './api';
import { CircularProgress } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';


function App() {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(''));
  const [panelState, setPanelState] = useState(Array(10).fill(''));
  const [currentPage, setCurrentPage] = useState(0);
  const [imageUrls, setImageUrls] = useState(Array(10).fill(''));
  const matches = window.matchMedia('(max-width: 600px)').matches || window.matchMedia('(max-height: 600px)').matches;

  const handleTextChange = (index, event) => {
    const newTexts = [...panelTexts];
    newTexts[index] = event.target.value;
    setPanelTexts(newTexts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPanelState(prevState => {
      const newPanelState = [...prevState];
      newPanelState[currentPage] = 'loading';
      return newPanelState;
    });

    const url = await query({ "inputs": panelTexts[currentPage] });
    setImageUrls(prevState => {
      const newImageUrls = [...prevState];
      newImageUrls[currentPage] = url;
      return newImageUrls;
    });

    setPanelState(prevState => {
      const newPanelState = [...prevState];
      newPanelState[currentPage] = url ? '' : 'error';
      return newPanelState;
    });
  };


  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
        <div className="central-area" style={{ width: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '12.5%', paddingTop: '5%' }}>
          <form onSubmit={handleSubmit} className="form" style={{ width: matches ? '80%' : '50%' }}>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} container justifyContent="center" alignItems="center">
                <TextField
                  label={`Panel ${currentPage + 1}`}
                  value={panelTexts[currentPage]}
                  onChange={(event) => handleTextChange(currentPage, event)}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: '20px' }}
                />
                {panelState[currentPage] === 'loading' ? (
                  <div style={{ width: matches ? '90vmin' : '512px', height: matches ? '90vmin' : '512px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                  </div>
                ) : panelState[currentPage] === 'error' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: matches ? '90vmin' : '512px', height: matches ? '90vmin' : '512px' }}>
                    <ErrorIcon style={{ fontSize: '48px', color: 'primary' }} />
                    <span style={{ color: 'white', marginBottom: '10px' }}>Error occurred while generating image.</span>
                  </div>
                ) : (
                  imageUrls[currentPage] && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                      <img src={URL.createObjectURL(imageUrls[currentPage])} alt={`Image ${currentPage + 1}`} style={{ width: matches ? '90vmin' : '512px', height: matches ? '90vmin' : '512px' }} />
                    </div>
                  )
                )}
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button type="button" variant="contained" color="primary" disabled={currentPage === 0} onClick={handlePrevious}>
                Prev
              </Button>
              <Button type="button" variant="contained" color="primary" disabled={currentPage === panelTexts.length - 1} onClick={handleNext}>
                Next
              </Button>
            </div>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
              Generate
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
