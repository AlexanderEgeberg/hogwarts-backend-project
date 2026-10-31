# Hogwarts Course Management System
Jeg har lavet det med `yarn` og `TypeScript` af vane sag, håber ikke det er et problem
`npm run` virker stadigvæk, så bare brug det

## Requirements
`Node Version 24+` 

## Kom i gang
Lav en kopi af api/.env.example og navngiv den .env
indsæt værdier inde i <> 

derefter åbn terminal og kør:
```sh
cd api
npm install
npm run db:reset    # det kører db/hogwarts.sql filen ALTERNATIV kør hogwarts.sql inde i pgadmin query tool
npm run dev   # API kører på http://localhost:8080 - eller hvad du har sat PORT til inde i .env
```


`db/hogwarts.sql` kan også åbnes og køres direkte i query tool pgAdmin.

## Endpoints

### Houses

| Method | Route           | Beskrivelse        |
| ------ | --------------- | ------------------ |
| GET    | `/houses`       | get all houses     |
| GET    | `/houses/:name` | get house by name  |

### Teachers

| Method | Route           | Beskrivelse        |
| ------ | --------------- | ------------------ |
| GET    | `/teachers`     | get all teachers   |
| GET    | `/teachers/:id` | get teacher by id  |
| POST   | `/teachers`     | create teacher     |
| PUT    | `/teachers/:id` | update teacher     |
| DELETE | `/teachers/:id` | delete teacher     |

### Students

| Method | Route           | Beskrivelse        |
| ------ | --------------- | ------------------ |
| GET    | `/students`     | get all students   |
| GET    | `/students/:id` | get student by id  |
| POST   | `/students`     | create student     |
| PUT    | `/students/:id` | update student     |
| DELETE | `/students/:id` | delete student     |

### Courses

| Method | Route                              | Beskrivelse                    |
| ------ | ---------------------------------- | ------------------------------ |
| GET    | `/courses`                         | get all courses                |
| GET    | `/courses/:id`                     | get course with its students   |
| POST   | `/courses`                         | create course                  |
| PUT    | `/courses/:id`                     | update course                  |
| DELETE | `/courses/:id`                     | delete course                  |
| PUT    | `/courses/:id/teacher`             | change teacher on course       |
| POST   | `/courses/:id/students`            | add student to course          |
| DELETE | `/courses/:id/students/:studentId` | remove student from course     |

Pseudokode for hvert endpoint ligger i [PSEUDOKODE.md](PSEUDOKODE.md).

## Endpoint-tests (Bruno)

Testene ligger i mappen [`bruno/`](bruno/) – én request pr. endpoint, hver med et assert på statuskoden.

1. Åbn Bruno
2. Vælg **Open Collection** og åbn mappen `bruno/`.
3. Reset databasen inden `npm run db:reset` så værdierne passer til test
4. Start api (`npm run dev`)
5. Kør en enkelt request, eller højreklik på collectionen og vælg **Run** for at køre dem alle.

`baseUrl` er sat til `http://localhost:8080` i collection-indstillingerne – ret den der, hvis du bruger en anden `PORT`.
