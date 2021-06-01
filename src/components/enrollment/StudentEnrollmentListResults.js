/* eslint-disable no-alert */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
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
import { InfoOutlined } from '@material-ui/icons';
import { getEnrollmentByStudent } from 'src/API/studentAPI';

import {
  deleteEnrollment,
  UpdateEnrollment,
  EndEnrollment
} from 'src/API/enrollmentAPI';
import { createNotificationForStudent } from 'src/API/notificationAPI';
import { UserContext } from '../../API/auth';

const StudentEnrollmentListResults = ({ ...props }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollment] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.role === 'student') {
      getEnrollmentByStudent(user.id).then((enrollmentsData) =>
        setEnrollment(enrollmentsData.enrollments)
      );
    } else {
      getEnrollmentByStudent(props.id).then((enrollmentsData) => {
        setEnrollment(enrollmentsData.enrollments);
      });
    }
  }, []);

  const handleApprove = async (enrollmentData, enrollment) => {
    const updatedEnrollment = await UpdateEnrollment(
      enrollmentData.id,
      enrollment
    );
    await createNotificationForStudent(enrollmentData.student.id, {
      data: {
        title: 'enrollment approval',
        senderName: `DR. ${user.fname} ${user.lname}`,
        text: `updated your enrollment in course ${enrollmentData.course.name} `,
        subText: `enrollment current status: ${updatedEnrollment.status}`,
        avatar: user.avatar
      }
    }).then((res) => console.log(res));
    getEnrollmentByStudent(props.id).then((enrollmentsData) => {
      setEnrollment(enrollmentsData.enrollments);
    });
  };
  const handleDelete = async (enrollmentData) => {
    await deleteEnrollment(enrollmentData.id);
    await createNotificationForStudent(enrollmentData.student.id, {
      data: {
        title: 'enrollment approval',
        senderName: `DR. ${user.fname} ${user.lname}`,
        text: `deleted your enrollment in course ${enrollmentData.course.name}`,
        avatar: user.avatar
      }
    });
    getEnrollmentByStudent(props.id).then((enrollmentsData) => {
      setEnrollment(enrollmentsData.enrollments);
    });
  };
  const handleAddResult = async (enrollmentData, result) => {
    const grade = prompt(
      'Enter Course result (GPA) in number from 0 to 4 : ',
      'ex. 2.7'
    );
    if (grade !== null && grade !== '' && grade >= 0 && grade <= 4) {
      await EndEnrollment(enrollmentData.id, { ...result, grade });
      await createNotificationForStudent(enrollmentData.student.id, {
        data: {
          title: 'course result',
          senderName: `DR. ${user.fname} ${user.lname}`,
          text: `added your result in course ${enrollmentData.course.name}`,
          subText: `your result is : ${grade}`,
          avatar: user.avatar
        }
      });
      getEnrollmentByStudent(props.id).then((enrollmentsData) => {
        setEnrollment(enrollmentsData.enrollments);
      });
    } else {
      alert('Faild : please enter Course result (GPA) in numbers from 0 to 4');
    }
  };
  const handleCancel = async (id) => {
    await deleteEnrollment(id);
    getEnrollmentByStudent(props.id).then((enrollmentsData) => {
      setEnrollment(enrollmentsData.enrollments);
    });
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
    user.role === 'supervisor' && 'action'
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
                .filter(
                  (enrollmentData) => enrollmentData.status !== 'enrolled'
                )
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
                    {user.role === 'supervisor' ? (
                      (enrollmentData.status === 'in review' && (
                        <TableCell>
                          <Button
                            primary
                            variant="outlined"
                            onClick={() => {
                              handleApprove(enrollmentData, {
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
                              handleApprove(enrollmentData, {
                                status: 'rejected',
                                isAproved: false,
                                supervisorId: user.id
                              });
                            }}
                          >
                            reject
                          </Button>
                        </TableCell>
                      )) ||
                      (enrollmentData.status === 'rejected' && (
                        <TableCell>
                          <Button
                            primary
                            variant="outlined"
                            onClick={() => {
                              handleApprove(enrollmentData, {
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
                              handleDelete(enrollmentData);
                            }}
                          >
                            delete
                          </Button>
                        </TableCell>
                      )) ||
                      (enrollmentData.status === 'enrolled' && (
                        <TableCell>
                          <Button
                            primary
                            variant="outlined"
                            onClick={() => {
                              handleApprove(enrollmentData, {
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
                              handleAddResult(enrollmentData, {
                                courseId: enrollmentData.course.id,
                                studentID: enrollmentData.student.id,
                                semester: 'FALL', // todo
                                instructorName: 'DR. Ali Ahmed' // TODO
                              });
                            }}
                          >
                            Add Result
                          </Button>
                        </TableCell>
                      ))
                    ) : (
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            handleCancel(enrollmentData.id);
                          }}
                        >
                          Cancel
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

export default StudentEnrollmentListResults;
