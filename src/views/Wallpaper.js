import React, { useState, useEffect } from 'react'
import toastr from 'toastr'
import _ from 'underscore'
import $ from 'jquery'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import swal from 'sweetalert'
import BreadCrumb from '@src/components/common/BreadCrumb'
import Loader from '@src/components/common/Loader'
import Api from '@src/lib/services/api'
import { Modal } from 'bootstrap'
import FileUpload from '@src/lib/services/fileUpload'

const Wallpaper = () => {
    const [loading, setLoading] = useState(true);
    const [wallpapers, setWallpapers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [wallpaper, setWallpaper] = useState({ _id: '', name: '', image: '', categoryId: '', isFeatured: false });
    const [isDisabled, setIsDisabled] = useState(false);
    const [pagination, setPagination] = useState({ skip: 0, limit: 25 });
    const [total, setTotal] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getCategories()

        document.getElementById('modalAddEditWallpaper').addEventListener('hide.bs.modal', function (event) {
            cancelFormFn()
        })
    }, [])

    useEffect(() => {
        getWallpapers()
    }, [pagination, searchText, selectedCategory])


    const getCategories = () => {
        Api.getCategories({}, (err, result) => {
            setLoading(false)
            if (result?.data?.data?.getCategories?.categories) setCategories(result?.data?.data?.getCategories?.categories)
        })
    }

    const getWallpapers = () => {
        const args = {
            skip: pagination.skip,
            limit: pagination.limit
        }
        if (searchText && searchText.trim()) args['keyword'] = searchText.trim()
        if (selectedCategory) args['categoryId'] = selectedCategory
        Api.getWallpapers(args, (err, result) => {
            setLoading(false)
            if (result?.data?.data?.getWallpapers?.wallpapers) {
                if (!_.isUndefined(result?.data?.data?.getWallpapers?.total)) setTotal(result?.data?.data?.getWallpapers?.total)
                setWallpapers(result?.data?.data?.getWallpapers?.wallpapers, pagination)
            }
        })
    }

    const handlePageClick = (data) => {
        setPagination({ ...pagination, skip: Math.ceil(data.selected * pagination.limit) })
    }

    const cancelFormFn = () => {
        setWallpaper({ _id: '', name: '', image: '', categoryId: '', isFeatured: false })
    }

    const deleteWallpaperFn = (event, wallpaperId) => {
        event.preventDefault()
        swal({
            title: 'Are you sure?',
            text: `You are about to delete this wallpaper.\nThis cannot be undone.`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            html: true
        }).then((isConfirm) => {
            if (isConfirm) {
                Api.deleteWallpaper({ wallpaperId }, (err, result) => {
                    if (result && result.data && result.data.data && result.data.data.deleteWallpaper) {
                        setWallpapers([..._.filter(wallpapers, item => item._id !== wallpaperId)])
                        setTotal(total - 1)
                        return toastr.success('Wallpaper deleted successfully')
                    } else return toastr.error('Unable to delete wallpaper')
                })
            }
        });
    }

    const addEditWallpaperFn = (event, wallpaper) => {
        event.preventDefault()
        if (wallpaper) setWallpaper({ _id: wallpaper?._id, name: wallpaper?.name || '', image: wallpaper?.image || '', categoryId: wallpaper?.categoryId?._id || '', isFeatured: wallpaper?.isFeatured || false })
        new Modal(document.getElementById('modalAddEditWallpaper')).show();
    }

    const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader()
			reader.onload = function(event) {
                setWallpaper({ ...wallpaper, image: event.target.result })
			}
			reader.readAsDataURL(e.target.files[0])
		}
	}

	const removeImage = (e) => {
		e.preventDefault()
		$('#wallpaperImage').val('')
        setWallpaper({ ...wallpaper, image: '' })
	}


    const handleSubmit = (event) => {
        event.preventDefault()
        setIsDisabled(true)

        const data = { ...wallpaper }
        if(wallpaper._id) data['wallpaperId'] = wallpaper._id

        const addEditFn = (inputData) => {
            if (inputData.wallpaperId) {
                Api.editWallpaper(inputData, (err, result) => {
                    setIsDisabled(false)
                    if (result && result.data && result.data.data && result.data.data.editWallpaper) {
                        setWallpapers([...wallpapers].map(item => item._id === wallpaper._id ? result.data.data.editWallpaper : item))
                        Modal.getInstance(document.getElementById('modalAddEditWallpaper'))?.hide();
                        return toastr.success('Wallpaper updated successfully')
                    } else {
                        return toastr.error('Unable to update wallpaper')
                    }
                })
            } else {
                Api.addWallpaper(inputData, (err, result) => {
                    setIsDisabled(false)
                    if (result && result.data && result.data.data && result.data.data.addWallpaper) {
                        setWallpapers([...wallpapers, result.data.data.addWallpaper])
                        setTotal(total + 1)
                        Modal.getInstance(document.getElementById('modalAddEditWallpaper'))?.hide();
                        return toastr.success('Wallpaper added successfully')
                    } else {
                        return toastr.error('Unable to add wallpaper')
                    }
                })
            }
        }

        if(!wallpaper?._id && document.getElementById('wallpaperImage')?.files?.length <= 0) {
            setIsDisabled(false)
            return toastr.error('please select wallpaper image')
        }

        if(document.getElementById('wallpaperImage') && document.getElementById('wallpaperImage').files && document.getElementById('wallpaperImage').files[0]) {
            FileUpload.fileUpload(document.getElementById('wallpaperImage').files[0], (err, res) => {
                if (err) {
                    setIsDisabled(false)
                    toastr.error('Error in image upload')
                } else {
                    data['image'] = res
                    addEditFn(data)
                }
            })
        } else addEditFn(data)
    }

    const pageCount = Math.ceil(total / pagination.limit)

    return (
        <div className="wallpaper-page">
            <BreadCrumb page={'Wallpapers'} />
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-xl-3">
                                <div className="search-box-wrapper position-relative">
                                    <input type="text" className="form-control search-input" placeholder="Search here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                    <span className="search-icon"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div className="col-sm-6 ol-md-6 col-xl-2 mt-sm-0 mt-3">
                                <div className="select-outer">
                                    <select name="categoryId" className="form-control" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                                        <option value="">Select category</option>
                                        {categories.map(category => (
                                            <option key={category?._id || ''} value={category?._id || ''}>{category?.name || ''}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xl-7 mt-xl-0 mt-3 text-xl-end">
                                <button className="btn btn-primary action-button" onClick={(event) => addEditWallpaperFn(event)}><i className="fa fa-plus me-2"></i> Add Wallpaper</button>
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
                                            <th>Category</th>
                                            <th>Created At</th>
                                            <th width="150">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wallpapers.length > 0 ?
                                            wallpapers.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item.name}</td>
                                                    <td>{item?.categoryId?.name || ''}</td>
                                                    <td>{moment(item.createdAt).format('DD MMM YYYY h:mm A')}</td>
                                                    <td>
                                                        <button className="btn btn-primary btn-edit" onClick={(event) => addEditWallpaperFn(event, item)}><i className="fa fa-pencil"></i></button>
                                                        <button className="btn btn-primary btn-remove" onClick={(event) => deleteWallpaperFn(event, item._id)}><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center">No wallpaper found</td>
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
                    <div className="modal fade slide-right action-modal" id="modalAddEditWallpaper" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                                <input type="text" className="form-control" name="name" value={wallpaper.name} onChange={(e) => setWallpaper({ ...wallpaper, name: e.target.value })} placeholder="Enter Name" required />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Image</label>
                                                <input type="file" className="d-block w-100" name="image" onChange={handleFileChange} id="wallpaperImage" accept="image/*" />
                                                {wallpaper.image && (
                                                    <div className="position-relative mt-4">
                                                        <img src={wallpaper.image} alt="Image" className="img-fluid" width="80" />
                                                        <span className="ml-1 icon-remove" onClick={removeImage}>
                                                            <i className="fa fa-times pointer text-danger" />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Category</label>
                                                <div className="select-outer">
                                                    <select name="categoryId" className="form-control" onChange={(e) => setWallpaper({ ...wallpaper, categoryId: e.target.value })} value={wallpaper.categoryId} required>
                                                        <option value="">Select Category</option>
                                                        {categories.map((category) => {
                                                            return <option key={category._id} name={category.name} value={category._id}>{category.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <input
                                                    type="checkbox"
                                                    name="isFeatured"
                                                    className="form-check-input"
                                                    onChange={(e) => setWallpaper({ ...wallpaper, isFeatured: e.target.checked })}
                                                    checked={wallpaper.isFeatured}
                                                />
                                                <label className="form-check-label ms-3">Is Featured?</label>
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

export default Wallpaper
