import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import toastr from "toastr"
import 'toastr/build/toastr.css'
import { WithContext as ReactTags } from "react-tag-input"
import Select from "react-select"
import Attributes from "./Attributes"
export default function AddProduct(){
    const [productInfo, setProductInfo] = useState({
        name: '',
        price: '',
        s_desc: '',
        attributes: []
    })
    const [attributes, setAttributes] = useState([])

    const [categories, setCategories] = useState([])

    const [subCategories, setSubCategories] = useState([]);

    const [subSubCategories, setSubSubCategories] = useState([]);

    const [options, setOptions] = useState([]);

    // const [loading, setLoading] = useState(true)

    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleCategory = (e,status) => {
        let id = e.target.value;
        if(e.target.value != 0){
            if(status == 'category'){
                axios.get(`/api/products/sub-category/${id}`).then(response => {
                    console.log(response)
                    setSubCategories(response.data.subcategories)
                }).then(error => {
                    if(error != undefined){
                        if(error.response.status === 500){
                            Swal.fire('Error',error.response.data.message,'error')
                        }else{
                            Swal.fire('Error',error.response.data.message,'error')
                        }
                    }
    
                })
            }else if(status == 'subcategory'){
                axios.get(`/api/products/sub-sub-category/${id}`).then(response => {
                    console.log(response)
                    setSubSubCategories(response.data.subSubCategories)
                }).then(error => {
                    if(error != undefined){
                        if(error.response.status === 500){
                            Swal.fire('Error',error.response.data.message,'error')
                        }else{
                            Swal.fire('Error',error.response.data.message,'error')
                        }
                    }
    
                })
            }
        }else{
            setSubCategories([])
            setSubSubCategories([])
        }
    }

    useEffect(() => {
        axios.get('/api/products/get-categories').then(response => {
            setCategories(response.data.categories)
            setDisabled(false)
        }).catch(error => {
            if(error.response.status === 500){
                Swal.fire('Error',error.response.data.message,'error')
            }else{
                Swal.fire('Error',error.response.data.message,'error')
            }
            setDisabled(false)
        })
        axios.get('/api/products/getAttributes').then(response => {
            setOptions(response.data.attributes)
        }).catch(error => {
            console.log(error)
        });
    },[])

    const formSubmit = (e) => {
        e.preventDefault();

        setDisabled(true)
        
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.options.debug = false;

        axios.post('/api/brands/add',productInfo).then(response => {
            setDisabled(false)
            if(response.data.status === 200){
                Swal.fire('Success',response.data.message,'success');
                setBrandInfo({
                    ...productInfo,
                    name: ''
                })
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

    const handleAttributes = (e) => {
        console.log('something')
        const data = e;
        const defaultData = {
            name: '',
            value: ''
        }
        data.map((el) => {
            return el.field = [
                defaultData
            ];
        })
        setAttributes([
            data
        ])
    }

    // console.log(attributes)

    


    
    // if(loading){
    //     return '';
    // }

    return (
        <>
            <h2
              className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              Add Product
            </h2>

            {/* General elements */}
            <form action="" onSubmit={formSubmit}>
                <div
                className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Title</span>
                    <input
                        name="name"
                        onChange={handleChange}
                        value={productInfo.name}
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Product Title"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Price</span>
                    <input
                        name="name"
                        onChange={handleChange}
                        value={productInfo.name}
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Price"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Short Description</span>
                    <textarea
                        name="name"
                        onChange={handleChange}
                        value={productInfo.name}
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Short Description"
                    />
                </label>
                <div className="flex justify-between gap-2">
                    <label className="block w-full mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                        Select Category
                        </span>
                        <select
                            name="status"
                            onChange={(e) => handleCategory(e,'category')}
                            value={productInfo.status}
                            className="w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        >
                            <option value="0">Select Category</option>
                            {
                                categories.toReversed().map((el,index) => (
                                    <option key={index} value={el.id}>{el.name}</option>
                                ))
                            }
                        
                        </select>
                    </label>
                    <label className="w-full mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                        Sub Category
                        </span>
                        <select
                            name="status"
                            onChange={(e) => handleCategory(e,'subcategory')}
                            value={productInfo.status}
                        className="w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        >
                            <option value="0">Select Category</option>
                            {
                                subCategories.toReversed().map((el,index) => (
                                    <option key={index} value={el.id}>{el.name}</option>
                                ))
                            }
                        
                        </select>
                    </label>
                    <label className="w-full mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                        Sub Sub Category
                        </span>
                        <select
                            name="status"
                            onChange={handleCategory}
                            value={productInfo.status}
                        className="w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        >
                            <option value="0">Select Category</option>
                            {
                                subSubCategories.toReversed().map((el,index) => (
                                    <option key={index} value={el.id}>{el.name}</option>
                                ))
                            }
                        
                        </select>
                    </label>
                </div>

                
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Attribute</span>
                    <Select options={options} isMulti onChange={handleAttributes} />
                </label>

                
                {Array.isArray(attributes[0]) && <Attributes attribute={attributes[0]} changeAttribute={setAttributes} />}                    
                


                <button disabled={disabled} className="px-3 py-2 rounded bg-green-600 text-white text-md mt-5" type="submit">Submit</button>
                
                </div>
            </form>
        </>
    )
}