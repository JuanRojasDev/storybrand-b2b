# StoryBrand B2B

Skill para Claude Code que redacta y revisa documentos B2B poniendo **al cliente como héroe y a quien escribe como guía**. Aplica el marco narrativo de siete piezas descrito por Donald Miller en *Building a StoryBrand* a documentos serios de negocio, en español:

- Manifestaciones de interés y respuestas a licitaciones
- Propuestas técnicas y económicas
- Entregables, informes y resúmenes ejecutivos para clientes
- Correos comerciales y de seguimiento
- Presentaciones de venta, brochures y perfiles de empresa
- Textos de webs y dashboards que ve el cliente
- Postulaciones laborales y seguimientos con reclutadores

Se activa sola cuando le pides a Claude cualquiera de esos documentos, aunque no menciones StoryBrand.

## Qué la diferencia

- **Formato antes que narrativa.** Si hay pliego, términos de referencia o formato obligatorio, eso manda; el marco solo se usa en las partes con libertad de redacción.
- **No inventa evidencia.** Proyectos, cifras, certificaciones y fechas pasadas que falten quedan como marcadores `[ ]` para completar. En una licitación, un dato no acreditable puede descalificar la oferta.
- **Sí propone lo accionable.** Fechas sugeridas, pasos y responsables se escriben, marcados como propuesta, para que el documento lleve a una decisión.
- **Chequeo antes de entregar.** Una lista de verificación que el agente aplica a su propio texto.
- **Guía por tipo de documento** y notas de contratación pública (con Colombia como ejemplo).

## Instalación

En una sesión de Claude Code:

```text
/plugin marketplace add JuanRojasDev/storybrand-b2b
/plugin install storybrand-b2b@storybrand-b2b
```

Desde la terminal:

```bash
claude plugin marketplace add JuanRojasDev/storybrand-b2b
claude plugin install storybrand-b2b@storybrand-b2b
```

Instalación manual: copia la carpeta `skills/storybrand-b2b/` a `~/.claude/skills/`.

### Agrega tu propio contexto

La skill es genérica. Para que conozca tu empresa, agrega unas líneas a tu `CLAUDE.md` (global o del proyecto), por ejemplo: qué servicios ofreces, quiénes son tus clientes típicos y qué productos propios tienes. Así la información de tu negocio queda en tu máquina y no en la skill.

## Uso

Pídelo normal:

> Necesito la carta de manifestación de interés para la invitación de consultoría ambiental que publicó la gobernación. Somos una firma de ingeniería con experiencia en interventoría.

La skill arma primero el guion del cliente (siete piezas en una línea cada una), redacta el documento y te indica qué marcadores completar y qué propuestas confirmar.

## Pruebas

Se comparó con Claude sin la skill en tres casos (manifestación de interés, resumen ejecutivo de un proyecto de certificación y correo de seguimiento comercial), usando criterios verificables: apertura centrada en el cliente, plan en pasos, llamado a la acción concreto, cero datos inventados y brevedad. Con la skill se cumplió el 100 % de los criterios frente al 63 % sin ella. Es una muestra pequeña: tómalo como señal, no como garantía.

## Créditos y aviso

Inspirada en el libro *Building a StoryBrand* de Donald Miller. Esta skill es un proyecto independiente: **no está afiliada, patrocinada ni respaldada por Donald Miller, StoryBrand ni Business Made Simple**. "StoryBrand" es una marca de sus respectivos titulares y se usa solo para describir el marco en el que se inspira. La skill no reproduce texto del libro; si quieres el método completo, lee el libro.

## Licencia

[CC BY 4.0](LICENSE): puedes compartirla y adaptarla para cualquier fin, dando crédito a JuanRojasDev.

## Comentarios

¿Ideas o problemas con el método? Abre un [issue](https://github.com/JuanRojasDev/storybrand-b2b/issues).
