CREATE DATABASE Like_Me;

/c Like_Me

CREATE TABLE posts(
    id SERIAL, 
    titulo VARCHAR(25), 
    img VARCHAR(1000),
    descripcion VARCHAR(255), 
    likes INT);
