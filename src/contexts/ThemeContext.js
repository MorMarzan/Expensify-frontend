import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '& .MuiInputBase-input': {
                        color: '#ffffff',
                    },
                    borderRadius: '30px',
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: '#ffffff',
                    },
                    '& label.Mui-focused': {
                        color: '#ffffff',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#ffffff',
                },
            },
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#000000',
        },
        text: {
            primary: '#000000',
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000000',
                    },
                    '& .MuiInputBase-input': {
                        color: '#000000',
                    },
                    borderRadius: '30px',
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: '#000000',
                    },
                    '& label.Mui-focused': {
                        color: '#000000',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#000000',
                },
            },
        },
    },
});
