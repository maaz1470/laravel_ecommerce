import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import toastr from "toastr"
import 'toastr/build/toastr.css'
import { useNavigate, useParams } from "react-router-dom"
export default function EditCategory(){
    const [categoryInfo, setCategoryInfo] = useState({
        name: '',
        url: '',
        status: 1
    })
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();

        setCategoryInfo({
            ...categoryInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`/api/categories/edit-category/${id}`).then(response => {
            if(response.data.status === 200){
                setCategoryInfo(response.data.category)
                setLoading(false)
            }else if(response.data.status === 404){
                Swal.fire('404 Error',response.data.message,'error')
                navigate('/admin/categories',{
                    replace: true
                })
            }else{
                Swal.fire('Error','Something went wrong. Please try again.')
            }
        })
    },[id])

    const formSubmit = (e) => {
        e.preventDefault();
        
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.options.debug = false;

        let data = {
            ...categoryInfo,
            id: id
        }

        axios.post('/api/categories/update-category',data).then(response => {
            console.log(response)
            if(response.data.status === 200){
                Swal.fire('Success',response.data.message,'success');
            }else if(response.data.status == 403){
                toastr.error(response.data.error)
            }else if(response.data.status === 401){
                response.data.errors.forEach(el => {
                    toastr.error(el)
                })
                
            }else if(response.data.status === 404){
                Swal.fire('Error',response.data.message,'error')
            }
        }).catch(error => {
            if(error.response.status === 500){
                Swal.fire('Error',error.response.data.message,'error')
            }
        })

    }

    if(loading){
        return '';
    }

    return (
        <>
            <h2
              className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              Edit Category
            </h2>

            {/* <!-- General elements --> */}
            <form action="" onSubmit={formSubmit}>
                <div
                className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        name="name"
                        onChange={handleChange}
                        value={categoryInfo.name}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Category Name"
                    />
                </label>

                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">URL</span>
                    <input
                        name="url"
                        onChange={handleChange}
                        value={categoryInfo.url}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Category Name"
                    />
                </label>


                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                    Status
                    </span>
                    <select
                        name="status"
                        onChange={handleChange}
                        value={categoryInfo.status}
                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    >
                    <option value="1">Published</option>
                    <option value="0">Unpublished</option>
                    </select>
                </label>

                    <button className="px-3 py-2 rounded bg-green-600 text-white text-md mt-5" type="submit">Submit</button>
                
                </div>
            </form>
        </>
    )
}