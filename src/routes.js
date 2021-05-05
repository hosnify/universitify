/* eslint-disable no-nested-ternary */
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import StudentList from 'src/pages/student/StudentList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import CourseList from './pages/course/CourseList';
import EnrollmentList from './pages/enrollments/EnrollmentList';
import SupervisorList from './pages/supervisor/SupervisorList';
import AddCoursePage from './pages/course/AddCoursePage';
import CourseDetailsPage from './pages/course/CourseDetailsPage';
import PlanAheadPage from './pages/PlanAhead';
import SuperVisorAccount from './pages/supervisor/SuperVisorAccount';
import StudentEnrollmentList from './pages/enrollments/StudentEnrollmentsList';
import CourseRegistration from './pages/course/CourseRegistration';
import CourseFinished from './pages/course/CourseFinished';
import StudentAccount from './pages/student/StudentAccount';
import AddStudentPage from './pages/student/AddStudentPage';
import AddSuperVisorPage from './pages/supervisor/AddSuperVisorPage';

// isSigned = true;
const routes = (user) => {
  console.log(user);
  return [
    {
      path: 'app',
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: 'student/:id/account',
          element: user ? <StudentAccount /> : <Navigate to="/login" />
        },
        {
          path: 'students',
          element: user ? <StudentList /> : <Navigate to="/login" />
        },
        {
          path: 'student/add',
          element: user ? <AddStudentPage /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/Courses',
          element: user ? <CourseFinished /> : <Navigate to="/login" />
        },
        {
          path: 'student/:id/enrollments',
          element: user ? <StudentEnrollmentList /> : <Navigate to="/login" />
        },
        {
          path: 'courses',
          element: user ? <CourseList /> : <Navigate to="/login" />
        },
        {
          path: 'course/add',
          element: user ? <AddCoursePage /> : <Navigate to="/login" />
        },
        {
          path: 'course/:id',
          element: user ? <CourseDetailsPage /> : <Navigate to="/login" />
        },
        {
          path: 'registration',
          element: user ? <CourseRegistration /> : <Navigate to="/login" />
        },

        {
          path: 'enrollments',
          element: user ? <EnrollmentList /> : <Navigate to="/login" />
        },

        {
          path: 'supervisor/:id/account',
          element: user ? <SuperVisorAccount /> : <Navigate to="/login" />
        },
        {
          path: 'supervisors',
          element: user ? <SupervisorList /> : <Navigate to="/login" />
        },
        {
          path: 'supervisor/add',
          element: user ? <AddSuperVisorPage /> : <Navigate to="/login" />
        },
        {
          path: 'planahead',
          element: user ? <PlanAheadPage /> : <Navigate to="/login" />
        },

        {
          path: 'dashboard',
          element: user ? <Dashboard /> : <Navigate to="/login" />
        },

        { path: '*', element: <Navigate to="/login" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        {
          path: '/',
          element: !user ? (
            <Navigate to="/login" />
          ) : user.role === 'student' ? (
            <Navigate to="app/student/account" />
          ) : (
            <Navigate to="app/supervisor/account" />
          )
        },
        { path: '*', element: <Navigate to="/login" /> }
      ]
    }
  ];
};
export default routes;
