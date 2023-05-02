import React, { useState, useEffect } from 'react'
import toastr from 'toastr'
import _ from 'underscore'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import swal from 'sweetalert'
import BreadCrumb from '@src/components/common/BreadCrumb'
import Loader from '@src/components/common/Loader'
import Api from '@src/lib/services/api'
import { Modal } from 'bootstrap'

const Category = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ _id: '', name: '' });
    const [isDisabled, setIsDisabled] = useState(false);
    const [pagination, setPagination] = useState({ skip: 0, limit: 25 });
    const [total, setTotal] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        document.getElementById('modalAddEditCategory').addEventListener('hide.bs.modal', function (event) {
            cancelFormFn()
        })
    }, [])

    useEffect(() => {
        getCategories()
    }, [pagination, searchText])


    const getCategories = () => {
        const args = {
            skip: pagination.skip,
            limit: pagination.limit
        }
        if (searchText && searchText.trim()) args['keyword'] = searchText.trim()
        Api.getCategories(args, (err, result) => {
            setLoading(false)
            if (result?.data?.data?.getCategories?.categories) {
                if (!_.isUndefined(result?.data?.data?.getCategories?.total)) setTotal(result?.data?.data?.getCategories?.total)
                setCategories(result?.data?.data?.getCategories?.categories)
            }
        })
    }

    const handlePageClick = (data) => {
        setPagination({ ...pagination, skip: Math.ceil(data.selected * pagination.limit) })
    }

    const cancelFormFn = () => {
        setCategory({ _id: '', name: '' })
    }

    const deleteCategoryFn = (event, categoryId) => {
        event.preventDefault()
        swal({
            title: 'Are you sure?',
            text: `You are about to delete this category.\nThis cannot be undone.`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            html: true
        }).then((isConfirm) => {
            if (isConfirm) {
                Api.deleteCategory({ categoryId }, (err, result) => {
                    console.log(err, result, 'deleteCategory')
                    if (result && result.data && result.data.data) {
                        if(result.data.data.deleteCategory) {
                            setCategories([..._.filter(categories, item => item._id !== categoryId)])
                            setTotal(total - 1)
                            return toastr.success('Category deleted successfully')
                        } else if(result.data.errors && result.data.errors[0] && result.data.errors[0].message) {
                            return toastr.error(result.data.errors[0].message)
                        } else {
                            return toastr.error('Unable to delete category')
                        }
                    } else return toastr.error('Unable to delete category')
                })
            }
        });
    }

    const addEditCategoryFn = (event, category) => {
        event.preventDefault()
        if(category) setCategory({ _id: category?._id, name: category?.name || '' })
		new Modal(document.getElementById('modalAddEditCategory')).show();
    }

   const handleSubmit = (event) => {
		event.preventDefault()

        const data = { ...category }
		
        if(category._id) {
            data['categoryId'] = category._id
            Api.editCategory(data, (err, result) => {
                setIsDisabled(false)
                if(result && result.data && result.data.data && result.data.data.editCategory) {
                    setCategories([...categories].map(item => item._id === category._id ? result.data.data.editCategory : item))
                    Modal.getInstance(document.getElementById('modalAddEditCategory'))?.hide();
                    return toastr.success('Category updated successfully')
                } else {
                    return toastr.error('Unable to update category')
                }
            })
        } else {
            Api.addCategory(data, (err, result) => {
                setIsDisabled(false)
                if(result && result.data && result.data.data && result.data.data.addCategory) {
                    setCategories([...categories, result.data.data.addCategory])
                    setTotal(total + 1)
                    Modal.getInstance(document.getElementById('modalAddEditCategory'))?.hide();
                    return toastr.success('Category added successfully')
                } else {
                    return toastr.error('Unable to add category')
                }
            })
        }
    }

    const pageCount = Math.ceil(total / pagination.limit)
    
    return (
        <div className="category-page">
            <BreadCrumb page={'Categories'} />
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6 col-xl-3">
                                <div className="search-box-wrapper position-relative">
                                    <input type="text" className="form-control search-input" placeholder="Search here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                    <span className="search-icon"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-9 mt-xl-0 mt-3 text-sm-end">
                                <button className="btn btn-primary action-button" onClick={(event) => addEditCategoryFn(event)}><i className="fa fa-plus me-2"></i> Add Category</button>
                            </div>
                        </div>
                    </div>
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
                                            <th>Name</th>
                                            <th>Created At</th>
                                            <th width="150">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ?
                                            categories.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item.name}</td>
                                                    <td>{moment(item.createdAt).format('DD MMM YYYY h:mm A')}</td>
                                                    <td>
                                                        <button className="btn btn-primary btn-edit" onClick={(event) => addEditCategoryFn(event, item)}><i className="fa fa-pencil"></i></button>
                                                        <button className="btn btn-primary btn-remove" onClick={(event) => deleteCategoryFn(event, item._id)}><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center">No category found</td>
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
                    <div className="modal fade slide-right action-modal" id="modalAddEditCategory" tabIndex="-1" role="dialog" aria-hidden="true">
                        {isDisabled &&
                            <div className="modal-loading">
                                <i className="fa fa-spinner fa-spin fa-2x"></i>
                            </div>
                        }
                        <div className="modal-dialog modal-md">
                            <div className="modal-content-wrapper">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">
                                            <i className="fa fa-times fs-5" />
                                        </button>
                                        <form className="clearfix text-start" onSubmit={(event) => handleSubmit(event)}>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" name="name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} placeholder="Enter Name" required />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-action float-end" disabled={isDisabled}>Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Category;