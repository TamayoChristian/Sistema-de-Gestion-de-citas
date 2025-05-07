El proyecto es un sistema de gestión de citas medicas, fue desarrollado con node.js, express y typescript, además se implementó una base de datos en SQLite para la persistencia de los datos y frontend fue creado con React.

Pasos para arrancar el proyecto:
1. Contar con node
EL proyecto está construido con node, así que necesitamos node para ejecutarlo, para obtener la versión 22.15.0 de node, para ello usaremos Fast Node Manager para instalarlo.
ejecutemos estos comandos:
SI se trabaja en una máquina windows:
# Descarga e instala fnm:
winget install Schniz.fnm

# Descarga e instala Node.js:
fnm install 22

# Verifica la versión de Node.js:
node -v # Debería mostrar "v22.15.0".

# Verifica versión de npm:
npm -v # Debería mostrar "10.9.2".

SI se trabaja en una máquina linux:
# Descarga e instala fnm:
curl -o- https://fnm.vercel.app/install | bash

# Descarga e instala Node.js:
fnm install 22

# Verifica la versión de Node.js:
node -v # Debería mostrar "v22.15.0".

# Verifica versión de npm:
npm -v # Debería mostrar "10.9.2".

Si se trabaja en un equipo MAC OS:
# Descarga e instala fnm:
curl -o- https://fnm.vercel.app/install | bash

# Descarga e instala Node.js:
fnm install 22

# Verifica la versión de Node.js:
node -v # Debería mostrar "v22.15.0".

# Verifica versión de npm:
npm -v # Debería mostrar "10.9.2".

2. Clonar las ramas del repositorio
Creamos dos carpetas, una para el backend y otra para el frontend, y clonamos el repositorio en ambas carpetas.

Carpeta del frontend:
git clone https://github.com/TamayoChristian/Sistema-de-Gestion-de-citas.git
cd Sistema-de-Gestion-de-citas
git checkout frontend
npm install


Carpeta del backend:
git clone https://github.com/TamayoChristian/Sistema-de-Gestion-de-citas.git
cd Sistema-de-Gestion-de-citas
git checkout backend

3. Ejecutar
ahora abrimos dos terminales, una dentro de la carpeta del frontend y otra dentro de la carpeta del backend y Usamos el siguiente comando para ejecutar los proyectos:
npm run dev
este comando sirve para ambas terminales.

en un navegador nos dirigimos al enlace: http://localhost:5173/
