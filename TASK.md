# Hogwarts Course Management System – del II

Du skal lave en backend og database til at håndtere Courses, Teachers, Students og Houses. Denne opgave er en videreudvikling på den opgave du er påbegyndt henover efterårsferien, nu kommer der blot mere specifikke krav.

Du skal have en database med tabeller for courses, teachers, students og houses. Både teacher og student har et name og et house. Course har et name, en teacher og en liste af students.

Databasen skal være normaliseret korrekt, og anvende både primary og foreign keys, så det sikres at alle relationer forbliver korrekte.

Du skal lave en backend med REST API med disse CRUD endpoints:

| Houses   | Teachers   | Students   | Courses          |
| -------- | ---------- | ---------- | ---------------- |
| R all    | R all      | R all      | R all            |
| R single | R single   | R single   | R single         |
|          | C new      | C new      | C new            |
|          | U existing | U existing | U existing       |
|          |            |            | U change teacher |
|          |            |            | U add student    |
|          |            |            | U remove student |
|          | D existing | D existing | D existing       |

Alle endpoints skal være i form af “wellformed restful API” – altså med method og route som man ville forvente i et standard REST API.

Der skal meldes korrekte statuskoder tilbage, som fx 200, 201, 204, 404, etc. 500 må kun bruges i nødstilfælde, ved uforudsete fejl. Der er ikke noget krav om detaljerede fejlmeddelelser.

Der skal ikke laves nogen frontend. Men der er krav til kodestrukturen af backenden!

## Kodestruktur

Koden skal være opdelt i undermapper og moduler efter følgende skabelon:

Der skal være mapper til:

- routes
- controllers
- services
- repositories

og i hver mappe skal der så ligge separate filer til hhv. houses, teachers, students og courses – hvis det altså er nødvendigt. Fx vil der næppe være services til alle.

Alle filer skal laves som JavaScript modules, der eksporteres og importeres – altså ikke noget commonjs require!

Der skal være solid Separation of Concerns – så **routes** kun håndterer, well, routes, **controllers** tager sig af request og response-objekter, og beder **repositories** om data, og kun repositories må vide noget om SQL. Og hvis der er mere komplekse regler end blot at sende data videre fra API’et til databasen, så er det en **service** der skal tage sig af det.

Navngiv filer med både hvilken form for data de tager sig af, og hvilken type de er, for eksempel `houses.controller.js` og `houses.repository.js` og så videre i den stil.

## Kodedokumentation

Du skal beskrive dine endpoints i pseudokode, altså rå overordnede “danske” beskrivelser af hvad der skal ske i en GET /teachers, en PUT /teachers/:id og så videre.

Du må gerne nøjes med at beskrive hvert “mønster” én gang, og fx skrive at GET /teachers er ligesom GET /houses, hvis det er tilfældet.

## GitHub repository

Du skal **aflevere et link til dit github repository** der indeholder al koden.

Derudover skal det også indeholde:

- en sql-fil der kan åbnes i en query-console i fx DataGrip eller pgAdmin, og køres så den opretter alle tabeller med noget eksempel-data
- en fil eller mappe med en samling af endpoint-tests til fx PostMan, Insomnia, Bruno eller andet – der skal være tests til samtlige endpoints, så man kan prøve applikationen af uden at skulle oprette yderligere selv.
- en `.env.example` fil der beskriver hvilke variable der skal skrives ind i en .env fil _(som selvfølgelig ikke er committed med)_
- en `README.md` fil med
  - liste over alle endpoints med method og route, og en meget kort beskrivelse – fx “get all houses”
  - kort beskrivelse af hvordan man skal bruge endpoint-testene
- en `PSEUDOKODE.md` fil med
  - pseudokode for hvert af dine endpoints

## Aflevering

Husk, det er en obligatorisk aflevering – du SKAL aflevere inden deadline!

### Hvad

Du skal aflevere JavaScript kode til backenden, SQL kode til databasen, API-test collections til fx PostMan, Insomnia, Bruno eller lignende, samt en README.md der beskriver endpoints i projektet, og hvordan de testes.

### Hvordan

Paste et link til dit github-repository ind som besvarelse på denne opgave

### Hvornår

Inden deadline, som er **søndag den 1. november** – bemærk at du først lærer om nogle af detaljerne i løbet af ugen op til afleveringen.

### Feedback

Der gives ikke individuel feedback, men vi arbejder efterfølgende videre på projektet, og tager sandsynligvis løsninger op i undervisningen.
