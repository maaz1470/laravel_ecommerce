import { useEffect, useState } from "react";
import { Navigate, Routes, redirect, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
export default function PrivateRoute({children}){
    const [user, setUser] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        
        axios.get('/api/checkAuthentication').then(response => {
            if(response.data.status == 200){
                setUser(true)
                setLoading(false)
            }
        }).catch(err => {
            if(err.response.status == 401){
                setUser(false)
                setLoading(false)
            }
        })

        if(!loading){
            if(!user && !((location.pathname == '/auth/login') || (location.pathname == '/auth/register'))){
                return navigate('/auth/login',{
                    replace: true
                })
            }else if(user && (location.pathname == '/auth/register' || location.pathname == '/auth/login')){
                return navigate('/admin',{
                    replace: true
                });
            }
        }
    },[user,loading])

    if(loading){
        return '';
    }

    // console.clear();


    return <Routes>{children}</Routes>;
}