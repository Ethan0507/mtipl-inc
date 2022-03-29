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
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import StickyFooter from "./components/StickyFooter";
import { Box } from "@mui/material";

import { AuthContext } from "./utils/context/auth-context";
import { useAuth } from "./utils/hooks/auth-hook";
import OrderSuccessful from "./pages/OrderSuccessful";

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

  const { token, login, logout , userId } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <ResponsiveAppBar />
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/success" element={<OrderSuccessful />} />
            </Routes>
            <StickyFooter />
          </Box>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
