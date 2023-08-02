DROP DATABASE tienda_peliculas;

CREATE DATABASE tienda_peliculas;

\c tienda_peliculas

CREATE TABLE IF NOT EXISTS peliculas
(
    id SERIAL,
    titulo VARCHAR NOT NULL,
    precio INT NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    director VARCHAR(100) NOT NULL,
    agno INT NOT NULL,
    sinopsis VARCHAR NOT NULL,
    img VARCHAR NOT NULL,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS usuarios
(
    id SERIAL,
    mail VARCHAR (100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    activo boolean DEFAULT true,
    direccion VARCHAR(200) NOT NULL,
    fono VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS usuario_compra
(
    idpelicula INT NOT NULL,
    idusuario INT NOT NULL,
    fecha_compra DATE,
    cantidad INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS usuario_pelicula
(
    idpelicula INT NOT NULL,
    idusuario INT NOT NULL,
    comentario VARCHAR,
    puntuacion INT DEFAULT 0
);

ALTER TABLE usuario_compra ADD FOREIGN KEY (idpelicula) REFERENCES peliculas(id);
ALTER TABLE usuario_compra ADD FOREIGN KEY (idusuario) REFERENCES usuarios(id);
ALTER TABLE usuario_pelicula ADD FOREIGN KEY (idpelicula) REFERENCES peliculas(id);
ALTER TABLE usuario_pelicula ADD FOREIGN KEY (idusuario) REFERENCES usuarios(id);

INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'el señor de los anillos: la comunidad del anillo', 10000, 'fantasia', 'peter jackson', 2001, 'Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.', 'https://pics.filmaffinity.com/El_seanor_de_los_anillos_La_comunidad_del_anillo-744631610-large.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'el señor de los anillos: las dos torres', 11000, 'fantasia', 'peter jackson', 2002, 'Gollum guía a Frodo y Sam a Mordor mientras Aragorn y sus compañeros defienden a Rohan del bestial ejército de Saruman.', 'https://es.web.img3.acsta.net/medias/nmedia/18/89/85/69/20070008.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'indiana jones y el templo de la perdición', 12000, 'aventura', 'steven spielberg', 1984, 'Indiana Jones, tras un conflicto nocturno, escapa junto a una cantante y su joven acompañante. Los tres acaban en la India, donde intentarán ayudar a los habitantes de un pequeño poblado, cuyos niños han sido raptados.', 'https://gcdn.emol.cl/los-80/files/2022/01/Indiana_Jones_y_el_templo_de_la_perdici%C3%B3n.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'avatar', 15000, 'ciencia ficción', 'james cameron', 2009, 'En un exuberante planeta llamado Pandora viven los Navi, seres que aparentan ser primitivos pero que en realidad son muy evolucionados. Debido a que el ambiente de Pandora es venenoso, los híbridos humanos/Navi, llamados Avatares, están relacionados con las mentes humanas, lo que les permite moverse libremente por Pandora. Jake Sully, un exinfante de marina paralítico se transforma a través de un Avatar, y se enamora de una mujer Navi.', 'https://pics.filmaffinity.com/Avatar-265462659-large.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'el origen', 13000, 'ciencia ficción', 'christopher nolan', 2010, 'Dom Cobb (Leonardo DiCaprio) es un ladrón con una extraña habilidad para entrar a los sueños de la gente y robarle los secretos de sus subconscientes. Su habilidad lo ha convertido en un atractivo en el mundo del espionaje corporativo, pero ha tenido un gran costo en la gente que ama.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'la isla siniestra', 10000, 'suspenso', ' martin scorsese', 2010, 'Un alguacil de los años cincuenta persigue a una asesina que escapó de un sanatorio en una isla remota, y hay pistas de hechos macabros cometidos en su interior.', 'https://static.wikia.nocookie.net/doblaje/images/6/6d/Poster1_309.jpg/revision/latest?cb=20160913195148&path-prefix=es');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'oppenheimer', 20000, 'drama', 'christopher nolan', 2023, 'El físico J Robert Oppenheimer trabaja con un equipo de científicos durante el Proyecto Manhattan, que condujo al desarrollo de la bomba atómica.', 'https://assets-prd.ignimgs.com/2022/07/21/oppenheimer-poster-1658411601593.jpeg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'barbie', 21000, 'comedia', 'greta gerwig', 2023, 'Después de ser expulsada de Barbieland por no ser una muñeca de aspecto perfecto, Barbie parte hacia el mundo humano para encontrar la verdadera felicidad.', 'https://es.web.img2.acsta.net/pictures/23/07/20/11/29/5479684.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'terminator', 15000, 'acción', 'james cameron', 1984, 'Un asesino cibernético del futuro es enviado a Los Ángeles para matar a la mujer que procreará a un líder.', 'https://m.media-amazon.com/images/I/81kdcihVINL._AC_UF1000,1000_QL80_.jpg');
INSERT INTO peliculas (id, titulo, precio, categoria, director, agno, sinopsis, img) VALUES (default, 'piratas del caribe: la maldición del perla negra', 10000, 'aventura', 'gore verbinski', 2003, 'El capitán Barbossa le roba el barco al pirata Jack Sparrow y secuestra a Elizabeth, amiga de Will Turner. Barbossa y su tripulación son víctimas de un conjuro que los condena a vivir eternamente y a transformarse cada noche en esqueletos vivientes.', 'https://es.web.img3.acsta.net/medias/nmedia/18/91/06/54/20129011.jpg');