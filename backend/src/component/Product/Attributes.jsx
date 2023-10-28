import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
export default function Attributes(props){
    const [inputField, setInputField] = useState([
        {
            name: '',
            email: ''
        }
    ])
    const {attribute,changeAttribute} = props;

    console.log(attribute)
    
    const deleteAttributeInput = (e) => {
        e.preventDefault();
        e.target.closest('div').remove()
    }

    const addAttributeValue = (e,index) => {
        e.preventDefault();
        const newData = {
            name: '',
            value: ''
        }
        if(index >= 0 && index < attribute.length){
                attribute.map((data) => {
                    return data.field = [
                            {
                                ...attribute[index].field,
                                newData
                            }
                        ]
                    
                })
                console.log(attribute)
            changeAttribute([
                attribute
            ])
        }else{
            console.log('index not found', index)
        }
        console.log(attribute)
    }






    return (
        <>
            {
                attribute.map((el,indexNumber) => (
                    <label className="block text-sm" key={indexNumber}>
                        <span className="text-gray-700 dark:text-gray-400 font-bold text-xl">{el.label}</span>
                        
                            {
                                el.field.map((els,indexs) => {
                                    return (
                                        <div key={indexs} className="flex justify-between gap-2 items-center">
                                            <input
                                                name="attributes[]"
                                                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                                placeholder={`name value`}
                                            />
                                            <input
                                                name="attributes[]"
                                                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                                placeholder={`name value`}
                                            />
                                            <button type="button" onClick={deleteAttributeInput}><FontAwesomeIcon icon={faTrash} className="text-white" /></button>
                                        </div>
                                    )
                                })
                            }
                            
                            <button type="button" onClick={(e) => addAttributeValue(e, indexNumber)} className="block text-sm bg-green-500 text-white py-1 text-center rounded w-full my-3">Add Value <FontAwesomeIcon icon={faPlus} /></button>
                    </label>
                ))
            }
        </>
    )
}