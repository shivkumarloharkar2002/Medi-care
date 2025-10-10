import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom'
const PrivetRoute = ({children}) => {

// const user = localStorage.getItem("token")
const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to={"/login"} />
    }
    return children
}
export default PrivetRoute