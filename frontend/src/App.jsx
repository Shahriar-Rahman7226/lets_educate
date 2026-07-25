import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./modules/home/homepage";
import HomepageNavbar from "./components/navbar/home/homepage_navbar";
import HomepageFooter from "./components/footer/home/homepage_footer";
import SignIn from "./modules/auth/signin/signin";

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
         {/* ===== Public Layout ===== */}
          <Route element={<HomepageLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
