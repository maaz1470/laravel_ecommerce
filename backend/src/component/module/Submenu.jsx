import Template from "./alpine/Template"
import Style from '../../assets/App.module.css'
import './../../assets/css/app.css'
export default function Submenu(){
    const isPagesMenuOpen = true;
    return (
        // <div dangerouslySetInnerHTML={{__html: alpineString}} className={Style.c_dw}></div>
        <>
          <ul
          className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          <li
            className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <a className="w-full" href="pages/login.html">Login</a>
          </li>
          <li
            className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <a className="w-full" href="pages/create-account.html">
              Create account
            </a>
          </li>
          <li
            className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 "
          >
            <a className="w-full c_dw_li" href="pages/forgot-password.html">
              Forgot password
            </a>
          </li>
          <li
            className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <a className="w-full" href="pages/404.html">404</a>
          </li>
          <li
            className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <a className="w-full" href="pages/blank.html">Blank</a>
          </li>
        </ul> 
        </>
    );
}