import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";
import Home from "../src/components/Home";

function App() {
  return (
    <GoogleOAuthProvider clientId="658394130281-1m00f13gnk7go8e2hg3ccikkul94sl2g.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
