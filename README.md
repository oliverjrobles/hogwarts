# Om projektet

I denne opgave har jeg lavet en REST API til Hogwarts, hvor man kan arbejde med elever, lærere, huse og kurser.

Jeg har brugt Node.js, Express og PostgreSQL til at lave API'en og databasen.

Med API'en kan man hente oplysninger, oprette nye elever, lærere og kurser, opdatere dem og slette dem igen. Man kan også tilføje og fjerne elever fra forskellige kurser.

# Teknologier

Jeg har brugt følgende til projektet:

- Node.js og Express til at lave API'en
- PostgreSQL til databasen
- pgAdmin til at arbejde med databasn
- Bruno til at teste mine endpoints
- VSCode til at skrive koden

# Hvordan jeg har opdelt projektet

Jeg har delt projektet op i forskellige mapper, så det er nemmere at finde rundt i koden.

- src/index.js – Her starter serveren.
- routes – Her ligger alle mine endpoints.
- controllers – Her håndterer jeg requests og responses.
- repositories – Her ligger mine SQL-forespørgsler.
- db.js – Her laver jeg forbindelsen til databasen.
- hogwarts.sql – SQL-fil med tabeller og testdata.
- hogwarts-API-test – Her ligger mine Bruno-tests.

# Sådan starter man projektet

1. Download projektet fra GitHub.
2. Åbn projektet i VS Code.
3. Åbn terminalen, og skriv npm install.
4. Opret en .env-fil med databaseoplysninger ud fra .env.example.
5. Opret databasen i PostgreSQL, og importér hogwarts.sql.
6. Start serveren med npm run dev, hvis det er sat op i package.json.

Serveren kører på port 3000.

## Mine endpoints

# Houses

- GET /houses – Henter alle huse.
- GET /houses/:id – Henter et bestemt hus.

# Teachers

- GET /teachers – Henter alle lærere.
- GET /teachers/:id – Henter en bestemt lærer.
- POST /teachers – Opretter en ny lærer.
- PUT /teachers/:id – Opdaterer en lærer.
- DELETE /teachers/:id – Sletter en lærer.

# Students

- GET /students – Henter alle elever.
- GET /students/:id – Henter en bestemt elev.
- POST /students – Opretter en ny elev.
- PUT /students/:id – Opdaterer en elev.
- DELETE /students/:id – Sletter en elev.

### Courses

- GET /courses – Henter alle kurser.
- GET /courses/:id – Henter et bestemt kursus.
- POST /courses – Opretter et nyt kursus.
- PUT /courses/:id – Opdaterer et kursus.
- DELETE /courses/:id – Sletter et kursus.
- PUT /courses/:id/teacher – Skifter lærer på et kursus.
- POST /courses/:id/students – Tilføjer en elev til et kursus.
- DELETE /courses/:id/students/:studentId – Fjerner en elev fra et kursus.

# Databasen

Min database består af fem tabeller:

- houses
- teachers
- students
- courses
- student_courses

Jeg bruger student_courses til at forbinde elever og kurser.

Det betyder, at en elev godt kan være tilmeldt flere kurser, og at et kursus kan have flere elever.

Tabellerne er forbundet med primary keys og foreign keys, så de forskellige oplysninger hænger sammen.

# Test af API'en

Jeg har brugt Bruno til at teste mine endpoints.

Mine requests ligger i mappen hogwarts-API-test, så man kan åbne mappen som en collection i Bruno og teste de forskellige endpoints.

Serveren skal være startet, og databasen skal være tilsluttet, før man kan teste dem.

# Opdeling af koden

Jeg har valgt at dele min kode op i routes, controllers og repositories i stedet for at have det hele i index.js.

Routes bestemmer, hvilken funktion der skal bruges, når man kalder et endpoint.

Controllers tager imod requesten og sender et svar tilbage.

Repositories står for at hente, oprette, opdatere og slette oplysninger i databasen.

Jeg synes, det gør projektet mere overskueligt, fordi de forskellige dele af koden har hver deres opgave.
