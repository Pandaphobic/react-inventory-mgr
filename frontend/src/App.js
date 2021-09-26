// import DataTable from "./components/DataTable";
import CollapsibleTable from "./components/CollapsibleTable";
import { Container } from "@material-ui/core";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import NavBarTop from "./components/AppBar.js";
import Store from "./contexts/Store";

const theme = createTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Rajdhani", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Store>
          <Container>
            <NavBarTop />
            <CollapsibleTable />
          </Container>
        </Store>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
