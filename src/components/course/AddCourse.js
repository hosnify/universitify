/* eslint-disable react/jsx-wrap-multilines */
import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Snackbar,
  Switch,
  TextField
} from '@material-ui/core';
import { createOne, updateCoursePrerequisites } from 'src/API/courseAPI';
import { getAllMajors } from 'src/API/majorAPI';

const AddCourse = (props) => {
  const [values, setValues] = useState({ minorId: false });
  const [open, setOpen] = useState(false);
  const [majors, setMajors] = useState([]);
  useEffect(async () => {
    const majorsData = await getAllMajors();
    setMajors(majorsData);
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      [event.target.name === 'minorId' && event.target.name]: event.target
        .checked
        ? values.majorId
        : null
    });
  };

  const handleAdd = async () => {
    const newCourse = await createOne({ ...values });
    console.log(values);

    await updateCoursePrerequisites(newCourse.id, {
      prerequisites: values.prerequisites.split(',')
    });
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="" title="Add New Course" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Course title"
                label="Title"
                name="name"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="discreption"
                name="discreption"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                label="major"
                fullWidth
                name="majorId"
                onChange={handleChange}
                helperText="Please select student major"
              >
                {majors.map((majorData) => (
                  <MenuItem key={majorData.id} value={majorData.id}>
                    {majorData.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Level"
                name="level"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits "
                name="credit"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Course Code"
                name="courseCode"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="ex: MIS86 "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="prerequisites"
                name="prerequisites"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="enter course code seperated by comma  ex: MIS86,MIS89 "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!values.minorId}
                    onChange={handleChange}
                    name="minorId"
                    color="primary"
                  />
                }
                label="available for minor students ?"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: course created
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </form>
  );
};

export default AddCourse;
