import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ComplaintForm } from "./pages/ComplaintForm";
import { TrackComplaint } from "./pages/TrackComplaint";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<ComplaintForm />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
