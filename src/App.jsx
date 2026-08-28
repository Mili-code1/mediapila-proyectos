import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GroupDetail from "./pages/GroupDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grupo/:slug" element={<GroupDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
