import "../css/css-components/table_carrito.css"

import {Button} from "react-bootstrap"

import {useContext} from "react"
import {Link} from "react-router-dom"
import MyContext from "../MyContext"
import { useNavigate } from "react-router-dom"

const TableCarrito = () => {
  const {carrito, price, movieAdd, movieRemove} = useContext(MyContext)
  const navigate = useNavigate()

  const historialCompra = async () => {
    navigate("/perfil?nav=historial",{state:{section:"historial"}})
  }

  if (price > 0)
    return (
      <div className="carrito">
        <h3>Detalles del pedido:</h3>
        <div className="items">
          {carrito.map((element, index) => {
              return (
                <div key={index}>
                  <div className="item">
                    <div className="d-flex align-items-center">
                      <img src={element.img} alt={element.name} />
                      <p className="ms-2 me-3">X{element.cantidad}</p>
                      <p>{element.name}</p>
                    </div>
                    <div className="price-section">
                      <div className="me-3">
                        <p className="text-end">
                          Valor unitario
                          <span className="ms-2">${element.price.toLocaleString('es-CL')}</span>
                        </p>
                        <p className="text-end">
                          Total unitario:
                          <span className="ms-2">
                            ${(element.cantidad * element.price).toLocaleString('es-CL')}
                          </span>
                        </p>
                      </div>
                      <Button
                        onClick={() => movieAdd(element)}
                        variant="success"
                        className="add-remove"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => movieRemove(element, index)}
                        variant="danger"
                        className="add-remove"
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              )
          })}
          <div className="buy">
            <p className="total-price">
              Total: $<span>{price.toLocaleString('es-CL')}</span>
            </p>
            <Button onClick={historialCompra} variant="success" className="buy-btn">
              Pagar
            </Button>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className="carrito-vacio">
        
        <h3>El carrito está vacío</h3>
        <p>
          ¡Haz click{" "}
          <Link to="/" className="link-carrito-vacio">
            aquí
          </Link>{" "}
          para comprar tus péliculas favoritas!
        </p>
      </div>
    )
}

export default TableCarrito
