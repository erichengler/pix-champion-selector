# Pix - Champion Selector

## Description

_Duration: 10-12 days of work over a 3 week period_

In the game League of Legends (made by Riot Games), there are currently over 160 playable characters (called champions) in the game, each with different abilities, a different playstyle, and a different story. Before each match, players are required to select one of these champions to play. This selection process can be incredibly overwhelming, especially for new players.

This application was designed to help players decide which champion to pick for their next League of Legends match. The selection can be random or based on a player's personal preferences, depending on which method they prefer. Pix was NOT designed to improve a player's in-game performance or increase their rank. Instead, my hope is that new players using Pix will be able to learn the game in a more fun and efficient way by easily keeping track of which champions they have tried so far and sorting those champions using the `Favorites` and `Blacklist` features of the app. Veterans of the game will also benefit from Pix by being able to create drafting strategies and reminders using the `Notes` feature.

## Preview

![Login Preview](./public/images/screenshots/login_page.png)
<br /><br />

![User Preview](./public/images/screenshots/user_page.png)
<br /><br />

![Champions Preview](./public/images/screenshots/champions_page.png)
<br /><br />

![Details Preview](./public/images/screenshots/details_page.png)
<br /><br />

![Favorites Preview](./public/images/screenshots/favorites_page.png)
<br /><br />

![Result Preview](./public/images/screenshots/result_page.png)

## Installation / Setup

1. Clone down this repository. You will need `node` and `npm` installed globally on your machine
2. Create a database named `pix_app`
3. Refer to the `database.sql` file and use the queries to create the 5 database tables
4. In your editor of choice, run `npm install` in your terminal 
5. Run `npm run server` in your terminal
6. In a new terminal window, run `npm run client`
7. Once the application is up and running, you will be required to register
8. After registering, log in using your new username and password

9. After logging in and landing on the User Page (You will be greeted by Pix at this point), the database will automatically populate every champion's `name`, `title`, `imageSplash`, `imageTile`, `imageSmall`, `difficulty` and `lore` from the Data Dragon API Library (by Riot Games)

!!! ----------------- *** IMPORTANT *** ----------------- !!!

- At the time this application was created, the most recent Data Dragon version was `12.6.1`. This version contains `159` different champions from the game. Please ensure that all `159` champions are populated in the database before leaving the `User Page`. This may take up to a minute or so depending on your internet connection. If you leave the `User Page` before all the data is populated, please delete and recreate the `champions` database table and then return to the `User Page` to start the population process again.

- I will try to update this application when newer versions of Data Dragon are released by Riot Games. If I end up behind on this (quite likely), you may need to replace the version variables in `/src/data/fetchChampionNames.js` and `/src/redux/sagas/championInfo.saga.js` with the current version of Data Dragon. The application will still function on an older version, but you may encounter outdated information or missing champions that were added to the game in a newer version.

!!! ----------------------------------------------------- !!!

10. After the database has been fully populated, refer back to the `database.sql` file and run the queries to update `difficulty` (where it is missing from), `class` and `region` in the champions table.

## Usage



## Built With

- Javascript
- React
- Redux w/ Sagas
- Node
- Express
- Axios
- PostgreSQL
- Passport
- Material UI

## Future Plans

- Store the result of the roll in localStorage to allow the user to refresh the result page.

- Instead of providing external links to information about Classes and Regions, include an information page that displays this info.

- Add each champion's abilities, as well as tips and tricks to play as or against the champion. This information would go on the details page of each champion. This would potentially assist players in deciding what champions they enjoy or would like to play.

- Give users the option to link their Riot Games account to the application and automatically blacklist champions the user does not own. This also opens up the possibility to display a user's match history or keep track of their winrate on specific champions. There are many applications out there that already do this, so it won't be a top priority.

- Automatically update the application when a new champion is released or when a new patch comes out.

## Challenges / What I Learned

This was my first time working with an API in a project and it was a lot more work than I thought to populate my database with all of the champion images and information from Riot Games. I could have just manually entered all of this information but I wanted a challenge and thats what I got. It felt great to get it working in the end.

I ended up wanting to use information that the API did not contain such as `Region` and `Class` as well (the region each champion is from was obtained from the League of Legends website but was missing from the API. And the class information was obtained from the League of Legends wiki page).

The amount of things I learned while working on this app is insane! I feel like I now have a really good handle on how to use props in combination with conditional (ternary) operators.

## Deployment

Heroku deployment coming soon!

## Acknowledgement

Huge thanks to Chris Black, Marc McCarthy and all of my friends from the Tanzanite cohort at Prime Digital Academy. You guys are awesome! This was my biggest project yet (by far). I'm so proud of how it all came together, and I couldn't have done it without the huge amount of support I received from you all.

Thank you to Riot Games for providing me with all of the images that were used, as well as the information about champion names, titles, difficulties, regions and lore via Data Dragon.

## Support

If you have issues with or suggestions for the application, please don't hesitate to connect with me. Or if you just want to have a chat about League or play some games together, that works too! You can find links to my gmail and linkedIn at the top of my github homepage.

Thanks for viewing and I'll see you on the rift, summoner!