const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const format = require("pg-format");


const pool = new Pool({
    host: process.env.HOST || "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true,
    port: 5432,
  });  
  const verificarCredenciales = async (email, password) => {
    try {
      const values = [email];
      const consulta = "SELECT * FROM usuarios WHERE email = $1";
      const {rows: [usuario],rowCount,} = await pool.query(consulta, values);
      console.log("values: " + values);
      if (!rowCount)
        throw { code: 404, message: "Email o contraseña incorrecta" };
      const { password: passwordEncriptada } = usuario;
      const passok = bcrypt.compareSync(password, passwordEncriptada);
      if (!passok || !rowCount)
        throw { code: 404, message: "Email o contraseña incorrecta" };
    } catch (error) {
      throw { code: 500, message: error.message };
    }
  };
  
  const registrarUsuario = async (usuario) => {
    try {
      let { email, password, rol, lenguage } = usuario;
  
      const passwordEncriptada = bcrypt.hashSync(password, 10);
      console.log(passwordEncriptada);
      password = passwordEncriptada;
  
      const values = [email, passwordEncriptada, rol, lenguage];
      const consulta = "insert into usuarios values (default, $1,$2, $3,$4)";
      const { rowCount } = await pool.query(consulta, values);
      if (!rowCount) throw { code: 404, message: "No se agregó el usuario" };
    } catch (error) {
      console.log("error:" + error);
      throw { code: 500, error };
    }
  };
  const verificarUsuario = async (email) => {
    try {
      const values = [email];
      const consulta = "SELECT * FROM usuarios WHERE email = $1";
      const { rowCount } = await pool.query(consulta, values);
      if (!rowCount) return 0;
    } catch (error) {
      return 1;
    }
  };
  
  const ConvencionHATEOAS = (movies) => {
    const results = movies.map((m) => {
      return {
        id:m.id,        
        titulo: m.titulo,
        precio:m.precio,
        director:m.director,
        agno:m.agno,
        titulo_alt:m.titulo_alt,
        href: `/pelicula/${m.id}`,
      };
    });
    //.slice(0, totalJoyas);
    const total = movies.length;    
    const HATEOAS = {
      total,
      results,
    };
    return HATEOAS;
  };

  const GetMovies = async (param) => {
    try {                        
        let filtros=[];

        if(param.idcategoria > 0) filtros.push(`idcategoria = ${param.idcategoria}`);
        if(param.agno > 0) filtros.push(`agno = ${param.agno}`);
        if(param.titulo) filtros.push(`titulo like '%${param.titulo}%'`);
        if(param.director) filtros.push(`director like %${param.director}%`);

        const [order1, order2] = param.orderby.split(",");
        const [campo, direccion] = order1.split("_");
        const [campo2, direccion2] = order2.split("_");
        
        const offset = (param.page - 1) * param.limit;
        let qry = "SELECT id,titulo,precio,stock,director,agno,titulo_alt,SUBSTRING (s.sinopsis,1,60) || '...' as sinopsis"
        +" FROM pelicula p"
        +" LEFT JOIN pelicula_sinopsis s ON p.id = s.idpelicula";
        if(filtros.length>0){
            filtros=filtros.join(" AND ")
            qry+=` WHERE ${filtros}`
        }
        qry+=` order by ${campo} ${direccion},${campo2} ${direccion2} OFFSET ${offset} LIMIT ${param.limit}`
        
        const { rows: movies } = await pool.query(qry);
        return movies;
      } catch (error) {
        throw { code: 404, message: error.message };
      }
    
  };

  const GetMovie = async (id) => {
    try {              
        const value = [id];
        const qry ="SELECT id,titulo,precio,idcategoria,stock,director,agno,titulo_alt" 
        + " FROM pelicula WHERE id = $1"                                  
        const { rows: movies } = await pool.query(qry,value);        
        return movies;
      } catch (error) {
        throw { code: 404, message: error.message };
      }
    
  };
  
  const GetReparto = async (id) => {
    try {              
        const value = [id];
        const qry ="SELECT idpelicula,actor,rol FROM reparto WHERE idpelicula = $1"                                  
        const { rows: reparto } = await pool.query(qry,value);        
        return reparto;
      } catch (error) {
        throw { code: 404, message: error.message };
      }
    
  };

  const GetCategorias2 = async () => {
    try {                      
        const qry ="SELECT idcategoria,nombre FROM categoria WHERE activo = true ORDER BY nombre"
        const { rows: categories } = await pool.query(qry);        
        return categories;
      } catch (error) {
        throw { code: 404, message: error.message };
      }
    
  };

  const GetCategorias = async () => {
    try {                      
        const qry ="select c.idcategoria as ID, c.nombre || ' (' || count(c.nombre) || ')' as Categoria"
        +" from pelicula p"
        +" inner join categoria c on p.idcategoria = c.idcategoria"
        +" group by c.nombre,c.idcategoria"
        +" order by c.nombre";
                
        const { rows: categories } = await pool.query(qry);        
        return categories;
      } catch (error) {
        throw { code: 404, message: error.message };
      }
    
  };
  const deleteUsuario = async (id) => {
    const consulta = "DELETE FROM usuarios WHERE id = $1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount)
      throw { code: 404, message: "No se encontró ningún usuario con id $1" };
  };
  
  const updateUsuario = async (id, body) => {
    try {
      const { rol, lenguage } = body;
      const values = [rol, lenguage, id];
  
      //Query parametrizada
      const qry = "UPDATE usuarios SET rol = $1,lenguage = $2 WHERE id = $3";
  
      const { rowCount } = await pool.query(qry, values);
      if (!rowCount)
        throw { code: 404, message: `No existe usuario con id ${id}` };
    } catch (error) {
      console.log("error:" + error);
      throw { code: 500, error: error.message };
    }
  };
  
  const updatePaswword = async (id, body) => {
    try {
      const { password } = body;
      const values = [id];
  
      const qry = "SELECT id FROM usuarios WHERE id = $1";
      const { rowCount } = await pool.query(qry, values);
      if (!rowCount)
        throw {
          code: 404,
          message: `No se encontró ningún usuario con id ${id}`,
        };
      else {
        const passwordEncriptada = bcrypt.hashSync(password, 10);
        const values = [passwordEncriptada, id];
        const qry = "UPDATE usuarios SET password = $1 WHERE id = $2";
        const { rowCount } = await pool.query(qry, values);
      }
    } catch (error) {
      console.log("error:" + error);
      throw { code: 500, error: error.message };
    }
  };
  
  module.exports = {
    verificarCredenciales,
    registrarUsuario,
    verificarUsuario,
    GetMovie,
    GetMovies,
    deleteUsuario,
    updateUsuario,
    updatePaswword,
    ConvencionHATEOAS,
    GetCategorias,
    GetReparto
  };
  