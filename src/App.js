import "./App.css";
import TodolList from "./components/TodolList";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from 'uuid';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
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
    
} */});

const intialTodos = [
  { id: uuidv4(), title: "قراة الكتاب", details: "####", isCompleted: false },
  { id: uuidv4(), title: "قراة الكتاب", details: "####", isCompleted: false },
  { id: uuidv4(), title: "قراة الكتاب", details: "####", isCompleted: false }
];

function App() {
  const [todos,setTodos]=useState(intialTodos);
  return (

    <ThemeProvider theme={theme}>
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
        <TodosContext.Provider value={{todos,setTodos}}>
          <TodolList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
