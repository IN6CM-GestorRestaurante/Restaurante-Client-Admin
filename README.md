# Restaurante - Client Admin Web

Este repositorio contiene la **Aplicación Web para Administradores** del sistema del Restaurante. Construido con React, Vite y TailwindCSS, funciona como un panel de control (Dashboard) desde donde los administradores pueden gestionar el menú, las categorías y visualizar información clave del negocio.

## 🚀 Funcionalidades Clave
- **Dashboard de Control:** Vista general administrativa con acceso a métricas y acciones rápidas.
- **Gestión de Inventario/Menú:** Interfaces completas para crear, editar, eliminar y visualizar platillos y categorías.
- **Protección de Rutas:** Asegura que solo el personal autorizado (tokens de administrador) pueda acceder al panel.
- **Subida de Archivos:** Formularios integrados preparados para el envío de imágenes al backend.
- **Diseño Profesional:** Componentes de interfaz adaptables y estéticos gracias a la integración de Material Tailwind.

## 🛠 Stack de Tecnologías
- **Core:** React (v19) + Vite (v8)
- **Estilos:** TailwindCSS (v4)
- **Componentes UI:** Material Tailwind React
- **Enrutamiento:** React Router (v7)
- **Gestor de Estado:** Zustand
- **Cliente HTTP:** Axios
- **Formularios:** React Hook Form
- **Notificaciones e Iconografía:** React Hot Toast, Heroicons, FontAwesome

## 📁 Estructura del Proyecto
```
Restaurante-Client-Admin/
├── public/          # Archivos estáticos
├── src/             # Código fuente de React
│   ├── components/  # Componentes reutilizables (Sidebar, Navbar, Modales)
│   ├── pages/       # Pantallas administrativas (Dashboard, Menú, Ajustes)
│   ├── store/       # Estado global (Zustand)
│   ├── utils/       # Helpers y configuraciones
│   ├── App.jsx      # Definición de rutas y layout principal
│   └── main.jsx     # Archivo de entrada de la aplicación
├── eslint.config.js # Configuración estricta de Linter
├── vite.config.js   # Opciones de Vite
└── package.json     # Dependencias de npm
```

## 📋 Requisitos para Despliegue Local
- Node.js versión 18 o superior.
- Gestor de paquetes como NPM o PNPM.
- API Backend Administrativa (`Restaurante-ServerAdmin`) corriendo localmente.

## ⚙️ Guía de Instalación

1. **Clonar el proyecto:**
   ```bash
   git clone https://github.com/IN6CM-GestorRestaurante/Restaurante-Client-Admin.git
   cd Restaurante-Client-Admin
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el entorno:**
   Crea un archivo `.env` en la raíz (si es necesario) y define la URL de la API:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
   *Nota: Asegúrate de que el puerto coincida con el de tu `ServerAdmin`.*

4. **Ejecutar el proyecto en desarrollo:**
   ```bash
   npm run dev
   ```
   Accede a la URL proporcionada en la terminal (ej: `http://localhost:5173`) para ver el Dashboard.

5. **Empaquetado para Producción:**
   Para compilar los archivos y probarlos:
   ```bash
   npm run build
   npm run preview
   ```
