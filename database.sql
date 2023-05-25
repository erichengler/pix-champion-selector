-- ! RUN THE FOLLOWING BEFORE REGISTERING / LOGGING IN

------- Create user table -------
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

------- Create champions table -------
CREATE TABLE "champions" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"title" VARCHAR (100),
	"imageSplash" VARCHAR (500),
	"imageTile" VARCHAR (500),
	"imageSmall" VARCHAR (500),
	"class" VARCHAR (50),
	"difficulty" INT,
	"region" VARCHAR (50),
	"lore" VARCHAR (5000)
);

------- Create notes table -------
CREATE TABLE "notes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions",
	"note" VARCHAR (250)
);

------- Create favorites table -------
CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions"
);

------- Create blacklist table -----
CREATE TABLE "blacklist" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"champion_id" INT REFERENCES "champions"
);

-- ! UPON LOGIN, CHAMPIONS DATABASE WILL BE POPULATED
-- ! AFTER LOGIN, RUN THE FOLLOWING:

------- Riot forgot to give these champions a difficulty -------
UPDATE champions
SET "difficulty" = 
	CASE
		WHEN name IN ('Akshan')
			THEN 9
		WHEN name IN ('Rell')
			THEN 7
		WHEN name IN ('Seraphine')
			THEN 3
		WHEN name IN ('Vex')
			THEN 6
		ELSE "difficulty"
	END;

------- UPDATE CLASSES -------
UPDATE champions
SET "class" =
	-------- Cases where champion has 2 classes -------
	CASE
		WHEN name IN ('Karma', 'Seraphine')
			THEN ARRAY['Burst', 'Enchanter']					
		WHEN name IN ('Akshan', 'Tristana', 'Vayne')
			THEN ARRAY['Marksman', 'Assassin']				
		WHEN name IN ('Diana', 'Rengar')
			THEN ARRAY['Diver', 'Assassin']			
		WHEN name IN ('Varus')
			THEN ARRAY['Marksman', 'Artillery']			
		WHEN name IN ('Senna')
			THEN ARRAY['Marksman', 'Enchanter']			
		WHEN name IN ('Jhin')
			THEN ARRAY['Marksman', 'Catcher']			
		WHEN name IN ('Lux')
			THEN ARRAY['Burst', 'Artillery']			
		WHEN name IN ('Neeko')
			THEN ARRAY['Burst', 'Catcher']			
		WHEN name IN ('Sylas')
			THEN ARRAY['Burst', 'Skirmisher']			
		WHEN name IN ('Pyke')
			THEN ARRAY['Catcher', 'Assassin']			
		WHEN name IN ('Taric')
			THEN ARRAY['Enchanter', 'Warden']			
		WHEN name IN ('Yone')
			THEN ARRAY['Skirmisher', 'Assassin']
		
	------- Cases where champion has 1 class -------	
		WHEN name IN ('Janna', 'Lulu', 'Nami', 'Renata Glasc', 'Sona', 'Soraka', 'Yuumi')
			THEN ARRAY['Enchanter']			
		WHEN name IN ('Bard', 'Blitzcrank', 'Ivern', 'Morgana', 'Rakan', 'Thresh', 'Zyra')
			THEN ARRAY['Catcher']
		WHEN name IN ('Aatrox', 'Darius', 'Dr. Mundo', 'Garen', 'Illaoi', 'Mordekaiser', 'Nasus', 'Sett', 'Shyvana', 'Trundle', 'Udyr', 'Urgot', 'Volibear', 'Yorick')
			THEN ARRAY['Juggernaut']
		WHEN name IN ('Camille', 'Elise', 'Hecarim', 'Irelia', 'Jarvan IV', 'Lee Sin', 'Olaf', 'Pantheon', 'Rek''Sai', 'Renekton', 'Skarner', 'Vi', 'Warwick', 'Wukong', 'Xin Zhao')
			THEN ARRAY['Diver']
		WHEN name IN ('Ahri', 'Annie', 'Brand', 'LeBlanc', 'Lissandra', 'Orianna', 'Syndra', 'Twisted Fate', 'Veigar', 'Vex', 'Zoe')
			THEN ARRAY['Burst']			
		WHEN name IN ('Anivia', 'Aurelion Sol', 'Cassiopeia', 'Karthus', 'Malzahar', 'Rumble', 'Ryze', 'Swain', 'Taliyah', 'Viktor', 'Vladimir')
			THEN ARRAY['Battlemage']			
		WHEN name IN ('Jayce', 'Vel''Koz', 'Xerath', 'Ziggs')
			THEN ARRAY['Artillery']
		WHEN name IN ('Aphelios', 'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal', 'Jinx', 'Kai''Sa', 'Kalista', 'Kindred', 'Kog''Maw', 'Lucian', 'Miss Fortune', 'Samira', 'Sivir', 'Twitch', 'Xayah', 'Zeri')
			THEN ARRAY['Marksman']
		WHEN name IN ('Akali', 'Ekko', 'Evelynn', 'Fizz', 'Kassadin', 'Katarina', 'Kha''Zix', 'Nocturne', 'Qiyana', 'Shaco', 'Talon', 'Zed')
			THEN ARRAY['Assassin']			
		WHEN name IN ('Fiora', 'Gwen', 'Jax', 'Kayn', 'Kled', 'Lillia', 'Master Yi', 'Riven', 'Tryndamere', 'Viego', 'Yasuo')
			THEN ARRAY['Skirmisher']			
		WHEN name IN ('Alistar', 'Amumu', 'Gragas', 'Leona', 'Malphite', 'Maokai', 'Nautilus', 'Nunu & Willump', 'Ornn', 'Rammus', 'Rell', 'Sejuani', 'Sion', 'Zac')
			THEN ARRAY['Vanguard']			
		WHEN name IN ('Braum', 'Galio', 'Poppy', 'Shen', 'Tahm Kench')
			THEN ARRAY['Warden']
		WHEN name IN ('Azir', 'Cho''Gath', 'Fiddlesticks', 'Gangplank', 'Gnar', 'Graves', 'Heimerdinger', 'Kayle', 'Kennen', 'Nidalee', 'Quinn', 'Singed', 'Teemo', 'Zilean')
			THEN ARRAY['Specialist']
	END;
	
------- UPDATE REGIONS -------
UPDATE champions
SET "region" =
	CASE
		WHEN name IN ('Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi')
			THEN 'Bandle City'			
		WHEN name IN ('Fizz', 'Gangplank', 'Graves', 'Illaoi', 'Miss Fortune', 'Nautilus', 'Pyke', 'Tahm Kench', 'Twisted Fate')
			THEN 'Bilgewater'			
		WHEN name IN ('Fiora', 'Galio', 'Garen', 'Jarvan IV', 'Kayle', 'Lucian', 'Lux', 'Morgana', 'Poppy', 'Quinn', 'Shyvana', 'Sona', 'Sylas', 'Vayne', 'Xin Zhao')
			THEN 'Demacia'			
		WHEN name IN ('Ahri', 'Akali', 'Irelia', 'Ivern', 'Jhin', 'Karma', 'Kayn', 'Kennen', 'Lee Sin', 'Lillia', 'Master Yi', 'Wukong', 'Rakan', 'Sett', 'Shen', 'Syndra', 'Varus', 'Xayah', 'Yasuo', 'Yone', 'Zed')
			THEN 'Ionia'			
		WHEN name IN ('Malphite', 'Neeko', 'Nidalee', 'Qiyana', 'Rengar', 'Zyra')
			THEN 'Ixtal'		
		WHEN name IN ('Cassiopeia', 'Darius', 'Draven', 'Katarina', 'Kled', 'Leblanc', 'Mordekaiser', 'Riven', 'Samira', 'Sion', 'Swain', 'Talon', 'Vladimir')
			THEN 'Noxus'			
		WHEN name IN ('Caitlyn', 'Camille', 'Ezreal', 'Heimerdinger', 'Jayce', 'Orianna', 'Seraphine', 'Vi')
			THEN 'Piltover'			
		WHEN name IN ('Elise', 'Gwen', 'Hecarim', 'Kallista', 'Karthus', 'Maokai', 'Thresh', 'Vex', 'Viego', 'Yorick')
			THEN 'Shadow Isles'			
		WHEN name IN ('Akshan', 'Amumu', 'Azir', 'Nasus', 'Rammus', 'Renekton', 'Rengar', 'Sivir', 'Skarner', 'Taliyah', 'Xerath')
			THEN 'Shurima'			
		WHEN name IN ('Aphelios', 'Aurelion Sol', 'Diana', 'Leona', 'Pantheon', 'Soraka', 'Taric', 'Zoe')
			THEN 'Targon'			
		WHEN name IN ('Anivia', 'Ashe', 'Braum', 'Gnar', 'Gragas', 'Lissandra', 'Nunu & Willump', 'Olaf', 'Ornn', 'Sejuani', 'Trundle', 'Tryndamere', 'Udyr', 'Volibear')
			THEN 'The Freljord'			
		WHEN name IN ('Cho''Gath', 'Kai''Sa', 'Kassadin', 'Kha''Zix', 'Kog''Maw', 'Malzahar', 'Rek''Sai', 'Vel''Koz')
			THEN 'The Void'			
		WHEN name IN ('Blitzcrank', 'Dr. Mundo', 'Ekko', 'Janna', 'Jinx', 'Renata Glasc', 'Singed', 'Twitch', 'Urgot', 'Viktor', 'Warwick', 'Zac', 'Ziggs', 'Zeri')
			THEN 'Zaun'		
		ELSE 'Runeterra'
	END;