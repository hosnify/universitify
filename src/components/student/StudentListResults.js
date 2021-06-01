import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
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
import { getAllStudents } from 'src/API/studentAPI';
import StudentEnrollmentListResults from '../enrollment/StudentEnrollmentListResults';
import AlertDialog from '../AlertDialog';
// import getInitials from 'src/utils/getInitials';

const StudentListResults = ({ ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getAllStudents().then((studentsData) => setStudents(studentsData));
  }, []);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const studentTableMetaData = [
    'ID',
    'Student name',
    'Level',
    'Major',
    'Completed CreditHours',
    'Requested CreditHours',
    'Courses finished',
    'Status',
    'Enrollments'
  ];

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {studentTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((studentData) => (
                  <TableRow hover key={studentData.id}>
                    <TableCell>{studentData.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar src={studentData.avatarUrl} sx={{ mr: 2 }} />
                        <Typography color="textPrimary" variant="body1">
                          {`${studentData.fname} ${studentData.lname}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{studentData.level}</TableCell>
                    <TableCell>{studentData.major}</TableCell>
                    <TableCell>
                      {(studentData.coursesFinished.length * 3).toString()}
                      {/* TODO: change with CreditHoursDone */}
                    </TableCell>
                    <TableCell>{studentData.creditHave}</TableCell>
                    <TableCell>
                      {studentData.coursesFinished.length.toString()}
                    </TableCell>
                    <TableCell>
                      {studentData.enrollments
                        .map((enrollment) => enrollment.status)
                        .includes('in review') && (
                        <Chip
                          icon={<InfoOutlined />}
                          label="need review"
                          clickable
                          color="secondary"
                          variant="outlined"
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      <AlertDialog
                        buttonText="Enrollments"
                        title={`student: ${studentData.fname} ${studentData.lname} enrollments :`}
                        color="primary"
                        data={
                          <StudentEnrollmentListResults id={studentData.id} />
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={students.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default StudentListResults;
