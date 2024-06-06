import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './assets/styles/main.scss'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { About } from './pages/About.jsx'
import { ExpenseIndex } from './pages/ExpenseIndex.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ExpenseEdit } from './cmps/ExpenseEdit.jsx'
import { ThemeProvider, createTheme } from '@mui/material'
import { Loader } from './cmps/Loader.jsx'

const theme = createTheme({
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
})

export function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>

        <Router>
          <section className="main-layout full app">
            <AppHeader />
            <main className="main-layout full app">
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<ExpenseIndex />} path="/expense" >
                  <Route element={<ExpenseEdit />} path="/expense/edit" />
                  <Route element={<ExpenseEdit />} path="/expense/edit/:expenseId" />
                </Route>
                <Route element={<About />} path="/about" />
              </Routes>
            </main>
            <AppFooter />
            <UserMsg />
            <Loader />
          </section>
        </Router>

      </ThemeProvider>
    </Provider>
  )
}



