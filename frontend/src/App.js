// import DataTable from "./components/DataTable";
import CollapsibleTable from "./components/CollapsibleTable"
import { Container } from "@material-ui/core"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import NavBarTop from "./components/AppBar.js"
import StoreContext from "./contexts/Store"
import SignInSide from "./components/SignInSide"
import SignUpSide from "./components/SignUpSide"

const theme = createTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Rajdhani", "sans-serif"].join(",")
  }
})

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        {/* <StoreContext>
          <Container>
            <NavBarTop />
            <CollapsibleTable />
          </Container>
        </StoreContext> */}
        {/* <SignInSide /> */}
        <SignUpSide />
      </MuiThemeProvider>
    </div>
  )
}

export default App
