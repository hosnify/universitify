/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { getAllEnrollments } from 'src/API/enrollmentAPI';

// import getInitials from 'src/utils/getInitials';

const EnrollmentListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [enrollments, setEnrollment] = useState([
    {
      id: 201,
      createdAt: '2021-04-18T03:12:55.783Z',
      updatedAt: '2021-04-18T03:12:55.789Z',
      isAproved: false,
      course: {
        id: 71,
        name: 'Rustic Metal Chicken'
      },
      student: {
        id: 46,
        fname: 'Stacey',
        lname: 'Fahey'
      },
      supervisor: {
        id: 76,
        fname: 'Stella',
        lname: "O'Hara"
      }
    }
  ]);

  useEffect(() => {
    getAllEnrollments().then((enrollmentsData) =>
      setEnrollment(enrollmentsData)
    );
  }, []);
  console.log(enrollments);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const enrollmentTableMetaData = [
    'enrollment date',
    'student name',
    'course name ',
    'last update at',
    'status',
    'Actions'
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
                    <TableCell>{enrollmentData.createdAt}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {enrollmentData.student.fname +
                            enrollmentData.student.lname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{enrollmentData.course.name}</TableCell>
                    <TableCell>{enrollmentData.updatedAt}</TableCell>
                    <TableCell>{enrollmentData.isAproved.toString()}</TableCell>

                    <TableCell>
                      <Button primary> Approve </Button>
                      <Button color="secondary"> reject </Button>
                    </TableCell>
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

export default EnrollmentListResults;
