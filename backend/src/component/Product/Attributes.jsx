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
    const {count} = props;
    
    const deleteAttributeInput = (e) => {
        e.preventDefault();
        e.target.closest('div').remove()
    }
    const html = (
        <div className="flex justify-between gap-2 items-center">
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

    const addAttributeValue = (e) => {
        e.preventDefault();
        const insert = document.querySelector('#insert');
        insert.innerHTML = html;
    }





    return (
        <>
            {
                count.map((el,index) => (
                    <label className="block text-sm" key={index}>
                        <span className="text-gray-700 dark:text-gray-400 font-bold text-xl">{el.label}</span>
                        <div id="insert">
                            {
                                html
                            }
                        </div>
                            
                            <button type="button" onClick={addAttributeValue} className="block text-sm bg-green-500 text-white py-1 text-center rounded w-full my-3">Add Value <FontAwesomeIcon icon={faPlus} /></button>
                    </label>
                ))
            }
        </>
    )
}