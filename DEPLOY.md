# Deploy NAO: Vercel + Render + Supabase

## Arquitectura

- Frontend React (Create React App): Vercel
- Backend Node/Express: Render Web Service
- PostgreSQL: Supabase

El frontend NO se conecta directo a PostgreSQL. Vercel solo recibe la URL pública del backend.

## 1. Supabase

Connection type: Shared Pooler / Session mode

- Host: `aws-0-us-west-2.pooler.supabase.com`
- Port: `5432`
- Database: `postgres`
- User: `postgres.lhzobrdzwgddowgrboxf`
- Password: usar el password real del proyecto Supabase

## 2. Render - backend

Crear un Web Service apuntando al repositorio del backend.

- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

Variables de entorno requeridas:

```env
DB_HOST=aws-0-us-west-2.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.lhzobrdzwgddowgrboxf
DB_PASSWORD=<SUPABASE_DB_PASSWORD>
DB_SSL=true
SECRET_JWT_SEED=<SECRETO_LARGO_Y_ALEATORIO>
CRYPTR_SECRET=mfgElab
CORS_ORIGIN=https://<TU-PROYECTO>.vercel.app
NODE_VERSION=22.12.0
```

`PORT` NO hace falta cargarlo en Render: Render lo define automáticamente y el servidor ya lo lee con `process.env.PORT`.

Para una primera prueba, si todavía no conocés la URL definitiva de Vercel, podés usar temporalmente:

```env
CORS_ORIGIN=*
```

Luego reemplazarlo por la URL definitiva de Vercel.

Variables opcionales, solo si se usa recuperación de contraseña por email:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<EMAIL_SMTP>
SMTP_PASS=<APP_PASSWORD_SMTP>
SMTP_FROM=<EMAIL_REMITENTE>
```

## 3. Vercel - frontend

En Project > Settings > Environment Variables:

```env
REACT_APP_API_URL=https://<TU-BACKEND>.onrender.com
```

Aplicarla al menos a Production. Si querés que los Preview Deployments también hablen con el backend, aplicarla también a Preview.

Configuración esperada:

- Framework: Create React App
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `build`

El proyecto incluye `.npmrc` con `legacy-peer-deps=true` para evitar conflictos de peer dependencies de dependencias antiguas.

## 4. Local - backend

Crear `.env` en el backend (no subirlo a Git):

```env
PORT=5006
HOST=0.0.0.0
DB_HOST=localhost
DB_PORT=5434
DB_NAME=nao
DB_USER=postgres
DB_PASSWORD=<TU_PASSWORD_LOCAL>
DB_SSL=false
SECRET_JWT_SEED=<MISMO_SECRETO_DE_DESARROLLO>
CRYPTR_SECRET=mfgElab
CORS_ORIGIN=http://localhost:5005
```

Si querés probar local contra Supabase, reemplazar DB_HOST/PORT/NAME/USER/PASSWORD por los valores de Supabase y poner `DB_SSL=true`.

## 5. Local - frontend

Crear `.env.local` en el frontend:

```env
REACT_APP_API_URL=http://localhost:5006
```

Para probar el frontend local contra Render:

```env
REACT_APP_API_URL=https://<TU-BACKEND>.onrender.com
```

## Orden recomendado

1. Crear/configurar Supabase y verificar que la base tenga las tablas/datos.
2. Subir backend a Render con sus variables.
3. Probar `https://<backend>.onrender.com/health` y esperar `{ "ok": true }`.
4. Copiar esa URL a `REACT_APP_API_URL` en Vercel.
5. Redeploy del frontend en Vercel.

## Importante

- Nunca cargar `DB_PASSWORD`, `SECRET_JWT_SEED` ni `SMTP_PASS` en Vercel/React.
- `CRYPTR_SECRET=mfgElab` se mantiene por compatibilidad con contraseñas ya cifradas por el sistema actual. Cambiarlo sin migrar los datos impediría descifrar contraseñas existentes.
- Los uploads guardados en la carpeta local `images` del backend no son almacenamiento persistente confiable en un hosting efímero. Si esa función se usa en producción, conviene mover imágenes a Supabase Storage u otro almacenamiento persistente.
