import "../css/css-components/card.css"

import {AiOutlineShoppingCart} from "react-icons/ai"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import {useContext} from "react"
import {useNavigate} from "react-router-dom"
import MyContext from "../MyContext"

const MyCard = () => {
  const {movies, movieAdd} = useContext(MyContext)
  const navigate = useNavigate()

  const toSelectedMovie = (movieName) => {
    navigate(`/${movieName}`)
  }

  return (
    <div className="container">
      <div className="row mb-5">
        {movies.map((element) => {
          return (
            <div
              key={element.id}
              className="col-12 col-md-6 col-lg-4 col-xxl-3 mt-5"
            >
              <Card style={{width: "18rem"}} className="m-auto">
                <div onClick={() => toSelectedMovie(element.name)}>
                  <Card.Img variant="top" src={element.img} />
                </div>
                <Card.Body>
                  <div onClick={() => toSelectedMovie(element.name)}>
                    <Card.Title className="text-capitalize">
                      {element.name}
                    </Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-3">Género</Card.Subtitle>
                    <Card.Text className="text-capitalize mb-0">
                      {element.genre}
                    </Card.Text>
                    <hr />
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <p className="text-center fs-5">${element.price}</p>
                    <Button
                      onClick={() => movieAdd(element)}
                      variant="success"
                      className="text-light btn-flex"
                    >
                      Añadir
                      <AiOutlineShoppingCart className="btn-icon" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyCard
