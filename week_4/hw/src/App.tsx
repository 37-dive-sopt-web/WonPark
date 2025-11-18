import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LonginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { MyPage } from "./pages/MyPage";
import { MyInfoTab } from "./pages/MyInfoTab/MyInfoTab";
import { UserLookupTab } from "./pages/UserLookupTab/UserLookupTab";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/mypage" element={<MyPage />}>
        <Route path="info" element={<MyInfoTab />} />
        <Route path="users" element={<UserLookupTab />} />
        <Route index element={<Navigate to="info" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
