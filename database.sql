-- DATABASE NAME: "grid_iron"


-- user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- league table
CREATE TABLE "league" (
    "id" SERIAL PRIMARY KEY,
    "league_name" VARCHAR (80) UNIQUE NOT NULL,
    "is_private" BOOLEAN DEFAULT false,
    "max_users" INT DEFAULT 100
);

-- user/league many-to-many, holds pick information
CREATE TABLE "picks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "league_id" INT REFERENCES "league",
    "week" INT,
    "team" VARCHAR (3),
    "amount" INT
);

-- game data table for API stats
CREATE TABLE "game_data" (
    "id" SERIAL PRIMARY KEY,
    "week" INT,
    "team" VARCHAR (3),
    "is_winner" BOOLEAN
);