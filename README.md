# Project 5 – Full Stack FavLinks (Postgres, Express, React, Node)

A full-stack CRUD app that lets users save favorite links.

## Tech Stack
- React (frontend)
- Node.js + Express (backend API)
- PostgreSQL (database)

## Features (CRUD)
- Create a link (title + url)
- Read all links
- Update a link
- Delete a link

## Environment Variables
Create `server/.env` (do not commit it):

DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project4db

## Run Locally
### 1) Database
Start PostgreSQL, then create table:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL
);
