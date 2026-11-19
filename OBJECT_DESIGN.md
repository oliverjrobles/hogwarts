# Hogwarts 2.0 – Object Design

## Formål

Dette dokument beskriver, hvordan Hogwarts API modtager
og returnerer JSON-data.

API'et er bygget med Express.js og PostgreSQL.

Vi arbejder med følgende ressourcer:

- Houses
- Courses
- Teachers
- Students
- Grades
- Exams

Formålet med Object Design er at definere strukturen
på de objekter, som bruges i vores REST API.

---

## 1. Courses

### POST /courses

Input (Request Body):

```json
{
  "name": "Defence Against the Dark Arts",
  "teacher_id": 1,
  "type": "core",
  "level": "NEWT",
  "school_year": 6
}
```

Output (201 Created):

```json
{
  "id": 10,
  "name": "Defence Against the Dark Arts",
  "teacher_id": 1,
  "type": "core",
  "level": "NEWT",
  "school_year": 6
}
```

### Valideringsregler

- name er påkrævet.
- teacher_id skal referere til en eksisterende lærer.
- type kan være core, elective eller extra-curricular.
- level kan være OWL eller NEWT.
- school_year skal være et tal mellem 1 og 7.
- OWL er ikke tilladt i skoleår 6 og 7.

### Endpoints

- GET /courses
- GET /courses/:id
- POST /courses
- PUT /courses/:id
- DELETE /courses/:id

---

## 2. Teachers

### POST /teachers

Input (Request Body):

```json
{
  "name": "Remus Lupin",
  "subject": "Defence Against the Dark Arts",
  "employment_start": "1993-09-01",
  "currently_active": true,
  "deceased": false
}
```

Output (201 Created):

```json
{
  "id": 22,
  "name": "Remus Lupin",
  "subject": "Defence Against the Dark Arts",
  "house_id": null,
  "employment_start": "1993-09-01T00:00:00.000Z",
  "currently_active": true,
  "deceased": false
}
```

### Valideringsregler

- name er påkrævet.
- subject er påkrævet.
- employment_start skal være en gyldig dato.
- currently_active skal være en boolean.
- deceased skal være en boolean.
- En aktiv lærer må ikke have en ansættelsesdato i fremtiden.
- deceased og currently_active er uafhængige felter.

### Endpoints

- GET /teachers
- GET /teachers/:id
- POST /teachers
- PUT /teachers/:id
- DELETE /teachers/:id

---

## 3. Students

### POST /students

Input (Request Body):

```json
{
  "name": "Harry Potter",
  "house_id": 1,
  "birthday": "1980-07-31",
  "school_year": 5
}
```

Output (201 Created):

```json
{
  "id": 15,
  "name": "Harry Potter",
  "house_id": 1,
  "birthday": "1980-07-31T00:00:00.000Z",
  "school_year": 5
}
```

### Valideringsregler

- name er påkrævet.
- house_id skal referere til et eksisterende hus.
- birthday skal være en gyldig dato.
- school_year skal være et heltal mellem 1 og 7.
- school_year behøver ikke matche elevens alder.

### Endpoints

- GET /students
- GET /students/:id
- POST /students
- PUT /students/:id
- DELETE /students/:id

---

## 4. Grades

Grades indeholder Hogwarts' karaktersystem.

Denne ressource er read-only.
Klienten kan derfor hente karakterer, men ikke
oprette, opdatere eller slette dem.

### GET /grades/1

Input:

Ingen request body.

Output (200 OK):

```json
{
  "id": 1,
  "letter": "O",
  "name": "Outstanding",
  "description": "Excellent performance",
  "is_pass": true
}
```

### Karaktersystem

| Letter | Name                 | Passed |
| ------ | -------------------- | ------ |
| O      | Outstanding          | true   |
| E      | Exceeds Expectations | true   |
| A      | Acceptable           | true   |
| P      | Poor                 | false  |
| D      | Dreadful             | false  |
| T      | Troll                | false  |

### Valideringsregler

- letter skal være unik.
- name er påkrævet.
- description beskriver karakteren.
- is_pass skal være en boolean.

### Endpoints

- GET /grades
- GET /grades/:id

---

## 5. Exams

Exams forbinder en elev med et kursus
og en karakter.

Hver eksamen refererer til:

- course_id
- student_id
- grade_id

### POST /exams

Input (Request Body):

```json
{
  "course_id": 1,
  "student_id": 1,
  "grade_id": 2
}
```

Output (201 Created):

```json
{
  "id": 2,
  "course_id": 1,
  "student_id": 1,
  "grade_id": 2
}
```

### PUT /exams/:id

Input (Request Body):

```json
{
  "course_id": 1,
  "student_id": 1,
  "grade_id": 1
}
```

Output (200 OK):

```json
{
  "id": 2,
  "course_id": 1,
  "student_id": 1,
  "grade_id": 1
}
```

### Valideringsregler

- course_id skal referere til et eksisterende kursus.
- student_id skal referere til en eksisterende elev.
- grade_id skal referere til en eksisterende karakter.
- Alle tre ID'er skal være positive heltal.

### Endpoints

- GET /exams
- GET /exams/:id
- POST /exams
- PUT /exams/:id
- DELETE /exams/:id

---

## 6. Houses

Houses er en eksisterende ressource fra Hogwarts 1.0.

### GET /houses/:id

Input:

Ingen request body.

Output (200 OK):

```json
{
  "id": 1,
  "name": "Gryffindor",
  "founder": "Godric Gryffindor"
}
```

### Relationer

- Et hus kan have flere elever.
- En elev tilhører et hus.
- En lærer kan være knyttet til et hus.

---

## 7. Relationer mellem ressourcer

Houses:

- Har mange Students.
- Kan have mange Teachers.

Teachers:

- Kan undervise på flere Courses.

Courses:

- Har en Teacher.
- Kan have flere Students gennem student_courses.
- Kan have flere Exams.

Students:

- Tilhører et House.
- Kan deltage i flere Courses.
- Kan have flere Exams.

Grades:

- Kan være knyttet til flere Exams.

Exams:

- Tilhører et Course.
- Tilhører en Student.
- Har en Grade.

---

## 8. HTTP-statuskoder

API'et bruger følgende statuskoder:

| Status | Betydning             |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 204    | No Content            |
| 400    | Bad Request           |
| 404    | Not Found             |
| 409    | Conflict              |
| 500    | Internal Server Error |

Fejl håndteres gennem en central
errorhandler i Express.

---

## 9. Arkitektur

Projektet bruger følgende struktur:

Routes:
Modtager HTTP-requests og vælger controller.

Controllers:
Behandler request-data, validerer input
og returnerer HTTP-responses.

Repositories:
Kommunikerer med PostgreSQL-databasen.

Database:
Gemmer ressourcer og relationer mellem tabeller.

Errorhandler:
Håndterer fejl og returnerer passende
HTTP-statuskoder og JSON-fejlbeskeder.

---

## 10. Konklusion

Hogwarts 2.0 udvider det eksisterende API
med flere oplysninger om kurser, lærere og elever.

Derudover er Grades og Exams tilføjet som
nye ressourcer.

API'et understøtter CRUD-operationer,
relationer mellem ressourcer og validering
af data.

Object Design beskriver strukturen på
de JSON-objekter, som klienten sender til
og modtager fra API'et.
