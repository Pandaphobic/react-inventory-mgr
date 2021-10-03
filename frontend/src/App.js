import CollapsibleTable from "./components/CollapsibleTable"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { createTheme } from "@mui/material"
import NavBarTop from "./components/AppBar.js"
import StoreContext from "./contexts/StoreContext"
import SignInSide from "./components/SignInSide"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./contexts/AuthContext"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"

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
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignInSide} />
              </Switch>
            </StoreContext>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
