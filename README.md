RESTful API for a restaurant built with express, nodejs and MySQL. 
Version: "1.0.0". 

It includes the following features:
- Customers actions:
	- Sing up
	- Log in
	- Delete user (only admin)
	- Get all customers list (only admin)
- Products list actions:
	- Get all products list
	- Create products (only admin)
	- Update existing products (only admin)
	- Delete products (only admin)
- Orders actions:
	- Place an order
	- Get an order
	- Get all orders list (only admin)
	- Update orders status (only admin)
	- Delete orders (only admin)	

/

RESTful API para un restuarante creado con express, nodejs y MySQL. 
Version: "1.0.0". 

Incluye las siguientes acciones:
- Acciones de clientes:
	- Registrarse
	- Ingresar
	- Borrar usuario (solo administrador)
	- Acceder al listado completo de usuarios (solo administrador)
- Acciones de lista de productos:
	- Acceder al listado completo de productos
	- Crear productos (solo administrador)
	- Actualizar productos existentes (solo administrador)
	- Borrar productos (solo administrador)
- Acciones de pedidos:
	- Realizar un pedido
	- Acceder a un pedido
	- Acceder al listado completo de pedidos (solo administrador)
	- Actualizar el estado de un pedido (solo administrador)
	- Borrar pedidos (solo administrador)	

## PREREQUISITES / PRERREQUISITOS

- Node.js
- XAMPP control / MySQL

## DEPENDENCIES / DEPENDENCIAS

- Express (npm install express)
- Body-parser (npm install body-parser)
- Cors (npm install cors)
- Sequelize (npm install sequelize)
- Jsonwebtoken (npm install jsonwebtoken)
- MySQL2 (npm install mysql2)

## GETTING STARTED / EMPEZANDO

1. Clone the repo / Cloná el repo:

```
git clone https://github.com/rxfar/Delilah-Resto---Acamica.git
```

2. Install dependencies / Instalá las dependencias

3. Create your database. You'll find queries information in "delilahdb.sql" file / Creá tu base de datos. Podés encontrar la información de las queries requeridas en el archivo "delilahdb.sql".

4. Run your server! / Corré el servidor!

```
node delilah.js
```

Expected result is: / El resultado esperado es:

Server running on port 3001
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.

## ENDPOINTS

You'll find APIs requests in documentation file "DelilahResto-1.0.0-Documentation.yaml"/"DelilahResto-1.0.0-Documentation.json". You'll also find requests tests in "DelilahResto.postman_collection.json" file.

/ 

Podés encontrar los requests de la API en el archivo de documentación "DelilahResto-1.0.0-Documentation.yaml"/"DelilahResto-1.0.0-Documentation.json". También podés encontrar tests de los requests en el archivo "DelilahResto.postman_collection.json".
