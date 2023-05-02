import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { getToken } from '@src/lib/helpers/utility'
import Loader from '@src/components/common/Loader'
import ErrorBoundary from '@src/layout/ErrorBoundary'
const AdminLayout = lazy(() => import('@src/layout/AdminLayout'))
const Login = lazy(() => import('@src/views/Login'))
const User = lazy(() => import('@src/views/User'))
const Wallpaper = lazy(() => import('@src/views/Wallpaper'))
const Category = lazy(() => import('@src/views/Category'))


const ProtectedRoute = ({ children }) => {
    const token = getToken()
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
}

const App = () => (
    <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route element={<AdminLayout />}>
                        <Route exact path="/" element={<ProtectedRoute><Wallpaper /></ProtectedRoute>} />
                        <Route exact path="/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
                        <Route exact path="/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    </ErrorBoundary>
)

export default App;
