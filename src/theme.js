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
