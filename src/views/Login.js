import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import toastr from 'toastr'
import Api from '../lib/services/api'
import { getToken, setToken } from '../lib/helpers/utility'

const Login = () => {
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState({ email: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(getToken() ? true : false);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (user && user.email && user.password) {
            setLoader(true)
            Api.login(user, (err, result) => {
                console.log(err, result, 'login')
                setLoader(false)
                if (result && result.data && result.data.data && result.data.data.authUser && result.data.data.authUser.token) {
                    setToken(result.data.data.authUser.token)
                    setUser({ email: '', password: '' })
                    setLoginSuccess(true)
                    return toastr.success('Login successfully')
                } else {
                    const msg = result && result.data && result.data.errors && result.data.errors[0] && result.data.errors[0].message ? result.data.errors[0].message : 'Unable to login...please try again'
                    return toastr.error(msg)
                }
            })
        }
    }

    return (
        <div className="login-box-wrapper text-center">
            <div className="login-inner">
                <div className="box bg-white">
                    <div className="clearfix title text-primary">Welcome</div>
                    <form className="clearfix text-left" onSubmit={(event) => handleSubmit(event)}>
                        <div className="content-box">
                            <div className="text-center sub-title">Please Sign into your account</div>
                            <div className="form-group mb-4 text-start">
                                <label className="text-black form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Enter email" required />
                            </div>
                            <div className="form-group mt-3 mb-4 text-start">
                                <label className="text-black form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Enter password" />
                            </div>
                            <div className="form-group text-center pt-3">
                                <button type="submit" disabled={loader} className="btn btn-primary w-100">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {loginSuccess && <Navigate to="/" />}
        </div>
    )
}

export default Login