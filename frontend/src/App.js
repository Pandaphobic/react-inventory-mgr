// import DataTable from "./components/DataTable";
import CollapsibleTable from "./components/CollapsibleTable"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { createTheme } from "@mui/material"
import NavBarTop from "./components/AppBar.js"
import StoreContext from "./contexts/StoreContext"
import SignInSide from "./components/SignInSide"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./contexts/AuthContext"

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
        <AuthProvider>
          {/* <StoreContext>
          <Container>
            <NavBarTop />
            <CollapsibleTable />
          </Container>
        </StoreContext> */}
          {/* <SignInSide /> */}
          <SignUp />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
