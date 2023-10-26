import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
export default function SubSubCategories(){

  const [categoriesInfo, setCategoriesInfo] = useState([]);
  const [loading, setLoading] = useState(true)
  

  const deleteSubSubCategory = (e,id) => {
    e.preventDefault();
    axios.get(`/api/sub-sub-categories/delete/${id}`).then(response => {
      if(response.data.status == 200){
        Swal.fire('Success',response.data.message,'success')
        e.target.closest('tr').remove()
      }else if(response.data.status === 404){
        Swal.fire('404',response.data.message,'error')
      }else{
        Swal.fire('Error','Something went wrong. Please try again.')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    axios.get('/api/sub-sub-categories').then(response => {
      if(response.data.status === 200){
        setCategoriesInfo(response.data.categories)
        setLoading(false)
      }
    console.log(response)
    }).catch(error => {
      if(error.response.status == 500){
        Swal.fire('Error',error.response.data.message,'error')
      }else{
        Swal.fire('Error',error.response.data.message,'error')
      }
    })
  },[])



  // const statusChange = (e,status) => {
  //   e.preventDefault()
  //   axios.get(`/api/categories/change-status/${id}`).then(response => {

  //   })
  // }

  if(loading){
    return '';
  }

    return (
        <>
            <div className="flex justify-between items-center">
                <h2
                className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                >
                    All Sub Sub Categories
                </h2>
                <Link to="/admin/sub-sub-category/add" className="bg-green-400 text-white px-3 py-2 h-max rounded text-md">Add Sub Sub Category</Link>
            </div>

            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Parent Category</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {
                      categoriesInfo.toReversed().map((el, index) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              {/* <!-- Avatar with inset shadow --> */}
                              <div
                                className="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                              >
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">{el.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span
                              className="px-2 py-1 font-semibold leading-tight dark:text-gray-400 text-gray-700"
                            >
                              {el.parent_category.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <span
                              className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                            >
                              {el.status === 1 ? 'Published' : 'Unpublished'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex justify-between w-1/3">
                              {
                                el.status === 1 ? (
                                <a onClick={(e) => statusChange(e,0)} href="" className="bg-green-600 px-3 py-2 rounded text-white"><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></a>

                                ) : (
                                <a onClick={(e) => statusChange(e,1)} href="" className="bg-yellow-400 px-3 py-2 rounded text-white"><i className="fa fa-arrow-circle-down" aria-hidden="true"></i></a>

                                )
                              }
                                <Link to={`/admin/sub-sub-categories/edit/${el.id}`} className="bg-blue-600 px-3 py-2 rounded text-white"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                <a onClick={(e) => deleteSubSubCategory(e,el.id)} href="" className="bg-red-500 px-3 py-2 rounded text-white"><i className="fa fa-trash" aria-hidden="true"></i></a>
                            </div>
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
              
            </div>

            
        </>
    )
}