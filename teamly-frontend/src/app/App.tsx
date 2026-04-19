import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "../pages/home/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
      </Routes>
    </Router>
  )
}

export default App;
