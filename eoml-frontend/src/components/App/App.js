import React from "react"
import { LandingPage, Layout, LoginPage, NotFoundPage, ProfilePage, RegistrationPage, NewCollectionPage } from "../../components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/newcollection" element={<NewCollectionPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

