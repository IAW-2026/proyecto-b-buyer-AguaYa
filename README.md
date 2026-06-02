This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/7Ga9TYp-)
# buyer

Aplicación **Buyer** del [Proyecto IAW 2026](https://iaw-2026.github.io/proyecto/) — comisión `<!-- completar -->`.

Esta app corresponde al rol del comprador en los proyectos de tipo **B (Delivery)** y **C (Marketplace)**.

---

Enunciado completo: <https://iaw-2026.github.io/proyecto/>

Con eso armo el README:

BuyerApp — AguaYa
Aplicación Buyer del Proyecto IAW 2026 — Tipo B (Delivery).
Deploy
https://proyecto-b-buyer-agua-ya-git-develop-elionalvino-2085s-projects.vercel.app/
Instrucciones de uso

Iniciar sesión — Usar Clerk con Gmail (proveedor por defecto).
Exploración — Al entrar, el buyer ve el listado de vendedores disponibles. Puede buscar vendedores o productos por nombre usando la barra de búsqueda.
Productos — Al ingresar a un vendedor, se muestran sus productos disponibles con nombre, precio y stock.
Carrito — El buyer puede agregar productos al carrito, ver el resumen de su pedido y confirmarlo.
Órdenes — El buyer puede ver el historial de sus pedidos confirmados.
Favoritos — El buyer puede marcar vendedores como favoritos y consultarlos desde la sección correspondiente.
Panel de administración (buyer_admin) — El admin tiene acceso a un panel donde puede ver todas las órdenes, compradores y favoritos del sistema.

Descripción del proyecto
AguaYa es una plataforma distribuida que centraliza la logística de compra, venta y distribución de agua de mesa (bidones), reemplazando la gestión informal actual basada en WhatsApp y Marketplace. El sistema está compuesto por cinco aplicaciones web independientes (SellerApp, BuyerApp, DeliveryApp, PaymentsApp, FeedbackApp) que se comunican entre sí mediante APIs REST.
BuyerApp es la aplicación responsable del comprador. Permite explorar el catálogo de vendedores y sus productos, gestionar un carrito de compras, confirmar pedidos y hacer seguimiento del historial de órdenes. También incluye un sistema de favoritos para guardar vendedores frecuentes y una barra de búsqueda para encontrar vendedores y productos. El panel de administración permite al rol buyer_admin supervisar todas las órdenes, compradores y favoritos del sistema.
El frontend está construido con Next.js App Router y React, con Server Components como default y Client Components solo donde se necesita interactividad. La autenticación se maneja con Clerk, la base de datos es PostgreSQL serverless (Neon) con Prisma ORM.

Arquitectura de capas: Separación clara entre presentación (components/), lógica (lib/) y datos (lib/) con Prisma. Las Server Actions en app/actions/ orquestan las operaciones mutantes.
Roles: El rol buyer_admin se configura en Clerk via publicMetadata y se valida tanto en middleware como en las páginas protegidas.
Carrito: El carrito maneja órdenes con estado PENDING que al confirmarse transicionan a PAID.
Búsqueda: La búsqueda de vendedores y productos funciona desde la barra del header y redirige a una página de resultados filtrados.
Limitaciones conocidas: No se llegó a implementar el sistema de comentarios y claims.