import { useContext, useState, useEffect } from "react"
import Context from "../MyContext"
import axios from "axios"
import {Link} from "react-router-dom"
import {useLocation} from 'react-router-dom';
import "../css/css-views/perfil.css"

export default function Perfil() {
  const { carrito, setUsuario: setUsuarioGlobal } = useContext(Context)

  const location = useLocation();
  const [usuario, setUsuarioLocal] = useState({})
  
  const getUsuarioData = async () => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/usuarios"
    const token = localStorage.getItem("token")
    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      })
      setUsuarioGlobal(data)
      setUsuarioLocal(data)
    } catch { }
  }

  useEffect(() => {
    getUsuarioData()
    ActivateSeccion()
  }, [])

  const ActivateSeccion = () => {
    if (location.state && location.state.section === "historial") {
      activeSectionHistorial()
    } else {
      activeSectionDatos()
    }
  }

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

          <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
            <div className="form-group mt-1 ">
              <label>Correo electrónico</label>
              <input
                value="email@gmail.com"
                type="email"
                name="email"
                readonly
                className="form-control"
                placeholder="ejemplo@email.com"
              />
            </div>
            <div className="form-group mt-1 ">
              <label>Nombre</label>
              <input
                value="Nombre"
                type="text"
                readonly
                name="name"
                className="form-control"
                placeholder="Nombre completo"
              />
            </div>
            <div className="form-group mt-1 ">
              <label>Dirección</label>
              <input
                value="Calle #1234"
                type="text"
                readonly
                name="address"
                className="form-control"
                placeholder="Ingrese dirección"
              />
            </div>
            <div className="form-group mt-1 ">
              <label>Teléfono</label>
              <input
                value="5691234567"
                type="number"
                readonly
                name="phone"
                className="form-control"
                placeholder="912364567"
              />
            </div>
          </div>
        </div>
        <div
          id="historial"
          className="section customSection border rounded-bottom row"
        >
          {carrito.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((element, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{element.id}</th>
                      <td>{element.name}</td>
                      <td>{element.price}</td>
                      <td>{element.cantidad}</td>
                    </tr>

                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="carrito-vacio">
              <h3>El historial de compras está vacío</h3>
              <p>
                ¡Haz click{" "}
                <Link to="/" className="link-carrito-vacio">
                  aquí
                </Link>{" "}
                para comprar tus péliculas favoritas!
              </p>
            </div>)}

        </div>
      </div>
    </div>
  )
}
