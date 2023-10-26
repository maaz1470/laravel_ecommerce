import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import { root } from '../../hook/useRootLocation';
export default function Brands(){
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true)
  

  const deleteBrand = (e,id) => {
    e.preventDefault();
    axios.post(`/api/brands/delete/${id}`).then(response => {
      if(response.data.status == 200){
        Swal.fire('Success',response.data.message,'success')
        e.target.closest('tr').remove()
      }else if(response.data.status === 404){
        Swal.fire('404',response.data.message,'error')
      }else{
        Swal.fire('Error','Something went wrong. Please try again.','error')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    axios.get('/api/brands').then(response => {
      if(response.data.status === 200){
        setAttributes(response.data.brands)
        setLoading(false)
      }
    }).catch(error => {
      if(error.response.status == 500){
        Swal.fire('Error',error.response.data.message,'error')
      }else{
        Swal.fire('Error',error.response.data.message,'error')
      }
    })
  },[])

  if(loading){
    return '';
  }
    return (
        <>
            <div className="flex justify-between items-center">
                <h2
                className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                >
                    All Brands
                </h2>
                <Link to="/admin/brands/add" className="bg-green-400 text-white px-3 py-2 h-max rounded text-md">Add Brand</Link>
            </div>

            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody
                    className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {
                      attributes.toReversed().map((el, index) => (
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
                                <img className='w-[100px]' src={`${root}/brand/${el.image}`} alt="" />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex justify-between w-1/3">
                                <Link to={`/admin/brand/edit/${el.id}`} className="bg-blue-600 px-3 py-2 rounded text-white"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                <a onClick={(e) => deleteBrand(e,el.id)} href="" className="bg-red-500 px-3 py-2 rounded text-white"><i className="fa fa-trash" aria-hidden="true"></i></a>
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