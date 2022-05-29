import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Badge,  IconButton ,Container, Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { getAllChallenges,upvoteChallenge } from '.././Services/firebaseService';
import { SmartText } from '../Services/SmartText';

function Home() {
  const [challenge, setChallenge] = useState([]);
  const [sorting, setSorting] = useState("");
  const getChallenge = async()=>{
    const challengeData= await getAllChallenges();
    setChallenge(challengeData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getChallenge();
   },[]);

   const upvoteChallenges = async(id,vCount)=>{
      await upvoteChallenge(id,{
        upvote:vCount+1
       });
       getChallenge();
   }
   const handleChange =(event)=>{
    if(event.target.value==="upvote"){
        setChallenge(challenge.sort(function(a,b) { 
          return b.upvote - a.upvote;
      }));
    }else{
      challenge.forEach((item)=>{
        setChallenge(challenge.sort(function(a,b) { 
          return b.creationdate.seconds - a.creationdate.seconds;
      }));
      })
    }
    setSorting(event.target.value);
   }

   return (
    <Container component="main" maxWidth="xl">
     <div className="sorting_challenge">
     <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
     <InputLabel id="demo-select-small">Sorting</InputLabel>
     <Select
       labelId="demo-select-small"
       id="demo-select-small"
       value={sorting}
       label="Sort"
       onChange={handleChange}
     >
       <MenuItem value={'creation'}>CreationDate</MenuItem>
       <MenuItem value={'upvote'}>Upvote</MenuItem>
     </Select>
     </FormControl>
   </div>
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="challenge_list">
      {challenge.length > 0 ? <React.Fragment>
       {challenge.map(item=>(
        <Grid item xs={6} md={4} sm={2} key={Math.random()}>
        <Card id="challenge_card">
        <CardHeader
         action={
           <IconButton aria-label="settings">
            <Chip label={item.tag} color="warning" size="small" />
           </IconButton>
         }  
          title={item.title}
          subheader={new Date(item.creationdate.seconds * 1000).toDateString()}
     />
        <CardContent>
         <Typography variant="body2" component="h5">
           <SmartText>{item.description}</SmartText>
         </Typography>
       </CardContent>
       <CardActions className="cardaction">        
        <IconButton onClick={()=>upvoteChallenges(item.id,item.upvote)}>
        <Badge badgeContent={item.upvote} color="primary" >
          <ArrowCircleUpOutlinedIcon color="action" />
        </Badge>
        </IconButton>
       </CardActions>
     </Card>
        </Grid>         
       ))}
       </React.Fragment> : ""} 
   </Grid>
  </Container>
     
   )
 }

export default Home