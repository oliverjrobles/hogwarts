# Hvordan min API fungerer

Jeg har delt min kode op i routes, controllers og repositories, så det hele ikke ligger i én stor fil.

Når jeg sender en request fra Bruno, går den først gennem routes, som sender den videre til den rigtige controller. Controlleren bruger derefter repository til at hente eller ændre noget i databasen og sender et svar tilbage.

Jeg bruger også try/catch til at fange fejl, hvis noget ikke virker.

# 1. GET – Hent alle

Gælder for: GET /houses, GET /teachers, GET /students, GET /courses

Hent alle fra den relevante tabel i databasen.

Hvis det virker:

- Send listen tilbage som JSON med status 200.

Hvis der sker en fejl:

- Log fejlen.
- Send status 500.

# 2. GET – Hent én med ID

Gælder for: GET /houses/:id, GET /teachers/:id, GET /students/:id, GET /courses/:id

Hent ID fra URL'en.

Brug repository til at finde det rigtige ID i databasen.

Hvis der ikke findes noget med det ID:

- Send status 404.

Ellers:

- Send resultatet tilbage med status 200.

Hvis der sker en uventet fejl:

- Send status 500.

# 3. POST – Opret noget nyt

Gælder for: POST /teachers, POST /students, POST /courses

Hent oplysningerne fra request body.

Send oplysningerne videre til repository, som opretter en ny række i databasen.

Hvis det lykkes:

- Send det nye objekt tilbage med status 201.

Hvis noget går galt:

- Send status 500.

# 4. PUT – Opdater noget

Gælder for: PUT /teachers/:id, PUT /students/:id, PUT /courses/:id

Hent ID fra URL'en.

Hent de nye oplysninger fra request body.

Brug repository til at opdatere oplysningerne i databasen.

Hvis ID'et ikke findes:

- Send status 404.

Ellers:

- Send det opdaterede objekt med status 200.

Hvis der sker en fejl:

- Send status 500.

# 5. DELETE – Slet noget

Gælder for: DELETE /teachers/:id, DELETE /students/:id, DELETE /courses/:id

Hent ID fra URL'en.

Brug repository til at slette den valgte række fra databasen.

Hvis ID'et ikke findes:

- Send status 404.

Ellers:

- Send status 200 og en besked om, at det blev slettet.

Hvis der sker en fejl:

- Send status 500.

# 6. Skift lærer på et kursus

Gælder for: PUT /courses/:id/teacher

Hent kursets ID fra URL'en.

Hent teacher_id fra request body.

Brug repository til at ændre læreren på kurset.

Hvis kurset ikke findes:

- Send status 404.

Ellers:

- Send det opdaterede kursus med status 200.

Hvis noget går galt:

- Send status 500.

# 7. Tilføj en elev til et kursus

Gælder for: POST /courses/:id/students

Hent kursets ID fra URL'en.

Hent student_id fra request body.

Brug repository til at tilføje eleven til kurset.

Forbindelsen mellem eleven og kurset bliver gemt i tabellen student_courses.

Hvis kurset eller eleven ikke findes:

- Send status 404.

Ellers:

- Send status 201.

Hvis der sker en fejl:

- Send status 500.

# 8. Fjern en elev fra et kursus

Gælder for: DELETE /courses/:id/students/:studentId

Hent både kursets ID og elevens ID fra URL'en.

Brug repository til at fjerne forbindelsen mellem eleven og kurset i student_courses.

Hvis forbindelsen ikke findes:

- Send status 404.

Ellers:

- Send status 200 og en besked om, at eleven er fjernet.

Hvis der sker en fejl:

- Send status 500.

# Statuskoder

Her er de statuskoder, jeg bruger i min API:

- **200** – Det virkede, og jeg får et svar tilbage.
- **201** – Noget nyt er blevet oprettet.
- **404** – Det, jeg leder efter, findes ikke.
- **500** – Der er sket en fejl på serveren.

# Kort opsummering

De fleste af mine endpoints fungerer egentlig på samme måde. Routes finder den rigtige controller, controlleren håndterer requesten, og repository står for SQL-delen.

Derfor har jeg valgt at samle pseudokoden efter GET, POST, PUT og DELETE i stedet for at skrive næsten det samme mange gange.
