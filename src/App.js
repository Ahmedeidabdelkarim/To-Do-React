import "./App.css";
import TodolList from "./components/TodolList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/todosContext";
const theme = createTheme({
  topography: {
    fontFamily: ["Alexandria"],
  },

  /* palette:{
    primary:{
      main: "#004d40",
    },
    secondary:{
      main: "#f8312f",
    },
    background:{
      default: "#191b1f",
    },
    
} */
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              direction: "rtl",
              height: "100vh",
            }}
          >
            
              <TodolList />
            
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
