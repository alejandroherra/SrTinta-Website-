# Sr&Sra Tinta

Sitio web del taller Sr&Sra Tinta, construido con React, Vite y React Router DOM. El frontend se organiza por capas para mantener separadas las reglas del negocio, los casos de uso, las integraciones y la interfaz.

## Arquitectura

```text
src/
├── app/
│   ├── providers/             # Proveedores globales, como el carrito
│   ├── routes/                # Enrutamiento y composición de páginas
│   └── services/              # Composición de dependencias de aplicación
├── application/
│   ├── dto/                   # Datos de entrada/salida de los casos de uso
│   └── use-cases/products/    # Consultas del catálogo de productos
├── domain/
│   ├── entities/              # Catálogo de servicios y preguntas frecuentes
│   └── repositories/          # Contratos de acceso a datos
├── infrastructure/
│   └── repositories/          # Catálogo de productos de demostración
├── presentation/
│   ├── components/            # Header, footer, tarjetas y UI compartida
│   ├── hooks/                 # Acceso al estado del carrito
│   ├── layouts/               # Estructuras pública y administrativa
│   └── pages/                 # Páginas públicas y de administración
└── shared/
    ├── constants/             # Datos configurables, como contacto
    └── utils/                 # Utilidades compartidas
```

El dominio no importa React ni infraestructura. La aplicación consulta el catálogo mediante un caso de uso y la infraestructura ofrece un repositorio mock que puede sustituirse por una API o base de datos. `app/` conecta rutas y proveedores, y presentación utiliza el estado del carrito mediante un hook. Tienda y administración permanecen desacopladas.

## Funcionalidades

- Sitio público: inicio, nosotros, tienda, detalle de producto, carrito, servicios, galería, preguntas frecuentes, contacto y QR/menú rápido.
- Carrito: agregar productos, ajustar cantidades, quitar productos y conservar la selección en `localStorage`.
- Contacto: formulario que prepara un mensaje para WhatsApp, horario de lunes a viernes de 9:00 a.m. a 6:00 p.m. y mapa de Google Maps.
- Servicios: serigrafía, bordado, diseño, uniformes, camisetas, seguridad laboral, artículos especiales, logos, estampados en vinil/cordura, bolsas kraft y un servicio marcado como próximo.
- Administración: `/admin`, con layout independiente como base para futuras herramientas.
- Las rutas desconocidas muestran una página 404.

Los productos, precios e imágenes de galería son de demostración y deben sustituirse por información real antes de publicar. No hay pagos ni checkout conectado. El formulario de contacto no guarda datos: prepara un mensaje para que la persona lo envíe. Para enlazar WhatsApp con el número del taller, configura `WHATSAPP_PHONE` en `src/shared/constants/contact.js` con el código de país y solo dígitos.

La página `/qr` genera un QR que apunta al dominio donde se ejecuta el sitio y muestra accesos rápidos a tienda, servicios, galería, WhatsApp y contacto. El logo compartido usa `src/assets/logo2.png`.

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

React Router DOM gestiona la navegación; `qrcode.react` genera el QR en el navegador. El carrito usa el estado nativo de React.

Las páginas se cargan bajo demanda con `React.lazy` y `Suspense`. Las imágenes de catálogo, carrito y galería usan carga nativa diferida (`loading="lazy"`) y variantes responsivas (`srcSet`/`sizes`) para descargar dimensiones adecuadas; las imágenes principales de detalle se solicitan con prioridad alta. Framer Motion usa `LazyMotion` y carga asíncrona de funciones para reducir el JavaScript inicial; las transiciones evitan filtros costosos y se respeta la preferencia del sistema para reducir movimiento.

## Issues y pull requests

Antes de comenzar un cambio, revisa los issues abiertos del repositorio y sigue sus requisitos. Corrige los issues asignados o acordados, valida los cambios con `npm run lint` y `npm run build`, y envía el trabajo mediante un pull request hacia `main`, describiendo el issue relacionado y las pruebas realizadas. No subas cambios directamente a `main`.
