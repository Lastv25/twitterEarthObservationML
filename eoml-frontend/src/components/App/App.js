import React from "react"
import {  LandingPage,
          Layout,
          LoginPage,
          NotFoundPage,
          ProfilePage,
          RegistrationPage,
          NewCollectionPage,
          CollectionView,
          ProtectedRoute} from "../../components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
          <Route path="/collection/:cleaning_id" element={<ProtectedRoute component={CollectionView} />} />
          <Route path="/newcollection" element={<ProtectedRoute component={NewCollectionPage} />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

