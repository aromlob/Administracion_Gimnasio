# Gimnasio_Grupo4

| Alumnos  | Fecha              | Asignatura     | Curso   |
| -------- | ------------------ | -------------- | ------- |
| Ángela  | Inicio: 07-11-2024 | Acceso a datos | 2º DAM |
| Santiago | Fin:               | Acceso a datos | 2º DAM |

# Explicación del proyecto

Queremos organizar la información de un gimnasio con las siguientes tablas:

1. **Cliente -->** El cliente tendra un **id** **único** y se almacenará su **nombre**, el **correo**, **fecha de registro** y **número de teléfono.** Cada cliente puede tener una o más **Planes de Membresía** por ende un cliente puede suscribirse a múltiples planes a lo largo del tiempo. Por último, cada cliente puede reservar varias **Sesiones**.
2. **Entrenador -->** El entrenador tendra un **id único** y se almacenará su **nombre**, una **especialidad** (como pesas, cardio, yoga, etc ) y el **nivel de experiencia**.
3. **Plan de Membresía -->** El plan de membresía tendrá un **id único** y se almacenará su **nombre del plan** (por ejemplo "Mensual Básico", "Anual Prium"), una **duración en meses** y el **costo**.
4. **Sesion -->** Cada sesion tiene un **id único** y se alamacenara **fecha** y **hora de inicio**, y una **duración en minutos**. Cada sesión es atendida por **un solo entrenador** y **un solo cliente.**

# ¿Cómo se ha generado la base de datos?
