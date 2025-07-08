# 🐾 Mascotas Poloit Backend

API REST desarrollada en Node.js con Express para la gestión de **usuarios** y **mascotas**.  
Incluye autenticación con JWT (access y refresh tokens), validaciones con Joi, y base de datos con Prisma.

---

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/mascotas-poloit-backend.git
cd mascotas-poloit-backend
npm install
```
```env
ACCESS_TOKEN_SECRET=tuClaveSecretaJWT
REFRESH_TOKEN_SECRET=otraClaveSecretaJWT
SERVER_PORT=3001
```
## Comandos 

| Comando       | Descripción                      |
| ------------- | -------------------------------- |
| `npm run dev` | Ejecuta el servidor con watch    |
| `npm start`   | Inicia el servidor en producción |

## 🌐Rutas

| Método | Ruta             | Descripción                |
| ------ | ---------------- | -------------------------- |
| POST   | `/create`        | Crear nuevo usuario        |
| GET    | `/`              | Obtener todos los usuarios |
| PATCH  | `/:id`           | Actualizar usuario por ID  |
| POST   | `/login`         | Iniciar sesión             |
| POST   | `/refresh-token` | Renovar access token (JWT) |

| Método | Ruta         | Descripción                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/create`    | Crear nueva mascota          |
| GET    | `/`          | Obtener todas las mascotas   |
| GET    | `/:id`       | Obtener una mascota por ID   |
| PATCH  | `/:id`       | Actualizar mascota por ID    |
| DELETE | `/:id`       | Eliminar mascota por ID      |
| PATCH  | `/adopt/:id` | Marcar mascota como adoptada |

## 🧩 Tecnologías usadas
- Node.js + Express como servidor web.

- Prisma ORM para acceso a base de datos.

- Joi para validación de datos.

- JWT (jsonwebtoken) para autenticación.

- Bcrypt para hashear contraseñas.

- Dotenv para variables de entorno.

- CORS habilitado para frontend externo.

## 👥 Autores
*Sebastian Galeano*
*Jorge Rodriguez*
