import { useState } from "react";
//import { typescript2_backend } from 'declarations/typescript2_backend';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Welcome from "./components/welcome";
import NewsLetter from "./components/newsletter";
import Details from "./components/detaills";
import Profile from "./components/profile";
import AddNewsLetter from "./components/addnewsletter";
import { AuthProvider } from "./auth/authetication";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/newsletter" element={<NewsLetter />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddNewsLetter />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
