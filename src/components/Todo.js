import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from "@mui/icons-material/Check";
import { useContext} from "react";
import { useTodos } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

export default function Todo({ todo,openDelete,openUpdate}) {
  const { showHideToast} = useContext(ToastContext);

  const {dispatch}=useTodos();

  function handelCheck(){
    dispatch({type:"toggled",payload:todo})
    showHideToast("تم التعديل بنجاح");
  }

  // start Delete Dialog
  const handleClickOpen = () => {
    openDelete(todo);
  };
  // end Dialog


  //start edit dialog
  const handleOpenDialog = () => {
    openUpdate(todo);
  };
  //end edit dialog
  
  return (
    <>
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
