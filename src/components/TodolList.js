import * as React from "react";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useState,useEffect } from "react";

export default function TodolList() {
  const {todos, setTodos} = useContext(TodosContext);
  /* const [localTodos, setLocalTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : todos;
  }); */

  const [titleInput,setTitleInput]=useState("");
  const[displayedTodosType,setDisplayedTodos]=useState("all");
  
  const complatedTodos=todos.filter((t) =>{
    return t.isCompleted;
  })

  const nonCompleteTodos=todos.filter((t) =>{
    return !t.isCompleted;
  })

  let current=todos;

  if(displayedTodosType==="completed"){
    current=complatedTodos;
  }else if(displayedTodosType==="non-completed"){
    current=nonCompleteTodos;
  }
  
  const todosJsx=current.map((todo)=>{
    return <Todo key={todo.id} todo={todo}/>
  })

  /* function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  } */

  useEffect(()=>{
    const storedTodos = localStorage.getItem('todos');
    setTodos(JSON.parse(storedTodos)??[]);
  },[setTodos]);


  function handelAddClick(){
    const newTodo={id:uuidv4(),title:titleInput,details:"####",isCompleted:false}
    setTodos([...todos,newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos,newTodo]))
    setTitleInput("");
  }

  function changeDisplayedType(e){
    setDisplayedTodos(e.target.value);
  }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: "275",maxHeight:"90vh",overflow:"scroll" }}>
        <CardContent>
          <Typography variant="h1" sx={{ fontSize: 30 }}>
            مهامي
          </Typography>

          <Divider />

          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "5px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {todosJsx}

          {/* <Todo /> */}

          <Grid style={{ marginTop: "20px" }} container spacing={2}>
            <Grid size={8}>
              <TextField value={titleInput} onChange={(e)=>{
                setTitleInput(e.target.value);
              }}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
              />
            </Grid>
            <Grid size={4}>
              <Button onClick={()=>{handelAddClick()
              }}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                disabled={titleInput.length===0}
              >
                اضافة{" "}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
