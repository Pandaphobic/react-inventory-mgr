import { ThemeProvider } from "@mui/styles"
import { createTheme } from "@mui/material"
//CONTEXTS
import { AuthProvider } from "./contexts/AuthContext"
import StoreContext from "./contexts/StoreContext"
// COMPONENTS
import SignUp from "./components/SignUp"
import SignInSide from "./components/SignInSide"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
//PAGES
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"

const theme = createTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Rajdhani", "sans-serif"].join(",")
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <StoreContext>
              <Switch>
                <PrivateRoute exact path="/" component={DashboardPage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignInSide} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </StoreContext>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
