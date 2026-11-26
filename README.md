# TaskFlow — Full-Stack Kanban Task Management App

A full-stack Kanban task management web application built with **React + Vite**, **Java + Spring Boot**, **Spring Security (BCrypt)**, and **MySQL**.

## Tech Stack
- **Frontend:** React, Vite, JavaScript, HTML5, CSS3
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
- **Database:** MySQL

## Key Features
- Three-column Kanban board (**To Do**, **In Progress**, **Done**)
- User authentication with BCrypt password hashing and CORS configuration
- Full task CRUD operations via REST APIs (/api/tasks) and real-time client search filtering

## How to Run Locally
1. **Backend:** Run `.\mvnw.cmd spring-boot:run` from the root folder (runs on `http://localhost:8081`).
2. **Frontend:** Run `cd taskflow-frontend`, `npm install`, and `npm run dev` (runs on `http://localhost:5173`).
