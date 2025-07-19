# Admin Ventas Frontend

Sistema de administración de ventas construido con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Características

- **Autenticación completa** con registro e inicio de sesión
- **Dashboard de productos** con búsqueda y filtrado
- **Carrito de compras** con persistencia local
- **Sistema de pagos** integrado
- **Arquitectura escalable** con separación de responsabilidades
- **Componentes reutilizables** y tipado fuerte con TypeScript
- **Diseño responsive** con Tailwind CSS

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   │   ├── login/         # Página de inicio de sesión
│   │   └── register/      # Página de registro
│   ├── (marketing)/       # Rutas de marketing
│   │   └── home/          # Página principal
│   ├── dashboard/         # Dashboard de productos
│   ├── pago/              # Sistema de pagos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── common/            # Componentes comunes
│   │   ├── Button/        # Botón reutilizable
│   │   ├── Card/          # Tarjeta de imagen
│   │   └── Header/        # Barra de búsqueda
│   ├── ui/                # Componentes de UI
│   │   ├── Dialog/        # Diálogos modales
│   │   └── Spinner/       # Indicador de carga
│   └── feature/           # Componentes específicos
│       ├── ProductList/   # Lista de productos
│       └── UserProfile/   # Perfil de usuario
├── config/                # Configuración
│   ├── api.ts            # Configuración de API
│   ├── constants.ts      # Constantes de la app
│   └── index.ts          # Exportaciones
├── hooks/                 # Hooks personalizados
│   ├── useAuth.ts        # Hook de autenticación
│   ├── useProducts.ts    # Hook de productos
│   └── index.ts          # Exportaciones
├── lib/                   # Utilidades y servicios
│   ├── api/              # Cliente HTTP y servicios
│   │   ├── client.ts     # Cliente Axios configurado
│   │   └── services/     # Servicios de API
│   └── utils/            # Utilidades
│       ├── helpers.ts    # Funciones helper
│       └── validations.ts # Validaciones
├── models/                # Modelos de datos
│   ├── User.ts           # Modelo de usuario
│   ├── Product.ts        # Modelo de producto
│   └── index.ts          # Exportaciones
├── store/                 # Estado global (Zustand)
│   ├── authStore.ts      # Store de autenticación
│   ├── cartStore.ts      # Store del carrito
│   └── index.ts          # Exportaciones
├── types/                 # Tipos TypeScript
│   ├── auth.ts           # Tipos de autenticación
│   ├── common.ts         # Tipos comunes
│   ├── product.ts        # Tipos de productos
│   └── index.ts          # Exportaciones
└── styles/                # Estilos CSS (futuro)
```

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP
- **Heroicons** - Iconografía
- **React Icons** - Iconos adicionales

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd admi-ventas-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter de código

## 🌐 Rutas de la Aplicación

- `/` - Página principal
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/dashboard` - Dashboard de productos
- `/pago` - Sistema de pagos

## 🔌 API

El proyecto se conecta a un backend en `https://admi-ventas-backend.onrender.com` con los siguientes endpoints:

- `POST /usuarios/registro` - Registro de usuarios
- `POST /usuarios/login` - Autenticación
- `GET /productos` - Lista de productos

## 🎨 Componentes Principales

### Button
Componente reutilizable con variantes y tamaños configurables.

### ProductCard
Tarjeta de producto con funcionalidad de carrito integrada.

### SearchBar
Barra de búsqueda con autocompletado.

### PaymentCard
Tarjeta de pago con gestión de cantidades.

## 📱 Estado Global

### AuthStore
Maneja el estado de autenticación del usuario.

### CartStore
Gestiona el carrito de compras con persistencia local.

## 🔒 Autenticación

El sistema incluye:
- Registro de usuarios
- Inicio de sesión
- Persistencia de tokens
- Protección de rutas (pendiente)

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte, email: soporte@adminventas.com
