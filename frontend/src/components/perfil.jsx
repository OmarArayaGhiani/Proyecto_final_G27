import {useContext, useState, useEffect} from "react"
import Context from "../MyContext"
import axios from "axios"

import "../css/css-views/perfil.css"

export default function Perfil() {
  const {setUsuario: setUsuarioGlobal} = useContext(Context)

  const [usuario, setUsuarioLocal] = useState({})

  const getUsuarioData = async () => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/usuarios"
    const token = localStorage.getItem("token")

    try {
      const {data} = await axios.get(urlServer + endpoint, {
        headers: {Authorization: "Bearer " + token},
      })
      setUsuarioGlobal(data)
      setUsuarioLocal(data)
    } catch {}
  }

  useEffect(() => {
    getUsuarioData()
    activeSectionDatos()
  }, [])

  const activeSectionDatos = () => {
    let datos = document.getElementById("datos")
    let historial = document.getElementById("historial")
    let botonDatos = document.getElementById("seccionDatos")
    let botonHistorial = document.getElementById("seccionHistorial")
    datos.style.display = "block"
    historial.style.display = "none"
    botonDatos.style.backgroundColor = "#198754"
    botonDatos.style.color = "white"
    botonHistorial.style.backgroundColor = "white"
    botonHistorial.style.color = "black"
  }

  const activeSectionHistorial = () => {
    let datos = document.getElementById("datos")
    let historial = document.getElementById("historial")
    let botonDatos = document.getElementById("seccionDatos")
    let botonHistorial = document.getElementById("seccionHistorial")
    datos.style.display = "none"
    historial.style.display = "block"
    botonDatos.style.backgroundColor = "white"
    botonDatos.style.color = "black"
    botonHistorial.style.backgroundColor = "#198754"
    botonHistorial.style.color = "white"
  }

  return (
    <div className="container">
      <div className="mx-4">
        <div className="row text-center border rounded-top">
          <h2 className="bg-success-subtle m-0 py-3">
            Bienvenido <span className="fw-bold">{usuario.name}</span>
          </h2>
        </div>
        <div className="row">
          <div
            id="seccionDatos"
            onClick={activeSectionDatos}
            className="customBtn col col-6 text-center border p-2"
          >
            <p className="">Mis datos personales</p>
          </div>
          <div
            id="seccionHistorial"
            onClick={activeSectionHistorial}
            className="customBtn col col-6 text-center border p-2"
          >
            <p className="">Historial de compras</p>
          </div>
        </div>
        <div id="datos" className="section border rounded-bottom row">
          datos personales
          <p>nombre</p>
            <p>correo</p>
        </div>
        <div
          id="historial"
          className="section customSection border rounded-bottom row"
        >
          historial compras
        </div>
      </div>
    </div>
  )
}
