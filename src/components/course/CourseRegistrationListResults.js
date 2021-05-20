/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  Chip,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ListItem,
  Grid
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { getAllCoursesByMajorAndLevel } from 'src/API/courseAPI';
import { getStudent } from 'src/API/studentAPI';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { createOne as createEnrollment } from '../../API/enrollmentAPI';
import { UserContext } from '../../API/auth';
import AlertDialog from '../AlertDialog';

const CourseRegistrationListResults = ({ ...props }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user && user.role === 'student') {
      getStudent(user.id).then((userData) => {
        setUser({ role: 'student', ...userData });
      });
    }
  }, []);
  useEffect(() => {
    if (user) {
      getAllCoursesByMajorAndLevel(user.major, props.level).then(
        (coursesData) => setCourses(coursesData)
      );
    }
  }, []);
  const isEligble = (loggeduser, inputCourse) =>
    loggeduser &&
    inputCourse.prerequisites
      .map((course) => course.id)
      .every((id) =>
        user.coursesFinished.map((course) => course.courseId).includes(id)
      );

  const handleEnroll = async (userId, courseId) => {
    await createEnrollment({
      studentID: userId,
      courseID: courseId
    });
    if (user && user.role === 'student') {
      getStudent(user.id).then((userData) => {
        setUser({ role: 'student', ...userData });
      });
    }
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const courseTableMetaData = [
    'courseCode',
    'Course title',
    'Credit',
    'Eligible',
    'Course prerequisites',
    'Enroll'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {courseTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((courseData) => (
                  <TableRow hover key={courseData.id}>
                    <TableCell>{courseData.courseCode}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {courseData.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{courseData.credit}</TableCell>
                    <TableCell>
                      {isEligble(user, courseData) ? (
                        <Chip
                          icon={<CheckCircleOutlineIcon />}
                          label="Eligible"
                          clickable
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          icon={<HighlightOffIcon />}
                          label="Not eligible"
                          clickable
                          color="secondary"
                          variant="outlined"
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      {isEligble(user, courseData) ? (
                        <AlertDialog
                          buttonText="show prerequisites"
                          title={`Course ${courseData.name} prerequisites :`}
                          color="primary"
                          data={
                            <List
                              subheader="Prerequisites :"
                              alignItems="flex-start"
                            >
                              {courseData.prerequisites.map((course) => (
                                <ListItem divider key={course.id}>
                                  {`Course : ${course.name} - level: ${course.level}`}
                                </ListItem>
                              ))}
                            </List>
                          }
                        />
                      ) : (
                        <AlertDialog
                          buttonText="show prerequisites"
                          title={`Course : ${courseData.name} `}
                          color="secondary"
                          data={
                            <List
                              subheader="Prerequisites :"
                              alignItems="flex-start"
                            >
                              {courseData.prerequisites.map((course) => (
                                <ListItem divider key={course.id}>
                                  {`Course : ${course.name} - level: ${course.level}`}
                                </ListItem>
                              ))}
                            </List>
                          }
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      {isEligble(user, courseData) ? (
                        <Box color="secondary" variant="outlined">
                          {user.enrollments
                            .map((enrollment) => enrollment.courseID)
                            .includes(courseData.id) ? (
                            <Grid
                              container
                              flexDirection="column"
                              spacing={1}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item>
                                <Chip
                                  icon={<CheckCircleOutlineIcon />}
                                  label="Already enrolled"
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item>
                                <Chip
                                  icon={<InfoOutlinedIcon />}
                                  label={
                                    user.enrollments.find(
                                      (enrollment) =>
                                        enrollment.courseID === courseData.id
                                    ).status
                                  }
                                  clickable
                                  color="default"
                                  variant="outlined"
                                />
                              </Grid>
                            </Grid>
                          ) : (
                            <Button
                              onClick={() =>
                                handleEnroll(user.id, courseData.id)
                              }
                            >
                              Enroll
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <Button primary disabled variant="outlined">
                          Enroll
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseRegistrationListResults;
