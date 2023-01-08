import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useEffect} from 'react'

const Dashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expired, setExpired] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
        // getUsers()
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token')
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setName(decoded.name)
            setExpired(decoded.exp)
        } catch (error) {
            //jika user gaada kredensial
            if (error.response) {
                if (error.response) {
                    navigate('/')
                }
            }
        }
    }

    //pake interceptor nya
    const axiosJWT = axios.create()

    //validasi token sblm action (agar token selalau ada walo ga refresh)
    axiosJWT.interceptors.request.use(
        async config => {
            const currentDate = new Date()
            if (expired * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token')
                config.headers.Authorization = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken)
                const decoded = jwt_decode(response.data.accessToken)
                setName(decoded.name)
                setExpired(decoded.exp)
            }
            return config
        },
        error => {
            return Promise.reject(error)
        },
    )

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setUsers(response.data)
        console.log(response.data)
    }

    return (
        <div className='container mt-5'>
            <h1>Welcome Back : {name}</h1>
            <button onClick={() => getUsers()} className='button is-info mt-4'>
                Get Users
            </button>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
