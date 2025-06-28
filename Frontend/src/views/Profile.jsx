import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
  .then(({ data }) => setDeveloper({ ...data.user }))
      .catch((error) => {
        console.error("Error en getDeveloperData:", error, error.response)
        alert(error?.response?.data?.message || "Error desconocido")
        const status = error.response?.status
        const message = error.response?.data?.message
        console.error(message)
        if (status === 401 || message === "Token inválido o expirado") {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
          navigate('/')
        } else {
          window.alert(message || "Error al obtener datos del perfil")
        }
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  )
}

export default Profile