import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChallenge } from '../Services/firebaseService';
const tags = ['feature', 'tech', 'react','help','audio','video'];
function Challenge() {
  const navigate = useNavigate();
  const [tag,setTag] = useState();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const newChallenge = new FormData(event.currentTarget);
   const challengeRes =  await addChallenge({
    title:newChallenge.get('title'),
    description:newChallenge.get('description'),
    tag:tag,
    creationdate:new Date(),
    upvote:0
   });
     if(challengeRes.id){
      navigate('/home')
    }
  }
  const handleChange = (event) => {
    setTag(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xl">
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
    <Grid container spacing={2} maxWidth="xl">
    <Grid item xs={12}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="title"
      label="Title"
      name="title"
      autoFocus
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
        required
         fullWidth
        id="description"
        label="Description"
        name="description"
        multiline
        rows={4}
      />
      </Grid>
      <Grid item xs={12}>
      <FormControl sx={{width: '100%' }}>
      <InputLabel id="demo-select-small">Tags</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={tag}
        label="Tags"
        onChange={handleChange}
      >
      <MenuItem value="">
      <em>None</em>
    </MenuItem>
      {tags.map((tag) => (
        <MenuItem key={Math.random()} value={tag}>{tag.toUpperCase()}</MenuItem>
      ))}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={12} className="savebutton">
      <Button
          type="submit" 
          variant="contained"
        >
      Create Challenge
    </Button>
    </Grid>
      </Grid>
    </Box>
  </Container>
  )
}

export default Challenge