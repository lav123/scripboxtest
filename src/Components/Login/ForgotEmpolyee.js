import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert ,AlertTitle} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import Typography from '@mui/material/Typography';
import { getEmployeeIdByEmail } from '../../Services/firebaseService';

function ForgotEmpolyee() {
    const [empId, setEmpId] = React.useState(null);
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const querySnapshot = await getEmployeeIdByEmail(data.get('email'));
        if(!querySnapshot.empty){
            querySnapshot.forEach((user)=>{
              const loginUser = user.data();
              if(loginUser.email===data.get('email')){
                   setEmpId(loginUser.employeeid);
              }
            })
          }else{
            setEmpId("Employee Id Not Found");
          }

      };

  return (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <RestoreIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restore Employee Id 
        </Typography>
        {empId && <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Employee Id — <strong>{empId}</strong>
                 </Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth="xl">
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Restore Employee Id
          </Button>
        </Box>
      </Box>
  )
}

export default ForgotEmpolyee