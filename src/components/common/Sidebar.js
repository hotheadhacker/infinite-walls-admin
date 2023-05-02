import React from 'react'
import $ from 'jquery'
import { useLocation } from 'react-router-dom'
import IconPople from '../../assets/images/pople'
import IconCategory from '../../assets/images/category'
import IconWallpaper from '@src/assets/images/wallpaper'

const Sidebar = function (props) {
    const menuList = [
        { name: 'Wallpapers', link: '/', icon: IconWallpaper },
        { name: 'Categories', link: '/categories', icon: IconCategory },
        { name: 'Users', link: '/users', icon: IconPople },
    ]
    const location = useLocation();
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="sidebar-header d-none d-lg-flex">
                   <img src="/logo.png" alt="logo" className="header-logo d-block"></img>
                   <img src="/logo-small.png" alt="logo" className="header-logo-small d-none"></img>
                </div>
                <div className="d-flex justify-content-end d-lg-none">
                    <span onClick={(e) => $('body').removeClass('sidebar-collapse')} className="pointer px-3 py-3">
                        <i className="fa fa-close fs-5" />
                    </span>
                </div>
                <ul className="sidebar-menu">
                    <li className="header">MENU</li>
                    {menuList.map((menu, index) => (
                        <li className="" key={index}>
                            <a href={menu.link} className={location?.pathname === menu.link ? 'active' : ''}>
                                <menu.icon height={20} width={20} fill={'#ffffff'} />
                                <span className="nav-text">{menu.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
    )
}

export default Sidebar
