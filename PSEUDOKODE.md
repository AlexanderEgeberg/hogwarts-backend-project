# Pseudokode

Gælder alle endpoints: ugyldigt id eller ugyldig body giver **400**.

## Houses

### GET /houses

- Hent alle houses: svar **200**

### GET /houses/:name

- Hent house med navnet
- Findes ikke: svar **404**
- Ellers svar **200**

## Students

### GET /students

Som GET /houses.

### GET /students/:id

Som GET /houses/:name.

### POST /students

- Findes house ikke: svar **400**
- Opret student: svar **201**

### PUT /students/:id

- Findes house ikke: svar **400**
- Opdater student
- Findes student ikke: svar **404**
- Ellers svar **200**

### DELETE /students/:id

- Slet student (tilmeldinger slettes automatisk)
- Findes ikke: svar **404**
- Ellers svar **204**

## Teachers

Som students. Når en teacher slettes, slettes teacherens courses automatisk.

## Courses

### GET /courses

Som GET /houses.

### GET /courses/:id

- Hent course
- Findes ikke: svar **404**
- Hent de students, der er tilmeldt
- Svar med course + students: svar **200**

### POST /courses

Som POST /students, men tjek at teacher findes.

### PUT /courses/:id

Som PUT /students/:id, men tjek at teacher findes.

### DELETE /courses/:id

Som DELETE /students/:id.

### PUT /courses/:id/teacher

- Findes course ikke: svar **404**
- Findes teacher ikke: svar **400**
- Skift teacher: svar **200**

### POST /courses/:id/students

- Findes course ikke: svar **404**
- Findes student ikke: svar **400**
- Er student allerede tilmeldt: svar **409**
- Tilmeld student: svar **201**

### DELETE /courses/:id/students/:studentId

- Findes course ikke: svar **404**
- Fjern tilmelding
- Var student ikke tilmeldt: svar **404**
- Ellers svar **204**
