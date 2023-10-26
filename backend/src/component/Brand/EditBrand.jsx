import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import toastr from "toastr"
import 'toastr/build/toastr.css'
import { useNavigate, useParams } from "react-router-dom"
import { root } from "../../hook/useRootLocation"
export default function EditBrand(){
    const [brandInfo, setBrandInfo] = useState({
        name: '',
        image: ''
    })
    const [image, setImage] = useState('')


    const [loading, setLoading] = useState(true)

    const {id} = useParams();

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setBrandInfo({
            ...brandInfo,
            [e.target.name]: e.target.value
        })
    }
    let defaultImage;


    useEffect(() => {
        axios.get(`/api/brands/edit/${id}`).then(response => {
            if(response.data.status === 200){
                setBrandInfo(response.data.brand)
                setImage(response.data.brand.image)
                setLoading(false)
                defaultImage = response.data.brand.image;
            }else if(response.data.status === 404){
                Swal.fire('404 Error',response.data.message,'error')
                navigate('/admin/brands',{
                    replace: true
                })
            }
        });
    },[id])

    
    const ImageHandler = (e) => {
        const previewImage = document.getElementById('previewImage');
        // console.log(e.target.files)
        previewImage.src = e.target.files.length == 1 ? URL.createObjectURL(e.target.files[0]) : ''
        e.target.files.length == 1 ? setImage(e.target.files) : setImage('')
        e.target.files.length == 1 ? setBrandInfo({
            ...brandInfo,
            image: e.target.files[0]
        }) : setBrandInfo({
            ...brandInfo,
            image: ''
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.options.debug = false;

        const data = new FormData();

        data.append('id',id)
        data.append('name',brandInfo.name)
        data.append('image',brandInfo.image)

        axios.post('/api/brands/update',data).then(response => {
            if(response.data.status === 200){
                Swal.fire('Success',response.data.message,'success');
            }else if(response.data.status == 403){
                toastr.error(response.data.error)
            }else if(response.data.status === 401){
                response.data.errors.forEach(el => {
                    toastr.error(el)
                })
            }
            // console.log(response)
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
              Edit Brand
            </h2>

            {/* <!-- General elements --> */}
            <form action="" onSubmit={formSubmit} encType="multpart/form-data">
                <div
                className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        name="name"
                        onChange={handleChange}
                        value={brandInfo.name}
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Brands Name"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Image</span>
                    <input
                        name="image"
                        onChange={ImageHandler}
                        type="file"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Brands Name"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Image</span>
                    <img src={image.length == 1 ? URL.createObjectURL(image[0]) : `${root}/brand/${image}`} id="previewImage" className="block m-auto w-[300px] mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray" alt="" />
                </label>


                <button className="px-3 py-2 rounded bg-green-600 text-white text-md mt-5" type="submit">Submit</button>
                
                </div>
            </form>
        </>
    )
}