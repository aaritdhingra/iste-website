import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import AdminToolbar from "./components/AdminToolbar";
import { ScrollProgress } from "./components/Reveal";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import PastEvents from "./pages/PastEvents";
import PastEventDetail from "./pages/PastEventDetail";
import Members from "./pages/Members";
import Recruitment from "./pages/Recruitment";
import Admin from "./pages/Admin";
import { ADMIN_PATH } from "./lib/adminConfig";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <AdminToolbar />
      <main className="page-enter" key={window.location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/past-events/:id" element={<PastEventDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path={ADMIN_PATH} element={<Admin />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}