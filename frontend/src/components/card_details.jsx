import "../css/css-components/card_details.css"

import {AiOutlineShoppingCart} from "react-icons/ai"

import Button from "react-bootstrap/Button"

import {useParams} from "react-router-dom"
import {useContext} from "react"
import MyContext from "../MyContext"

const CardDetails = () => {
  const {movies, movieAdd} = useContext(MyContext)
  const {selectedMovie} = useParams()

  return (
    <div>
      {movies.map((element) => {
        if (selectedMovie === element.name)
          return (
            <div>
              <div key={element.id} className="details-card-flex">
                <div className="img-details">
                  <img src={element.img} alt="" />
                </div>
                <div className="m-3">
                  <div className="d-flex justify-content-between">
                    <h2>{element.name}</h2>
                    <h2>Puntuación</h2>
                  </div>
                  <hr />
                  <p>{element.sinopsis}</p>
                  <hr />
                  <p className="fw-bold">Género</p>
                  <p>{element.genre}</p>
                  <hr />
                  <div className="price-add">
                    <p className="fw-bold">
                      Precio: $<span>{element.price}</span>
                    </p>
                    <Button
                      onClick={() => movieAdd(element)}
                      variant="success"
                      className="add text-light btn-flex"
                    >
                      Añadir
                      <AiOutlineShoppingCart className="btn-icon" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3 coments">
                <p>Comentarios</p>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  voluptates? Fugiat necessitatibus nostrum ea natus enim animi
                  sint odit eius dolores.
                </p>
              </div>
              <div className="mt-3 mb-5 p-3 coments">
                <div className="d-flex justify-content-between">
                  <p>Valora y/o deja tu comentario</p>
                  <p>Puntúa *insertar estrellitas"*</p>
                </div>
                <hr />
                <input type="text" className="user-coment" />
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default CardDetails
