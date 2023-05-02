import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@src/components/common/Header'
import Sidebar from '../components/common/Sidebar'

const AdminLayout = () => {
	return (
		<div className="wrapper">
			<Header />
			<Sidebar />
			<div className="content-wrapper">
				<Outlet />
			</div>
		</div>
	)
}

export default AdminLayout
