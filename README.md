El proyecto es un sistema de gestión de citas medicas, fue desarrollado con node.js, express y typescript, además se implementó una base de datos en SQLite para la persistencia de los datos y frontend fue creado con React, para correr la aplicación el su totalidad, PRIMERO QUE NADA SE DEBE CLONAR EL REPOSITORIO, dado el mismo ya contiene el backend y el frontend de la aplicación.

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

Una vez descargados los archivos, debemos ejecutar al mismo tiempo el backend y el frontend para que la aplicación funcione. 
Abrimos dos terminales 
