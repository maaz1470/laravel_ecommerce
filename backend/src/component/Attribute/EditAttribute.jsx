import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import toastr from "toastr"
import 'toastr/build/toastr.css'
import { useParams } from "react-router-dom"
export default function EditAttribute(){
    const [attributeInfo, setAttributeInfo] = useState({
        name: ''
    })

    const {id} = useParams();


    const handleChange = (e) => {
        e.preventDefault();
        setAttributeInfo({
            ...attributeInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`/api/attributes/edit/${id}`).then(response => {
            if(response.data.status === 200){
                setAttributeInfo(response.data.attribute)
            }else if(response.data.status === 404){
                Swal.fire('404',response.data.message,'error')
            }
        })
    },[id]);

    const formSubmit = (e) => {
        e.preventDefault();
        
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.options.debug = false;

        axios.post('/api/attributes/update',attributeInfo).then(response => {
            if(response.data.status === 200){
                Swal.fire('Success',response.data.message,'success');
            }else if(response.data.status == 403){
                toastr.error(response.data.error)
            }else if(response.data.status === 401){
                response.data.errors.forEach(el => {
                    toastr.error(el)
                })
                
            }
        }).catch(error => {
            if(error.response.status === 500){
                Swal.fire('Error',error.response.data.message,'error')
            }
        })

    }

    return (
        <>
            <h2
              className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              Edit Attribute
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
                        value={attributeInfo.name}
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Attributes Name"
                    />
                </label>


                <button className="px-3 py-2 rounded bg-green-600 text-white text-md mt-5" type="submit">Submit</button>
                
                </div>
            </form>
        </>
    )
}