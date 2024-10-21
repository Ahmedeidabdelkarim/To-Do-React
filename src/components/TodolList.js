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
import { useContext } from "react";

import { useTodos } from "../contexts/todosContext";
import { useState, useEffect, useMemo } from "react";
import { ToastContext } from "../contexts/ToastContext";

/*start dialog */
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodolList() {
  //const { todos2, setTodos } = useContext(TodosContext);
  const {todos,dispatch}=useTodos();
  const { showHideToast} = useContext(ToastContext);
  /* const [localTodos, setLocalTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : todos;
  }); */
  const [open, setOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodos] = useState("all");

  const complatedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonCompleteTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let current = todos;

  if (displayedTodosType === "completed") {
    current = complatedTodos;
  } else if (displayedTodosType === "non-completed") {
    current = nonCompleteTodos;
  }

  

  /* function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  } */

  useEffect(() => {
    dispatch({type:"get"});
  }, []);

  function handelAddClick() {
    dispatch({type:"added",payload:{title:titleInput}})
    setTitleInput("");
    showHideToast("تمت الاضافه بنجاح")
  }

  function changeDisplayedType(e) {
    setDisplayedTodos(e.target.value);
  }

  //Handelers
  const handleClose = () => {
    setOpen(false);
  };

  

 
  const [dialogTodo,setDialogTodo]=useState("");

  function showDeleteDialoge(todo){
    setDialogTodo(todo);
    setOpen(true);
  }

  function handleDeleteConfirm(){
    dispatch({type:"deleted",payload:dialogTodo.id})
    handleClose();
    showHideToast("تم الحذف بنجاح")
    
  }  
  ///////////////////////

  function showUpdateDialoge(todo){
    setUpdateDialog(true);
    setDialogTodo(todo);
    
  }

  const handleCloseDialog = () => {
    setUpdateDialog(false);
  };

  

  function handleUpdateConfirm(){
    /* const updatedTodos=todos.map((t)=>t.id===dialogTodo.id?{...t,title:dialogTodo.title,details:dialogTodo.details}:t);
    setTodos(updatedTodos); */
    dispatch({type:"updated",payload:{id:dialogTodo.id,title:dialogTodo.title,details:dialogTodo.details}});
    handleCloseDialog();
    showHideToast("تم التحديث بنجاح")
  }

  const todosJsx = current.map((todo) => {
    return <Todo key={todo.id} todo={todo} openDelete={showDeleteDialoge} openUpdate={showUpdateDialoge}/>;
  });

  return (
    <>
      {/*delete dialog*/}
        <Dialog
          style={{direction:"rtl"}}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"هل أنت متأكد من رغبتك في حذف المهمه؟"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              لا يمكنك التراجع عن الحذف بعد اتمامه
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>اغلاق</Button>
            <Button onClick={handleDeleteConfirm} autoFocus>
              نعم قم بالحذف
            </Button>
          </DialogActions>
        </Dialog>
      {/*delete dialog*/}

      {/*Edit dialog */}
      <Dialog
        style={{direction:"rtl"}}
        open={updateDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>هل أنت متأكد من رغبتك في تعديل المهمه؟</DialogTitle>
        <DialogContent>
          <TextField
            value={dialogTodo.title}
            onChange={(e)=>{setDialogTodo({...dialogTodo,title:e.target.value})}}
            autoFocus
            required
            margin="dense"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
          />
          <TextField
            value={dialogTodo.details}
            onChange={(e)=>{setDialogTodo({...dialogTodo,details:e.target.value})}}
            autoFocus
            required
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm} type="submit">تاكيد</Button>
        </DialogActions>
      </Dialog>

      {/*end Edit dialog*/}

      <Container maxWidth="sm">
        <Card sx={{ minWidth: "275", maxHeight: "90vh", overflow: "scroll" }}>
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
                <TextField
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمه"
                  variant="outlined"
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={() => {
                    handelAddClick();
                  }}
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  disabled={titleInput.length === 0}
                >
                  اضافة{" "}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
