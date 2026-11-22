import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage } from "./pages";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicOnlyRoute } from "./components/routes/PublicOnlyRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
