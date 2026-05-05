# Sistema Restaurante

Plataforma completa para gestión de restaurantes compuesta por tres aplicaciones integradas:

- **Restaurante-AuthService**: servicio de autenticación en **.NET 8** con **PostgreSQL** y **JWT**.
- **Restaurante-ServerAdmin**: API administrativa en **Node.js** con **Express** y **MongoDB**.
- **Restaurante-Client-Admin**: panel administrativo en **React + Vite**.

El proyecto está preparado para ejecutarse de forma local o con **Docker Compose** desde la raíz del repositorio.

---

## Tabla de Contenidos

1. [Arquitectura general](#arquitectura-general)
2. [Tecnologías usadas](#tecnologias-usadas)
3. [Estructura de carpetas](#estructura-de-carpetas)
4. [Requisitos](#requisitos)
5. [Variables de entorno](#variables-de-entorno)
6. [Instalación rápida con Docker](#instalacion-rapida-con-docker)
7. [Instalación manual por servicio](#instalacion-manual-por-servicio)
8. [Endpoints disponibles](#endpoints-disponibles)
9. [Flujos de uso](#flujos-de-uso)
10. [Postman](#postman)
11. [Notas importantes](#notas-importantes)

---

## Arquitectura General

El sistema está dividido en tres capas principales:

- **Autenticación**: registra usuarios, genera JWT y sincroniza perfiles básicos a MongoDB.
- **Administración backend**: expone los módulos operativos del restaurante como sucursales, menús, mesas, reservaciones, órdenes y usuarios sincronizados.
- **Frontend admin**: consume ambos servicios y centraliza la experiencia de gestión.

### Puertos por defecto

- **Auth Service**: `http://localhost:5065`
- **Server Admin**: `http://localhost:3001`
- **Client Admin**: `http://localhost:5173`
- **PostgreSQL**: `localhost:5432`
- **MongoDB**: `localhost:27017`

### Flujo general

1. El usuario se registra o inicia sesión en el **Auth Service**.
2. El servicio devuelve un **JWT**.
3. El frontend usa ese token para consumir la API de administración.
4. El servidor admin valida el token y consulta el perfil sincronizado en MongoDB.

---

## Tecnologías Usadas

### Restaurante-AuthService

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- Npgsql / PostgreSQL
- JWT Authentication
- Swagger / OpenAPI
- BCrypt.Net-Next

### Restaurante-ServerAdmin

- Node.js
- Express 5
- MongoDB + Mongoose
- JSON Web Token
- Helmet
- CORS
- Morgan
- Multer
- Cloudinary
- express-validator
- express-rate-limit

### Restaurante-Client-Admin

- React 19
- Vite
- React Router
- Axios
- Zustand
- React Hook Form
- React Hot Toast
- Tailwind CSS 4
- Material Tailwind
- Font Awesome
- Heroicons

### Infraestructura

- Docker
- Docker Compose
- PostgreSQL
- MongoDB

---

## Estructura de Carpetas

```text
Gestor de restaurante/
├── docker-compose.yml
├── Restaurante-AuthService/
│   ├── README.md
│   ├── Docker/
│   └── Restaurante.AuthService/
│       ├── Restaurante.AuthService.sln
│       ├── Dockerfile
│       ├── Restaurante.AuthService.Api/
│       │   ├── Controllers/
│       │   ├── Properties/
│       │   ├── Program.cs
│       │   └── appsettings.json
│       ├── Restaurante.AuthService.Application/
│       │   ├── DTOs/
│       │   ├── Interfaces/
│       │   └── Services/
│       ├── Restaurante.AuthService.Domain/
│       │   └── Entities/
│       └── Restaurante.AuthService.Infrastructure/
│           ├── Data/
│           ├── Providers/
│           ├── Repositories/
│           └── Services/
├── Restaurante-Client-Admin/
│   ├── Dockerfile
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── app/
│       │   ├── layouts/
│       │   └── router/
│       ├── assets/
│       ├── features/
│       │   ├── auth/
│       │   ├── locations/
│       │   ├── menus/
│       │   ├── orders/
│       │   ├── reservations/
│       │   ├── summaries/
│       │   ├── tables/
│       │   └── users/
│       ├── shared/
│       │   ├── api/
│       │   ├── components/
│       │   ├── ui/
│       │   └── utils/
│       └── styles/
└── Restaurante-ServerAdmin/
    ├── README.md
    ├── Docker General/
    └── server-admin/
        ├── index.js
        ├── package.json
        ├── configs/
        ├── middlewares/
        └── src/
            ├── menus/
            ├── orders/
            ├── reservations/
            ├── restaurants/
            ├── tables/
            └── users/
```

---

## Requisitos

### Software recomendado

- **Node.js** LTS
- **pnpm**
- **.NET 8 SDK**
- **PostgreSQL**
- **MongoDB**
- **Docker** y **Docker Compose**
- **Git**

### Opcional

- **Postman** para probar los endpoints
- **Cloudinary** si vas a usar la subida de imágenes en el servidor admin

---

## Variables de Entorno

### 1) Auth Service

El servicio usa PostgreSQL y JWT. En desarrollo local puedes apoyarte en `appsettings.json`, pero también puedes sobreescribir con variables de entorno.

Variables importantes:

- `ConnectionStrings__PostgresConnection`
- `Jwt__Key`
- `Jwt__Issuer`
- `Jwt__Audience`
- `SeedSettings__AdminPassword`
- `ASPNETCORE_ENVIRONMENT`

Ejemplo:

```env
ConnectionStrings__PostgresConnection=Host=localhost;Database=restaurante_auth_db;Username=postgres;Password=admin
Jwt__Key=Restaurante_Super_Secret_Key_2026_DotNet8
Jwt__Issuer=auth-service
Jwt__Audience=restaurante-app
SeedSettings__AdminPassword=Admin1234!
ASPNETCORE_ENVIRONMENT=Development
```

### 2) Server Admin

Variables importantes:

- `PORT`
- `URI_MONGODB`
- `SECRETORPRIVATEKEY`

Ejemplo:

```env
PORT=3001
URI_MONGODB=mongodb://localhost:27017/restauranteAdmin
SECRETORPRIVATEKEY=Restaurante_Super_Secret_Key_2026_DotNet8
```

### 3) Client Admin

El frontend consume ambos backend mediante variables Vite:

- `VITE_AUTH_URL`
- `VITE_ADMIN_URL`

Ejemplo:

```env
VITE_AUTH_URL=http://localhost:5065/api/v1
VITE_ADMIN_URL=http://localhost:3001/restaurant/v1
```

---

## Instalación Rápida con Docker

La forma más simple de levantar todo el stack es desde la raíz del repositorio:

```bash
docker compose up --build
```

Esto levanta:

- PostgreSQL para el auth service
- MongoDB para el servidor admin
- Auth Service
- Server Admin
- Client Admin

### URLs resultantes

- Frontend: `http://localhost:5173`
- Auth: `http://localhost:5065`
- Admin API: `http://localhost:3001`

---

## Instalación Manual por Servicio

Si prefieres ejecutar cada parte por separado:

### 1) Auth Service

```bash
cd Restaurante-AuthService/Restaurante.AuthService
dotnet restore
dotnet run --project Restaurante.AuthService.Api
```

Swagger queda disponible en desarrollo en:

- `http://localhost:5065/swagger`

### 2) Server Admin

```bash
cd Restaurante-ServerAdmin/server-admin
pnpm install
pnpm dev
```

### 3) Client Admin

```bash
cd Restaurante-Client-Admin
pnpm install
pnpm dev
```

---

## Endpoints Disponibles

> Nota: las rutas están documentadas con la base real de cada servicio.

### Auth Service

**Base URL:** `/api/v1/auth`

#### `POST /api/v1/auth/register`

Registra un usuario nuevo.

Body de ejemplo:

```json
{
  "email": "usuario@correo.com",
  "password": "123456",
  "role": "WAITER"
}
```

#### `POST /api/v1/auth/login`

Autentica al usuario y devuelve un JWT.

Body de ejemplo:

```json
{
  "email": "usuario@correo.com",
  "password": "123456"
}
```

Respuesta típica:

```json
{
  "message": "Login exitoso",
  "token": "<JWT>",
  "userDetails": {
    "id": 1,
    "email": "usuario@correo.com",
    "role": "WAITER",
    "mongoId": null
  }
}
```

### Server Admin

**Base URL:** `/restaurant/v1`

#### Health Check

- `GET /restaurant/v1/health`

#### Usuarios

- `POST /restaurant/v1/users/sync`
- `GET /restaurant/v1/users`
- `GET /restaurant/v1/users/profile`

`GET /users` y `GET /users/profile` requieren autenticación con JWT.

Ejemplo de sincronización de perfil:

```json
{
  "email": "usuario@correo.com",
  "role": "WAITER"
}
```

#### Restaurantes

- `GET /restaurant/v1/restaurants`
- `GET /restaurant/v1/restaurants/:id`
- `POST /restaurant/v1/restaurants`
- `PUT /restaurant/v1/restaurants/:id`
- `PUT /restaurant/v1/restaurants/:id/activate`
- `PUT /restaurant/v1/restaurants/:id/desactivate`

Filtros soportados:

- `isActive`

Ejemplo de creación:

```json
{
  "name": "Restaurante Central",
  "descripcion": "Sucursal principal del restaurante.",
  "address": "Av. Principal 123",
  "openingTime": "08:00",
  "closingTime": "22:00",
  "category": "Casera",
  "averagePrice": 15,
  "email": "contacto@restaurante.com",
  "phoneNumber": "+50212345678"
}
```

Si envías imagen, el campo esperado es `photos`.

#### Menús

- `GET /restaurant/v1/menus`
- `GET /restaurant/v1/menus/:id`
- `POST /restaurant/v1/menus`
- `PUT /restaurant/v1/menus/:id`
- `PUT /restaurant/v1/menus/:id/activate`
- `PUT /restaurant/v1/menus/:id/desactivate`

Filtros soportados:

- `restaurant`
- `category`
- `isActive`

Ejemplo de creación:

```json
{
  "restaurant": "66f1d5b1c7b9a20000000001",
  "name": "Hamburguesa Especial",
  "description": "Hamburguesa con queso, tocino y papas.",
  "ingredients": ["Pan", "Carne", "Queso", "Tocino"],
  "price": 9.99,
  "category": "Plato Fuerte"
}
```

Si envías imagen, el campo esperado es `image`.

#### Mesas

- `GET /restaurant/v1/tables`
- `GET /restaurant/v1/tables/:id`
- `POST /restaurant/v1/tables`
- `PUT /restaurant/v1/tables/:id`
- `PUT /restaurant/v1/tables/:id/activate`
- `PUT /restaurant/v1/tables/:id/desactivate`

Filtros soportados:

- `restaurant`
- `status`
- `isActive`

Ejemplo de creación:

```json
{
  "restaurant": "66f1d5b1c7b9a20000000001",
  "number": "T-12",
  "capacity": 4,
  "location": "Sala Principal",
  "description": "Mesa junto a la ventana"
}
```

#### Reservaciones

- `GET /restaurant/v1/reservations`
- `GET /restaurant/v1/reservations/:id`
- `POST /restaurant/v1/reservations`
- `PUT /restaurant/v1/reservations/:id`
- `PUT /restaurant/v1/reservations/:id/activate`
- `PUT /restaurant/v1/reservations/:id/desactivate`

Filtros soportados:

- `restaurant`
- `user`
- `status`
- `type`

Ejemplo de creación:

```json
{
  "user": "66f1d5b1c7b9a20000000002",
  "restaurant": "66f1d5b1c7b9a20000000001",
  "type": "En Mesa",
  "table": "66f1d5b1c7b9a20000000003",
  "date": "2026-05-10T19:00:00.000Z",
  "notes": "Cumpleaños de 6 personas"
}
```

#### Órdenes

- `POST /restaurant/v1/orders`
- `PATCH /restaurant/v1/orders/:orderId/item/:itemId/status`
- `PATCH /restaurant/v1/orders/:id/status`

Ejemplo de creación:

```json
{
  "table": "66f1d5b1c7b9a20000000003",
  "restaurant": "66f1d5b1c7b9a20000000001",
  "items": [
    {
      "menuItem": "66f1d5b1c7b9a20000000010",
      "quantity": 2,
      "modifiers": ["Sin cebolla"],
      "notes": "Bien cocidas",
      "price": 9.99
    }
  ]
}
```

Estados de ítems:

- `EN_ESPERA`
- `EN_COCINA`
- `LISTO`
- `SERVIDO`

Estados generales de orden:

- `ABIERTA`
- `CERRADA`
- `CANCELADA`

### Rutas del Frontend

El panel administra las siguientes vistas principales:

- `/` -> pantalla de autenticación
- `/dashboard/locations`
- `/dashboard/menus`
- `/dashboard/orders`
- `/dashboard/reservations`
- `/dashboard/summaries`
- `/dashboard/tables`
- `/dashboard/users`

---

## Flujos de Uso

### 1) Crear un usuario y acceder al sistema

1. Haz `POST` a `/api/v1/auth/register`.
2. Inicia sesión con `POST /api/v1/auth/login`.
3. Copia el `token` devuelto.
4. Usa el token en `Authorization: Bearer <TOKEN>`.

### 2) Consumir la API administrativa

1. Usa el token generado por el auth service.
2. Consulta `GET /restaurant/v1/users/profile` o cualquier ruta protegida.
3. Si prefieres, el backend también acepta el header `x-token`.

### 3) Subida de imágenes

- Restaurantes: campo `photos`
- Menús: campo `image`

Para estos endpoints usa `form-data` en lugar de JSON plano.

---

## Postman

### Variables sugeridas

```text
authBaseUrl = http://localhost:5065/api/v1
adminBaseUrl = http://localhost:3001/restaurant/v1
```

### Ejemplos de requests

- Login: `{{authBaseUrl}}/auth/login`
- Registro: `{{authBaseUrl}}/auth/register`
- Health: `{{adminBaseUrl}}/health`
- Usuarios: `{{adminBaseUrl}}/users`
- Restaurantes: `{{adminBaseUrl}}/restaurants`

### Autorización

En rutas protegidas agrega:

```http
Authorization: Bearer <TOKEN>
```

---

## Notas Importantes

- El auth service crea un usuario administrador inicial solo si no existe ningún usuario en la base de datos.
- Credencial semilla por defecto:
  - Email: `admin@restaurante.local`
  - Password: `Admin1234!`
- El servidor admin valida JWT con la misma clave secreta configurada en el auth service.
- El frontend contiene lógica de refresco de sesión, pero en el auth service documentado actualmente solo están implementados `register` y `login`.
- Las rutas y estructuras pueden ampliarse sin romper el contrato base mientras se mantengan los prefijos actuales.

---

## Instalación Recomendada Paso a Paso

Si quieres levantarlo manualmente sin Docker:

1. Inicia PostgreSQL y MongoDB localmente.
2. Configura las variables de entorno de cada servicio.
3. Ejecuta el auth service.
4. Ejecuta el server admin.
5. Ejecuta el cliente admin.
6. Abre el navegador en `http://localhost:5173`.

---

## Licencia

Revisa el archivo `LICENSE` de cada subproyecto para conocer los términos aplicables.
