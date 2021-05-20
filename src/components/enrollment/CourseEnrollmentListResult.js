/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import {
  deleteEnrollment,
  getAllEnrollmentsByCourseId,
  UpdateEnrollment,
  EndEnrollment
} from 'src/API/enrollmentAPI';
import { InfoOutlined } from '@material-ui/icons';

import { UserContext } from '../../API/auth';

const CourseEnrollmentListResult = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) => {
      console.log(enrollmentsData);
      setEnrollments(enrollmentsData.enrollments);
    });
  }, []);
  const handleApprove = async (id, enrollment) => {
    console.log(enrollment, id);
    await UpdateEnrollment(id, enrollment);
    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
      setEnrollments(enrollmentsData.enrollments)
    );
  };
  const handleDelete = async (id) => {
    await deleteEnrollment(id);
    getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
      setEnrollments(enrollmentsData.enrollments)
    );
  };
  const handleAddResult = async (id, result) => {
    const grade = prompt(
      'Enter Course result (GPA) in number from 0 to 4 : ',
      'ex. 2.7'
    );
    if (grade !== null && grade !== '' && grade >= 0 && grade <= 4) {
      await EndEnrollment(id, { ...result, grade });
      getAllEnrollmentsByCourseId(props.courseId).then((enrollmentsData) =>
        setEnrollments(enrollmentsData.enrollments)
      );
    } else {
      alert('Faild : please enter Course result (GPA) in numbers from 0 to 4');
    }
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const enrollmentTableMetaData = [
    'enrollment date',
    'student ',
    'course  ',
    'last update at',
    'Supervisor',
    'status',
    'action'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {enrollmentTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((enrollmentData) => (
                  <TableRow hover key={enrollmentData.id}>
                    <TableCell>
                      {enrollmentData.createdAt.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${enrollmentData.student.fname} ${enrollmentData.student.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{enrollmentData.course.name}</TableCell>
                    <TableCell>
                      {enrollmentData.updatedAt.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      {enrollmentData.supervisor
                        ? `DR. ${enrollmentData.supervisor.fname} ${enrollmentData.supervisor.lname}`
                        : 'Not Yet'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<InfoOutlined />}
                        label={enrollmentData.status}
                        clickable
                        color="default"
                        variant="outlined"
                      />
                    </TableCell>
                    {enrollmentData.status === 'in review' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData.id, {
                              status: 'enrolled',
                              isAproved: true,
                              supervisorId: user.id
                            });
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData.id, {
                              status: 'rejected',
                              isAproved: false,
                              supervisorId: user.id
                            });
                          }}
                        >
                          reject
                        </Button>
                      </TableCell>
                    )}
                    {enrollmentData.status === 'rejected' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData.id, {
                              status: 'in review',
                              isAproved: true,
                              supervisorId: user.id
                            });
                          }}
                        >
                          Undo
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            handleDelete(enrollmentData.id);
                          }}
                        >
                          delete
                        </Button>
                      </TableCell>
                    )}
                    {enrollmentData.status === 'enrolled' && (
                      <TableCell>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleApprove(enrollmentData.id, {
                              status: 'in review',
                              isAproved: false,
                              supervisorId: user.id
                            });
                          }}
                        >
                          Unenroll
                        </Button>
                        <Button
                          primary
                          variant="outlined"
                          onClick={() => {
                            handleAddResult(enrollmentData.id, {
                              courseId: enrollmentData.course.id,
                              studentID: user.id,
                              semester: 'FALL',
                              instructorName: 'DR. Ali Ahmed'
                            });
                          }}
                        >
                          Add Result
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={enrollments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseEnrollmentListResult;
