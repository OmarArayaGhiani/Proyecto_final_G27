const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");


const {  
    GetMovies,GetMovie,ConvencionHATEOAS,GetCategorias,GetReparto
 } = require("./queries");
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Escuchando por el puerto ${PORT}`))
app.use(cors());
app.use(express.json());

app.get("/peliculas",  async (req, res) => {
    try {        
      const movies = await GetMovies(req.query);
      //const conv = await ConvencionHATEOAS(movies);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/categorias",  async (req, res) => {
    try {        
      const categ = await GetCategorias();      
      res.json(categ);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/pelicula/:id",  async (req, res) => {
    try {                
       
      const movies = await GetMovie(req.params.id);
      //const hate = await prepararHATEOAS(joyas);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/reparto/:id",  async (req, res) => {
    try {                
       
      const movies = await GetReparto(req.params.id);
      //const hate = await prepararHATEOAS(joyas);    
      res.json(movies);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });