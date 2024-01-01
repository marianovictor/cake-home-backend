create database cakeHome;


create table users (
		id serial primary key,
  	name text not null,
  	email varchar(50) unique,
  	password varchar(8)
);

create table categories(
	id serial primary key,
  description text not null
);

create table products(
	id serial primary key,
  category_id integer not null,
  description text not null,
  price integer not null
);

create table cart(
	id serial primary key, 
  user_id integer not null, 
  products_id integer,
  total_price integer
);

insert into categories (description) values 
('Tortinha'),
('Bolo de pote'),
('Trufas'),
('Mousses'),
('Bolo caseiro'),
('Bolo de festa');


insert into products (category_id, description, price) values 
(1, 'Tortinha de Limão 120 ML', 8),
(1, 'Tortinha de Maracujá 120 ML', 8),
(1, 'Tortinha de Banoffe 120 ML', 8),
(2, 'Bolo de pote de Brigadeiro 220 ML', 12),
(2, 'Bolo de pote de Ninho com nutella 220 ML', 12),
(2, 'Bolo de pote de Doce de leite com abacaxi 220 ML', 12),
(3, 'Trufa de Morango', 3),
(3, 'Trufa de Brigadeiro', 3),
(3, 'Trufa de Tradicional branca', 3),
(4, 'Mousse de Chocolate', 7),
(4, 'Mousse de Chocolate branco', 7),
(4, 'Mousse de Ninho com nutella', 7),
(5, 'Bolo caseiro de Chocolate', 38),
(5, 'Bolo caseiro de Cenoura', 35),
(5, 'Bolo caseiro de Oncinha(mesclado)', 40),
(6, 'Bolo de Festa de Brigadeiro branco', 59),
(6, 'Bolo de Festa de Floresta negra', 72),
(6, 'Bolo de Festa Estupendo', 85)
;

alter table users add primary key (id);