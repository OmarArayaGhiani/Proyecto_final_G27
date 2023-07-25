import { useState, useContext } from "react"
import Context from "../MyContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {
  const { setUsuario } = useContext(Context)
  const navigate = useNavigate()
  const [usuario, setUsuarioLocal] = useState({})

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {}
    field[name] = value
    setUsuarioLocal({ ...usuario, ...field })
  }
  const iniciarSesionFake = async () => {
    const { email, password } = usuario
    if (!email || !password) return alert("Email y password obligatorias")
    navigate("/perfil")
  }
  const iniciarSesion = async () => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/login"
    const { email, password } = usuario
    try {
      if (!email || !password) return alert("Email y password obligatorias")
      
      const { data: token } = await axios.post(urlServer + endpoint, usuario)
      localStorage.setItem("token", token)
      setUsuario()
      navigate("/perfil")
    } catch {
      alert("🙁")
    }
  }

  const toRegistro = () => {
    navigate("/registro")
  }

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Correo electrónico</label>
        <input
          value={usuario.email}
          onChange={handleSetUsuario}
          type="email"
          name="email"
          className="form-control"
          placeholder="ejemplo@email.com"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Contraseña</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={iniciarSesionFake} className="btn btn-success mt-3">
          Iniciar Sesión
        </button>
      </div>
      <div className="d-flex justify-content-center">

        <div className="d-flex justify-content-center align-items-center">
          <p className="mt-3 me-2">¿No estás registrado?</p>
          <button onClick={toRegistro} className="btn btn-outline-success mt-3">Regístrate</button>
        </div>
      </div>
    </div>
  )
}
