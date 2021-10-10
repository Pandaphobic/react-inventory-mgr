import CollapsibleTable from "./components/CollapsibleTable"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { createTheme } from "@mui/material"
import NavBarTop from "./components/AppBar.js"
import StoreContext from "./contexts/StoreContext"
import SignInSide from "./components/SignInSide"
import SignUp from "./components/SignUp"
import { AuthProvider, useAuth } from "./contexts/AuthContext"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import PrivateRoute from "./components/PrivateRoute"

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
                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignInSide} />
                <PrivateRoute path="/profile" component={ProfilePage} />
              </Switch>
            </StoreContext>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
