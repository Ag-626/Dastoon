import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff0000', // Bright Red
        },
        secondary: {
            main: '#800000', // Maroon
        },
        background: {
            default: '#000000', // Black
            paper: '#1a1a1a', // Dark Gray
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#d9d9d9', // Light Gray
        },
    },
});

export default theme;