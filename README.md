# Cassix · Tienda online de streetwear (proyecto de portfolio)

Sitio web estático y responsive para **Cassix**, una marca de streetwear oversize (camisetas y hoodies). Diseñado y dirigido por mí con ayuda de IA (Claude, de Anthropic): yo definí la marca, el catálogo, los precios, los textos y las decisiones de diseño y negocio; la IA me ayudó a escribir y revisar el código.

> **Sitio de demostración.** No se procesan pedidos ni pagos, y los textos legales son de ejemplo con datos ficticios.

## Qué incluye

- Catálogo, fichas de producto con galería y zoom, carrito y checkout simulado (todo en el navegador, con `localStorage`).
- **Buscador de talla**: el cliente introduce estatura, peso, sexo y edad y la web le recomienda talla a partir de las medidas reales de la prenda.
- Guía de tallas por tipo de prenda (camisetas, camisetas de manga larga y hoodies) con medidas en cm y pulgadas.
- Código de descuento del 10 % y regla de envío gratis a partir de 70 €.
- Diseño adaptado a móvil, tablet y escritorio (rejilla de dos columnas en móvil).
- Newsletter (modo demo: no guarda datos) y páginas informativas (envíos, devoluciones, contacto).
- Efectos de hover y animaciones suaves, respetando `prefers-reduced-motion`.
- Datos estructurados (JSON-LD) y metadatos para SEO.
- Imágenes optimizadas en WebP con varias resoluciones (`srcset`) y carga diferida.

## Tecnología

HTML, CSS y JavaScript sin frameworks ni dependencias de build. Tipografías: Archivo e Instrument Serif.

## Cómo verlo en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Las rutas son absolutas (`/catalogo/`), así que hay que servir la carpeta desde la raíz (no abrir los archivos con doble clic).

## Notas

- Los textos legales (`aviso-legal`, `privacidad`, `cookies`, `terminos`) son de ejemplo y no constituyen asesoramiento legal.
- El correo (`hola@cassix.example`) y el dominio (`cassix-demo.example`) son marcadores de posición.
- Marca, logotipo, fotografías y diseños de las prendas pertenecen a Cassix: todos los derechos reservados. No reutilices las imágenes sin permiso.

## Despliegue

Es un sitio estático: en Vercel basta con importar el repositorio, elegir el preset **Other**, dejar vacíos el comando de build y el directorio de salida y desplegar. Esta versión de demostración lleva `noindex` y un `robots.txt` que bloquea a los buscadores para no competir con la web real de la marca.
