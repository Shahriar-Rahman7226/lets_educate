import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./modules/home/homepage";
import HomepageNavbar from "./components/navbar/home/homepage_navbar";
import HomepageFooter from "./components/footer/home/homepage_footer";
import SignIn from "./modules/auth/signin/signin";
import TutorSignUp from "./modules/auth/signup/tutor_signup";
import StudentSignUp from "./modules/auth/signup/student_signup";
import UserChoice from "./modules/auth/userchoice/userchoice";

// ===== Layout Components =====
const HomepageLayout = () => (
  <>
    <HomepageNavbar />
    <Outlet />
    <HomepageFooter />
  </>
);

// const HomepageUserLayout = () => (
//   <>
//     <UserNavbar />
//     <Outlet />
//     <HomepageFooter />
//   </>
// );

// const UserLayout = () => (
//   <>
//     <UserNavbar />
//     <Outlet />
//     <UserFooter />
//   </>
// );

// ===== App Component =====
function App() {
  return (
    <Router>
      <Routes>
         {/* Auth Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/tutor_signup" element={<TutorSignUp />} />
           <Route path="/student_signup" element={<StudentSignUp />} />
          <Route path="/userchoice" element={<UserChoice />} />

         {/* ===== Public Layout ===== */}
          <Route element={<HomepageLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
