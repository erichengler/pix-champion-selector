-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Create user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Create champions table
CREATE TABLE "champions" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"title" VARCHAR (100),
	"image" VARCHAR (500),
	"portrait" VARCHAR (500),
	"class" VARCHAR (50),
	"difficulty" INT,
	"region" VARCHAR (50),
	"lore" VARCHAR (5000)
);

-- Create notes table
CREATE TABLE "notes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions",
	"note" VARCHAR (250)
);

-- Create favorites table
CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions"
);

-- Create blacklist table
CREATE TABLE "blacklist" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions"
);