# Sr&Sra Tinta

Sitio web del taller Sr&Sra Tinta, construido con React, Vite y React Router DOM. El frontend se organiza por capas para mantener separadas las reglas del negocio, los casos de uso, las integraciones y la interfaz.

## Arquitectura

```text
src/
├── app/
│   ├── providers/             # Proveedores globales: carrito y sesión (Auth)
│   ├── routes/                # Enrutamiento y composición de páginas
│   └── services/              # Composición de dependencias de aplicación
│       ├── productCatalog.js  # Catálogo de productos (mock)
│       ├── authGateway.js     # Login/logout y lista de administradores
│       └── orderCatalog.js    # Checkout y seguimiento de órdenes
├── application/
│   ├── dto/                   # Datos de entrada/salida de los casos de uso
│   └── use-cases/
│       ├── products/          # Consultas del catálogo de productos
│       ├── auth/              # Inicio/cierre de sesión y escucha de sesión
│       └── orders/            # Checkout, búsqueda y cambio de estado de órdenes
├── domain/
│   ├── entities/              # Servicios, preguntas frecuentes y órdenes
│   └── repositories/          # Contratos de acceso a datos (productos, auth, órdenes)
├── infrastructure/
│   ├── firebase/               # Inicialización de Firebase (Auth + Firestore)
│   ├── repositories/           # Adaptadores: productos mock, Firebase Auth, Firestore
│   └── services/                # EmailJS (correos transaccionales)
├── presentation/
│   ├── components/             # Header, footer, tarjetas, AuthControls, guardas de ruta
│   │   └── admin/               # Panel de órdenes para administración
│   ├── hooks/                   # Acceso al estado del carrito y de la sesión
│   ├── layouts/                 # Estructuras pública y administrativa
│   └── pages/                   # Páginas públicas, rastreo de pedidos y administración
└── shared/
    ├── constants/             # Datos configurables, como contacto
    └── utils/                 # Utilidades compartidas
```

El dominio no importa React ni infraestructura. La aplicación consulta el catálogo o las órdenes mediante casos de uso, y la infraestructura ofrece adaptadores concretos (productos mock, Firebase Auth, Firestore, EmailJS) que implementan esos contratos. `app/` conecta rutas y proveedores, y presentación utiliza el estado del carrito y de la sesión mediante hooks. Tienda y administración permanecen desacopladas, protegidas por guardas de ruta (`RequireAuth`, `RequireAdmin`).

## Funcionalidades

- Sitio público: inicio, nosotros, tienda, detalle de producto, carrito, servicios, galería, preguntas frecuentes, contacto y QR/menú rápido.
- Carrito: agregar productos, ajustar cantidades, quitar productos y conservar la selección en `localStorage`.
- Sesión: inicio de sesión con Google o Facebook desde el menú principal (escritorio y móvil), junto al botón flotante de WhatsApp, que se mantiene visible en todo momento.
- Checkout: con sesión iniciada, "Finalizar compra" genera una orden en Firestore (`orders`), envía un correo de confirmación por EmailJS con el código de orden y un enlace de rastreo, y limpia el carrito. El enlace de WhatsApp para consultar el pedido sigue disponible como alternativa.
- Rastreo de pedidos: `/mis-pedidos` (solo con sesión iniciada) lista en tiempo real las órdenes del usuario y permite buscarlas por código.
- Administración: `/admin`, protegido para la cuenta configurada como administradora; incluye un panel que lista todas las órdenes y permite avanzar su estado (procesando → enviado → entregado).
- Contacto: formulario que prepara un mensaje para WhatsApp, horario de lunes a viernes de 9:00 a.m. a 6:00 p.m. y mapa de Google Maps.
- Servicios: serigrafía, bordado, diseño, uniformes, camisetas, seguridad laboral, artículos especiales, logos, estampados en vinil/cordura, bolsas kraft y un servicio marcado como próximo.
- Las rutas desconocidas muestran una página 404.

Los productos, precios e imágenes de galería son de demostración y deben sustituirse por información real antes de publicar. El formulario de contacto no guarda datos: prepara un mensaje para que la persona lo envíe. Para enlazar WhatsApp con el número del taller, configura `WHATSAPP_PHONE` en `src/shared/constants/contact.js` con el código de país y solo dígitos.

La página `/qr` genera un QR que apunta al dominio donde se ejecuta el sitio y muestra accesos rápidos a tienda, servicios, galería, WhatsApp y contacto. El logo compartido usa `src/assets/logo2.png`.

## Configuración de Firebase, EmailJS y administración

1. **Variables de entorno**: copia `.env.example` como `.env` y completa los valores. Vite solo expone las variables que empiezan con `VITE_`.
2. **Firebase**: crea un proyecto en Firebase Console, habilita Authentication (proveedores Google y Facebook) y Firestore Database (modo producción). Copia las credenciales del SDK web a `VITE_FIREBASE_*`.
   - El proveedor de Facebook requiere además una app de Meta for Developers con su App ID/Secret configurados en la consola de Firebase.
   - Firestore pedirá crear un índice compuesto (`userId` + `createdAt`) la primera vez que se use el rastreador de pedidos; sigue el enlace que aparece en la consola del navegador para crearlo con un clic.
   - Reglas de seguridad sugeridas para la colección `orders`: cada usuario autenticado puede crear/leer sus propias órdenes (`request.auth.uid == resource.data.userId`), y solo el correo administrador puede leer/actualizar cualquier orden.
3. **EmailJS**: crea una cuenta en EmailJS, un Email Service y tres plantillas (verificación, restablecimiento de contraseña y confirmación de orden). Copia la Public Key, el Service ID y los Template IDs a `VITE_EMAILJS_*`.
4. **Cuenta de administrador**: el sitio no usa contraseñas propias, el login es solo con Google o Facebook. La cuenta `senoraysenorcafetintacafetinta@gmail.com` ya tiene acceso de administrador por defecto (ver `src/app/services/authGateway.js`); basta con iniciar sesión con Google usando ese correo para ver el botón "Panel de Administración" y acceder a `/admin`. Para agregar más administradores de prueba, lista sus correos en `VITE_ADMIN_EMAILS` (separados por comas), sin quitar el correo por defecto.

## Desarrollo

```sh
npm install
npm run dev
```

Validación local:

```sh
npm run lint
npm run build
```

React Router DOM gestiona la navegación; `qrcode.react` genera el QR en el navegador. El carrito usa el estado nativo de React. La sesión usa Firebase Auth, las órdenes se guardan en Firestore y los correos transaccionales se envían con EmailJS.

## Issues y pull requests

Antes de comenzar un cambio, revisa los issues abiertos del repositorio y sigue sus requisitos. Corrige los issues asignados o acordados, valida los cambios con `npm run lint` y `npm run build`, y envía el trabajo mediante un pull request hacia `main`, describiendo el issue relacionado y las pruebas realizadas. No subas cambios directamente a `main`.
