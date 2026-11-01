--
-- PostgreSQL database dump
--

\restrict NV4s9w6W48nx2XCqdEZbFWqFdXpHUlZbHqkkuA4uGGCZK8iTQ50DM8gimpOdVDX

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.4

-- Started on 2026-11-01 22:37:33 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24615)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    teacher_id integer
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24614)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO postgres;

--
-- TOC entry 3868 (class 0 OID 0)
-- Dependencies: 225
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 220 (class 1259 OID 24583)
-- Name: houses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.houses (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    founder character varying(100)
);


ALTER TABLE public.houses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24582)
-- Name: houses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.houses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.houses_id_seq OWNER TO postgres;

--
-- TOC entry 3869 (class 0 OID 0)
-- Dependencies: 219
-- Name: houses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.houses_id_seq OWNED BY public.houses.id;


--
-- TOC entry 227 (class 1259 OID 24628)
-- Name: student_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_courses (
    student_id integer NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.student_courses OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24601)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    house_id integer
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24600)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_id_seq OWNER TO postgres;

--
-- TOC entry 3870 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- TOC entry 222 (class 1259 OID 24592)
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    subject character varying(100)
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24591)
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teachers_id_seq OWNER TO postgres;

--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 221
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- TOC entry 3692 (class 2604 OID 24618)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 3689 (class 2604 OID 24586)
-- Name: houses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.houses ALTER COLUMN id SET DEFAULT nextval('public.houses_id_seq'::regclass);


--
-- TOC entry 3691 (class 2604 OID 24604)
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- TOC entry 3690 (class 2604 OID 24595)
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- TOC entry 3861 (class 0 OID 24615)
-- Dependencies: 226
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses VALUES (2, 'Potions', 2);
INSERT INTO public.courses VALUES (3, 'Charms', 3);
INSERT INTO public.courses VALUES (4, 'Herbology', 4);
INSERT INTO public.courses VALUES (5, 'Defence Against the Dark Arts', 5);
INSERT INTO public.courses VALUES (1, 'Advanced Potions', 2);
INSERT INTO public.courses VALUES (7, 'Defense Against the Dark Arts', 1);


--
-- TOC entry 3855 (class 0 OID 24583)
-- Dependencies: 220
-- Data for Name: houses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.houses VALUES (1, 'Gryffindor', 'Godric Gryffindor');
INSERT INTO public.houses VALUES (2, 'Slytherin', 'Salazar Slytherin');
INSERT INTO public.houses VALUES (3, 'Ravenclaw', 'Rowena Ravenclaw');
INSERT INTO public.houses VALUES (4, 'Hufflepuff', 'Helga Hufflepuff');


--
-- TOC entry 3862 (class 0 OID 24628)
-- Dependencies: 227
-- Data for Name: student_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.student_courses VALUES (1, 1);
INSERT INTO public.student_courses VALUES (1, 2);
INSERT INTO public.student_courses VALUES (1, 3);
INSERT INTO public.student_courses VALUES (2, 1);
INSERT INTO public.student_courses VALUES (2, 2);
INSERT INTO public.student_courses VALUES (2, 3);
INSERT INTO public.student_courses VALUES (3, 2);
INSERT INTO public.student_courses VALUES (3, 3);
INSERT INTO public.student_courses VALUES (4, 2);
INSERT INTO public.student_courses VALUES (5, 3);
INSERT INTO public.student_courses VALUES (6, 4);


--
-- TOC entry 3859 (class 0 OID 24601)
-- Dependencies: 224
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.students VALUES (2, 'Hermione Granger', 1);
INSERT INTO public.students VALUES (3, 'Ron Weasley', 1);
INSERT INTO public.students VALUES (4, 'Draco Malfoy', 2);
INSERT INTO public.students VALUES (5, 'Luna Lovegood', 3);
INSERT INTO public.students VALUES (6, 'Cedric Diggory', 4);
INSERT INTO public.students VALUES (1, 'Harry James Potter', 1);


--
-- TOC entry 3857 (class 0 OID 24592)
-- Dependencies: 222
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teachers VALUES (1, 'Minerva McGonagall', 'Transfiguration');
INSERT INTO public.teachers VALUES (2, 'Severus Snape', 'Potions');
INSERT INTO public.teachers VALUES (3, 'Filius Flitwick', 'Charms');
INSERT INTO public.teachers VALUES (4, 'Pomona Sprout', 'Herbology');
INSERT INTO public.teachers VALUES (5, 'Remus Lupin', 'Defence Against the Dark Arts');
INSERT INTO public.teachers VALUES (6, 'Albus Dumbledore', 'Defence Against the Dark Arts');


--
-- TOC entry 3872 (class 0 OID 0)
-- Dependencies: 225
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 7, true);


--
-- TOC entry 3873 (class 0 OID 0)
-- Dependencies: 219
-- Name: houses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.houses_id_seq', 4, true);


--
-- TOC entry 3874 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 7, true);


--
-- TOC entry 3875 (class 0 OID 0)
-- Dependencies: 221
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 7, true);


--
-- TOC entry 3700 (class 2606 OID 24622)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3694 (class 2606 OID 24590)
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- TOC entry 3702 (class 2606 OID 24634)
-- Name: student_courses student_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_courses
    ADD CONSTRAINT student_courses_pkey PRIMARY KEY (student_id, course_id);


--
-- TOC entry 3698 (class 2606 OID 24608)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3696 (class 2606 OID 24599)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 3704 (class 2606 OID 24623)
-- Name: courses courses_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


--
-- TOC entry 3705 (class 2606 OID 24640)
-- Name: student_courses student_courses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_courses
    ADD CONSTRAINT student_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 3706 (class 2606 OID 24635)
-- Name: student_courses student_courses_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_courses
    ADD CONSTRAINT student_courses_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- TOC entry 3703 (class 2606 OID 24609)
-- Name: students students_house_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_house_id_fkey FOREIGN KEY (house_id) REFERENCES public.houses(id);


-- Completed on 2026-11-01 22:37:34 CET

--
-- PostgreSQL database dump complete
--

\unrestrict NV4s9w6W48nx2XCqdEZbFWqFdXpHUlZbHqkkuA4uGGCZK8iTQ50DM8gimpOdVDX

