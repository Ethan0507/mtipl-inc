import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import ResponsiveAppBar from './components/NavBar';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Store from "./pages/Store";
import ProductPage from "./pages/ProductPage";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      light: '#40A0B5',
      main: "#225560",
      dark: "#16363C",
      contrastText: "#fff"
    },
    secondary: {
      light: '#FFC870',
      main: '#FFA91F',
      dark: '#CC7E00',
      contrastText: '#000'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
