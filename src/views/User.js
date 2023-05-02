import React, { useState, useEffect } from 'react'
import toastr from 'toastr'
import _ from 'underscore'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import BreadCrumb from '@src/components/common/BreadCrumb'
import Loader from '@src/components/common/Loader'
import Api from '@src/lib/services/api'

const User = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ skip: 0, limit: 25 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getUsers()
    }, [pagination])


    const getUsers = () => {
        const args = {
            skip: pagination.skip,
            limit: pagination.limit
        }
        
        Api.getUsers(args, (err, result) => {
            setLoading(false)
            if (result?.data?.data?.getUsers?.users) {
                if (!_.isUndefined(result?.data?.data?.getUsers?.total)) setTotal(result?.data?.data?.getUsers?.total)
                setUsers(result?.data?.data?.getUsers?.users)
            }
        })
    }

    const handlePageClick = (data) => {
        setPagination({ ...pagination, skip: Math.ceil(data.selected * pagination.limit) })
    }

    const pageCount = Math.ceil(total / pagination.limit)
    
    return (
        <div className="category-page">
            <BreadCrumb page={'Users'} />
            <div className="content">
                <div className="card">
                    <div className="card-body position-relative">
                        {loading ?
                            <div className="p-5 m-5 position-relative">
                                <Loader />
                            </div>
                            :
                            <div className="table-responsive">
                                <table className="table table-hover mb-0 data-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Downloads</th>
                                            <th>Likes</th>
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ?
                                            users.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.downloads}</td>
                                                    <td>{item.likes}</td>
                                                    <td>{moment(item.createdAt).format('DD MMM YYYY h:mm A')}</td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center">No user found</td>
                                            </tr>
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="5">
                                                {pageCount > 0 &&
                                                    <ReactPaginate
                                                        previousLabel={"← Previous"}
                                                        nextLabel={"Next →"}
                                                        breakLabel={'...'}
                                                        pageCount={pageCount}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={5}
                                                        onPageChange={handlePageClick}
                                                        containerClassName={'pagination'}
                                                    />
                                                }
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default User;