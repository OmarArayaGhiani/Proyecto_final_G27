-- Crear database tienda_peliculas

CREATE DATABASE tienda_peliculas
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Crear tabla de categoria

CREATE TABLE IF NOT EXISTS public.categoria
(
    id serial,
    nombre text COLLATE pg_catalog."default",
    activo boolean,
    CONSTRAINT categoria_pkey PRIMARY KEY (id)
);

-- Creación de tabla pelicula

CREATE TABLE IF NOT EXISTS public.pelicula
(
    id serial,
    titulo text COLLATE pg_catalog."default" NOT NULL,
    precio integer DEFAULT 0,
    id_categoria integer,
    stock integer,
    director character varying(100) COLLATE pg_catalog."default",
    agno integer,
    titulo_alt character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT pelicula_pkey PRIMARY KEY (id),
    CONSTRAINT fk_pelicula_categoria FOREIGN KEY (id)
        REFERENCES public.categoria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pelicula_precio_check CHECK (precio >= 1000)
);

-- Crear tabla Reparto

CREATE TABLE IF NOT EXISTS public.reparto
(
    id_pelicula integer NOT NULL,
    actor character varying(100) COLLATE pg_catalog."default" NOT NULL,
    rol character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT reparto_pkey PRIMARY KEY (idpelicula, actor),
    CONSTRAINT "FK_pelicula_reparto" FOREIGN KEY (idpelicula)
        REFERENCES public.pelicula (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Crear tabla Usuario

CREATE TABLE IF NOT EXISTS public.usuario
(
    id serial,
    nombre character varying(100) COLLATE pg_catalog."default",
    activo boolean DEFAULT true,
    direccion character varying(200) COLLATE pg_catalog."default",
    fono character varying(20) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    password character varying(250) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
);

-- Crear tabla Usuario Compra

CREATE TABLE IF NOT EXISTS public.usuario_compra
(
    id_pelicula integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_compra date,
    cantidad integer DEFAULT 0,
    CONSTRAINT usuario_compra_pkey PRIMARY KEY (id_pelicula, id_usuario),
    CONSTRAINT "FK_usuario_compras" FOREIGN KEY (id_usuario)
        REFERENCES public.usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Crear tabla Usuario Pelicula

CREATE TABLE IF NOT EXISTS public.usuario_pelicula
(
    id_pelicula integer NOT NULL,
    id_usuario integer NOT NULL,
    comentario text COLLATE pg_catalog."default",
    puntuacion integer DEFAULT 0,
    fecha_publicacion date,
    CONSTRAINT usuario_pelicula_pkey PRIMARY KEY (id_pelicula, id_usuario),
    CONSTRAINT "FK_pelicula_usuario" FOREIGN KEY (id)
        REFERENCES public.pelicula (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);