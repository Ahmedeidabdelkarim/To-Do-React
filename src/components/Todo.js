import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from "@mui/icons-material/Check";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

/*start dialog */
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from "react";
import TextField from '@mui/material/TextField';

export default function Todo({ todo}) {
  const { todos,setTodos}=useContext(TodosContext);

  function handelCheck(){
    const updatedTodos=todos.map((t)=>{
      return t.id===todo.id?{...t,isCompleted:!t.isCompleted}:t;
    })
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  // start Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleDeleteConfirm(){
    const updatedTodo=todos.filter((t)=>t.id!==todo.id);
    setTodos(updatedTodo);
    handleClose();
    localStorage.setItem('todos', JSON.stringify(updatedTodo));
    
  }
  // end Dialog

  //start edit dialog
  const [updateDialog, setUpdateDialog] = useState(false);
  const [updatedTodo,setUpdatedTodo]=useState({title:todo.title,details:todo.details});


  const handleOpenDialog = () => {
    setUpdateDialog(true);
  };

  const handleCloseDialog = () => {
    setUpdateDialog(false);
  };

  function handleUpdateConfirm(){
    const updatedTodos=todos.map((t)=>t.id===todo.id?{...t,title:updatedTodo.title,details:updatedTodo.details}:t);
    setTodos(updatedTodos);
    handleCloseDialog();
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }
  //end edit dialog


 
  
  return (
    <>
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
            value={updatedTodo.title}
            onChange={(e)=>{setUpdatedTodo({...updatedTodo,title:e.target.value})}}
            autoFocus
            required
            margin="dense"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
          />
          <TextField
            value={updatedTodo.details}
            onChange={(e)=>{setUpdatedTodo({...updatedTodo,details:e.target.value})}}
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


      {/*delete modal*/}

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

      {/*delete modal*/}

      <Card className="todoCard"
        sx={{
          minWidth: "275",
          background: "#283593",
          color: "white",
          marginTop: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={6} style={{textAlign:"right"}}>
              <Typography variant="h5" style={{textDecoration:todo.isCompleted?"line-through":"none"}}>
                {todo.title} 
              </Typography>
              <Typography variant="h8">
                {todo.details} 
              </Typography>
            </Grid>

            {/*Icons Buttons */}
            <Grid size={6} display="flex" justifyContent="space-between" alignItems="center">
              <IconButton 
                onClick={handelCheck}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted? "white":"#8bc34a",
                  background: todo.isCompleted?"#8bc34a": "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton 
                onClick={handleOpenDialog}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>

              <IconButton 
                onClick={handleClickOpen}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
