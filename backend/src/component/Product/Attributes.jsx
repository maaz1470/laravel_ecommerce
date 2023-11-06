import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

export default function Attributes(props) {
  const [inputField, setInputField] = useState([
    {
      name: '',
      email: ''
    }
  ]);

  const { attributes, changeAttribute } = props;


  

  const deleteAttributeInput = (e,parent, child) => {
    e.preventDefault();
    if (parent >= 0 && parent < attributes.length) {
        // console.log(updatedSelfAttribute)
        
        const remainingData = attributes.map((elem, indexs) => {
            if(parent == indexs){
                const something = elem.field.filter((el, index) => index !== child)
                return {...elem,field: something};
            }
            return elem;
        })

        console.log(remainingData)

        // const remainingData = attributes[parent].field.filter((el, index) => {
        //     return child !== index;
        // })

        changeAttribute(remainingData)


        

        


    } else {
      console.log('index not found', index);
    }
  };

  const addAttributeValue = (e, index) => {
    e.preventDefault();
    const newData = {
      name: '',
      value: 'akjdsf'
    };
    const updatedSelfAttribute = [...attributes];



    if (index >= 0 && index < attributes.length) {
        // console.log(updatedSelfAttribute)
      updatedSelfAttribute[index].field.push(newData);

      changeAttribute(updatedSelfAttribute);
    } else {
      console.log('index not found', index);
    }
  };

  const handleAttributeValue = (e) => {
    console.log(e)
  }

  return (
    <>
      {
        attributes.map((el, indexNumber) => (
          <label className="block text-sm" key={indexNumber}>
            <span className="text-gray-700 dark:text-gray-400 font-bold text-xl">{el.label}</span>

            {
              el.field.map((els, indexs) => (
                <div key={indexs} className="flex justify-between gap-2 items-center">
                  <input
                    name="attributes[]"
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder={`name value`}
                    value={els.value}
                    onChange={handleAttributeValue}
                  />
                  <input
                    name="attributes[]"
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="name value"
                  />
                  <button type="button" onClick={(e) => deleteAttributeInput(e,indexNumber, indexs)}>
                    <FontAwesomeIcon icon={faTrash} className="text-white" />
                  </button>
                </div>
              ))
            }

            <button type="button" onClick={(e) => addAttributeValue(e, indexNumber)} className="block text-sm bg-green-500 text-white py-1 text-center rounded w-full my-3">
              Add Value <FontAwesomeIcon icon={faPlus} />
            </button>
          </label>
        ))
      }
    </>
  );
}