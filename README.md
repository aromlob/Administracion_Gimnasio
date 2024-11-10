# Gimnasio_Grupo4

| Alumnos  | Fecha              | Asignatura     | Curso   |
| -------- | ------------------ | -------------- | ------- |
| Ángela  | Inicio: 07-11-2024 | Acceso a datos | 2º DAM |
| Santiago | Fin:               | Acceso a datos | 2º DAM |

# Explicación del proyecto

Queremos organizar la información de un gimnasio con las siguientes tablas:

1. **Cliente -->** El cliente tendra un **id** **único** y se almacenará su **nombre**, el **correo**, **fecha de registro** y **número de teléfono.** Cada cliente puede tener una o más **Planes de Membresía** por ende un cliente puede suscribirse a múltiples planes a lo largo del tiempo. Por último, cada cliente puede reservar varias **Sesiones**.
2. **Entrenador -->** El entrenador tendra un **id único** y se almacenará su **nombre**, una **especialidad** (como pesas, cardio, yoga, etc ) y el **nivel de experiencia**.
3. **Plan de Membresía -->** El plan de membresía tendrá un **id único** y se almacenará su **nombre del plan** (por ejemplo "Mensual Básico", "Anual Premiun"), una **duración en meses** y el **costo**.
4. **Sesion -->** Cada sesion tiene un **id único** y se alamacenara **fecha** y **hora de inicio**, y una **duración en minutos**. Cada sesión es atendida por **un solo entrenador** y **un solo cliente.**

# Configuración npm y creación package.json

Para instalar las dependencias del package.json, tenemos que introducir el siguente comando:

```bash
npm install express express-session mysql2 pug body-parser dotenv
```

¿Qué es cada cosa?

* **express** : servidor Web para nodeJS.
* **express-session** : gestiona sesiones (HTTP) entre el servidor Web/cliente web.
* **mysql2** : driver para conectar a mysql.
* **pug** : motor HTML.
* **body-parser** : para convertir los datos de un formulario (verbos GET y POST) en JSON.
* **dotenv** : para cargar archivos de configuración de entorno.

Para ejecutar el servicio lo hacemos mediante el comando:

```bash
node app.js
```

# ¿Cómo se ha generado la base de datos?

#### Archivo .env:

Para crear el docker hemos visto necesario crear el .env, el cual va a contener toda la información necesaria para el funcionamiento del docker.

En nuestro caso hemos elegido que tenga estos atributos:

```properties
MYSQL_ROOT_PASSWORD=jkb8kvhgcvhj7
MYSQL_USERNAME=root
MYSQL_PORT=33308
MYSQL_HOST=localhost
MYSQL_DATABASE=gym
ADMINER_PORT=8184
SERVICE_PORT=8000
```

#### Docker-compose:

Para generar el docker compose nos hemos ido a la pagina de **docker-hub ([docker_hub_adminer](https://hub.docker.com/_/adminer/))**  y hemos utilizado el servidor de **admine.** El docker sirve para crear un servidor local en el cual, en este caso se almacena la base de datos:

![1731231222033](image/README/1731231222033.png)

El archivo el cual hace que se realice el servidor sería **docker-compose.yml**, el cual lo conformará el siguiente codigo:

```bash
version: '3.1'

services:

  adminer:
    image: adminer
    restart: "no"
    ports:
      - ${ADMINER_PORT}:8080

  db-gym:
    image: mysql:latest
    restart: "no"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - ${MYSQL_PORT}:3306
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d

```

Para lanzar el servidor es necesario ejecutar el siguiente comando, estando en la carpeta correspondiente:

```bash
docker-compose up -d
```

#### Carpeta script:

En ella se va a encontrar un archivo **sql**, que en nuestro caso se llama **db.sql,** el cual contiene la base de datos necesaria para realizar el proyecto.

Las tablas necesarias serían las siguientes:

* La primera que hemos creado sería la tabla **cliente**, la cual va a tener los siguientes atributos:
  * **Id cliente :** Es un **número entero**, que se **autoincrementa** por defecto y es la **clave primaria**.
  * **nombre :** Es una **cadena** de caracteres y no puede estar vacia por lo que se le pone **not null.**
  * **email :** Es una **cadena** de caracteres y no puede estar vacia por lo que se le pone **not null.**
  * **fecha de registro :** Es de tipo fecha (**date**) y no puede ser nulo
  * **numero de teléfono :** Es un **numero entero** y no puede estar vacia por lo que se le pone **not null.**

```sql
CREATE TABLE `cliente` (
    `Id_cliente` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(150) NOT NULL,
    `email` varchar(150) NOT NULL,
    `fecha_registro` date NOT NULL,
    `numero_telefono` int NOT NULL
);
```

* La segunda que hemos creado sería la tabla **entrenador**, la cual va a tener los siguientes atributos:
  * **Id entrenador :** Es un **número entero**, que se **autoincrementa** por defecto y es la **clave primaria**.
  * **nombre :** Es una **cadena** de caracteres y no puede estar vacia por lo que se le pone **not null.**
  * **especialidad :** Es de tipo enum el cual va a contener las siguientes opciones:
    * **pesas**
    * **cardio**
    * **yoga**
    * **spinning**
  * **nivel de experiencia:** Es de tipo enum el cual va a contener las siguientes opciones:
    * **experto**
    * **avanzado**
    * **intermedio**
    * **principiante**

```sql
CREATE TABLE `entrenador` (
    `Id_entrenador` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(150) NOT NULL,
    `especialidad` ENUM('pesas', 'cardio', 'yoga', 'spinning') NOT NULL,
    `nivel_experiencia` ENUM('experto', 'avanzado', 'intermedio', 'principiante') NOT NULL
);
```

* La tercera que hemos creado sería la tabla **plan de membresia**, la cual va a tener los siguientes atributos:

  * **Id plan** **:** Es un **número entero**, que se **autoincrementa** por defecto y es la **clave primaria**.
  * **nombre plan :** Es una **cadena** de caracteres y no puede estar vacia por lo que se le pone **not null.**
  * **duracion de meses :** Es un **numero entero** y no puede estar vacia por lo que se le pone **not null.**
  * **precio** **:** Es un **float** y no puede estar vacia por lo que se le pone **not null.**
    ```sql
    CREATE TABLE `plan_membresia` (
        `Id_plan` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `nombre_plan` varchar(150) NOT NULL,
        `duracion_meses` int NOT NULL,
        `precio` float NOT NULL
    );

    ```
* La cuarta que hemos creado sería la tabla **sesion**, la cual va a tener los siguientes atributos:

  * **Id sesion** **:** Es un **número entero**, que se **autoincrementa** por defecto y es la **clave primaria**.
  * **fecha de incio :** Es de tipo fecha (**date**) y no puede estar vacia por lo que se le pone **not null.**
  * **hora de inicio :** Es de tipo tiempo (**time**) y no puede estar vacia por lo que se le pone **not null.**
  * **duracion en minutos :** Es un **número entero** y no puede estar vacia por lo que se le pone **not null.**
  * **id de cliente de la sesion :** Es un **número entero** y no puede estar vacia por lo que se le pone **not null.**
  * **id de entrenador de la sesion :** Es un **número entero** y no puede estar vacia por lo que se le pone **not null.**
  * Claves foraneas:
    * El **id de cliente de la sesion** hace referencia al id de la tabla cliente.
    * El **id de entrenador de la sesion** hace referencia al id de la tabla entrenador.

```sql
CREATE TABLE `sesion` (
    `Id_sesion` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha_inicio` date NOT NULL,
    `hora_inicio` time NOT NULL,
    `duracion_min` int NOT NULL,
    `id_cliente_sesion` INT NOT NULL,
    `id_entrenador_sesion` INT NOT NULL,
    FOREIGN KEY (`id_cliente_sesion`) REFERENCES `cliente`(`Id_cliente`),
    FOREIGN KEY (`id_entrenador_sesion`) REFERENCES `entrenador`(`Id_entrenador`)
);
```

* Y por último hemos creado la tabla **cliente plan**, la cual va a tener los siguientes atributos:
  * **cliente** : Es un **número entero**, no puede estar vacia por lo que se le pone **not null, y es la **clave primaria**.**
  * **plan** : Es un **número entero**, no puede estar vacia por lo que se le pone **not null, y es la **clave primaria**.**
  * **fecha de inicio** : Es de tipo fecha (**date**) y no puede estar vacia por lo que se le pone **not null.**
  * Claves foraneas:
    * El **cliente** hace referencia al id de la tabla cliente.
    * El **plan** hace referencia al id de la tabla plan.

```sql
CREATE TABLE `cliente_plan` (
    `cliente` INT NOT NULL,
    `plan` INT NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    PRIMARY KEY (`cliente`, `plan`), 
    FOREIGN KEY (`cliente`) REFERENCES `cliente`(`Id_cliente`),
    FOREIGN KEY (`plan`) REFERENCES `plan_membresia`(`Id_plan`)
);
```
