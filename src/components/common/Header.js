import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import { Dropdown } from 'bootstrap'
import IconMenu from '@src/assets/images/menu'
import { clearToken } from '@src/lib/helpers/utility'

const Header = function (props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.getElementById('profile').addEventListener('click', function () {
      new Dropdown(document.getElementById('profile')).show()
    })
  }, [])

  const toggleMenu = (e) => {
    e.preventDefault()
    if ($('body').hasClass('sidebar-collapse')) {
      $('body').removeClass('sidebar-collapse')
    } else {
      $('body').addClass('sidebar-collapse')
    }
  }

  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <header className="main-header">
        <div className="header-wrapper d-flex w-100 align-items-center justify-content-between navbar navbar-expand-lg navbar-static-top"> 
          <span onClick={(e) => toggleMenu(e)} className="pointer e-4">
            <IconMenu height={20} width={20} fill={'#252525'} />
          </span>
          <ul className="navbar-nav navbar-right">
            <li className="dropdown">
                <a href="#" className="nav-link nav-link-lg nav-link-user d-inline-flex dropdown-toggle" role="button" id="profile" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="user-img-wrapper float-left">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    </div>
                    <span className="user-name-text d-none d-md-block float-right">Admin</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute pullDown" aria-labelledby="profile">
                    <span className="dropdown-menu-arrow"></span>
                    <div className="dropdown-item has-icon text-danger" onClick={() => handleLogout()}><i className="fa fa-sign-out me-2"></i>Logout</div>
                </div>
            </li>
          </ul>
        </div>
    </header>
  )
}

export default Header
