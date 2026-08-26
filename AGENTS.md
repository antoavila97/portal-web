# AGENTS.md — Portal Web Puerto Varador

Instrucciones para el asistente (opencode) al trabajar en este proyecto.

## Memoria persistente

El vault de Obsidian en `E:\PROYECTO SOCIOCOMUNITARIO PRODUCTIVO\vault\` funciona como memoria del asistente. Son archivos markdown: leer/editar directamente con las herramientas de archivos.

### Protocolo de memoria
1. **Al iniciar una sesión** (o antes de una tarea importante): leer `vault/memoria/proyecto.md` y `vault/memoria/decisiones.md` para recuperar contexto.
2. **Después de una decisión técnica relevante**: agregarla a `vault/memoria/decisiones.md` (fecha, decisión, motivo).
3. **Cuando el usuario exprese una preferencia** de trabajo: registrarla en `vault/memoria/preferencias.md`.
4. **Cambios grandes en el proyecto**: actualizar `vault/memoria/proyecto.md` (estado, stack, estructura).
5. Si el usuario pregunta algo sobre sus notas personales, buscar con Grep en `vault/notas/`.

### Reglas
- Mantener las notas concisas y actualizadas; borrar información obsoleta en vez de acumular.
- Nunca guardar secretos ni claves en el vault.
- La carpeta `vault/notas/` es del usuario: solo leer o modificar si lo pide.
