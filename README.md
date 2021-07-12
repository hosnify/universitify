# university registration system

 this is the react app client for university registration system , in which students can register university moudules , track enrollments , and course result .

## technology stack

> nodeJs - React - MaterialUI - express - prisma

express server here : https://github.com/hosnify/universtify-server

## Run instructions :

### install dependencies

#### `yarn install`

#### or

`npm install`

### Start app

#### `yarn start`

#### or

`npm start`

## Features :

### as a coordenator you can

- add new semester
- make registration open for this semester
- close semester registration
- start semester itself
- end semester and releasing grades
- add new Academic advisors
- add new student, attach them to the created Academic advisors

### as an academic advisor you can

- accept or reject students enollments
- add result for student enrolled on your courses

### as a student you can :

enroll in a course while registration is open for a semester
cancel your enrollment while semester has not started yet.
show your courses result and get notifications

## File Structure

Within the download you'll find the following directories and files:

```
university system folder structure
└── src
    ├── API
    │   ├── auth.js
    │   ├── courseAPI.js
    │   ├── enrollmentAPI.js
    │   ├── studentAPI.js
    │   └── superVisorAPI.js
    ├── App.js
    ├── components
    │   ├── AlertDialog.js
    │   ├── course
    │   │   ├── AddCourse.js
    │   │   ├── CourseDetails.js
    │   │   ├── CourseFinishedListResults.js
    │   │   ├── CourseListResult.js
    │   │   ├── courseListToolbar.js
    │   │   ├── CourseRegistrationListResults.js
    │   │   └── courseRegistrationListToolbar.js
    │   ├── dashboard
    │   │   ├── Budget.js
    │   │   ├── LatestOrders.js
    │   │   ├── LatestProducts.js
    │   │   ├── Sales.js
    │   │   ├── TasksProgress.js
    │   │   ├── TotalCustomers.js
    │   │   ├── TotalProfit.js
    │   │   └── TrafficByDevice.js
    │   ├── DashboardLayout.js
    │   ├── DashboardNavbar.js
    │   ├── DashboardSidebar.js
    │   ├── enrollment
    │   │   ├── CourseEnrollmentListResult.js
    │   │   ├── EnrollmentListResult.js
    │   │   ├── EnrollmentListToolbar.js
    │   │   └── StudentEnrollmentListResults.js
    │   ├── GlobalStyles.js
    │   ├── Header.js
    │   ├── Logo.js
    │   ├── MainLayout.js
    │   ├── MainNavbar.js
    │   ├── NavItem.js
    │   ├── settings
    │   │   ├── SettingsNotifications.js
    │   │   └── SettingsPassword.js
    │   ├── student
    │   │   ├── AddStudent.js
    │   │   ├── StudentListResults.js
    │   │   ├── StudentListToolbar.js
    │   │   └── studentprofile
    │   │       ├── StudentProfileDetails.js
    │   │       └── StudentProfile.js
    │   └── superVisor
    │       ├── AddSupervisor.js
    │       ├── SuperVisorListResults.js
    │       ├── SuperVisorListToolbar.js
    │       └── supervisorProfile
    │           ├── SuperVisorProfileDetails.js
    │           └── SuperVisorProfile.js
    ├── icons
    │   ├── Facebook.js
    │   └── Google.js
    ├── index.js
    ├── mixins
    │   └── chartjs.js
    ├── __mocks__
    │   ├── customers.js
    │   └── products.js
    ├── pages
    │   ├── course
    │   │   ├── AddCoursePage.js
    │   │   ├── CourseDetailsPage.js
    │   │   ├── CourseFinished.js
    │   │   ├── CourseList.js
    │   │   └── CourseRegistration.js
    │   ├── Dashboard.js
    │   ├── enrollments
    │   │   ├── EnrollmentList.js
    │   │   └── StudentEnrollmentsList.js
    │   ├── Login.js
    │   ├── NotFound.js
    │   ├── PlanAhead.js
    │   ├── Settings.js
    │   ├── student
    │   │   ├── AddStudentPage.js
    │   │   ├── StudentAccount.js
    │   │   └── StudentList.js
    │   └── supervisor
    │       ├── AddSuperVisorPage.js
    │       ├── SuperVisorAccount.js
    │       └── SupervisorList.js
    ├── routes.js
    ├── serviceWorker.js
    ├── theme
    │   ├── index.js
    │   ├── shadows.js
    │   └── typography.js
    └── utils
        └── getInitials.js
```

