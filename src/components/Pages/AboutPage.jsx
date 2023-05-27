import React from 'react';

function AboutPage() {
	return (
		<div className="container">
			<div>
				<h2>About</h2>
				<p>
					This application was designed and developed by <b>Erich Engler</b> for
					Prime Digital Academy.
				</p>
				<p>
					For more information on the purpose of this application, how it
					works, or the challenges I encountered while creating it, see the 
					readme file located on the app's <a
						href="https://github.com/erichengler/pix-champion-selector">
						Github repository page
					</a>
					.
				</p>
				<br />
				<center>
					<img src="/images/QRcodes.png"/>
				</center>
				<br />
				<p>
					If you have any issues with or suggestions for the application, please
					don't hesitate to connect with me. Or if you just want to have a chat
					about League or play some games together, that works too!
				</p>
				<br />

				<h2>Future Plans</h2>
				<ul>
					<li>
						Store the result of the roll in localStorage to allow the user to refresh the result page.
					</li>
					<br />
					<li>
						Instead of providing external links to information about Classes
						and Regions, include an information page that displays this info.
					</li>
					<br />
					<li>
						Add each champion's abilities, as well as tips
						and tricks to play as or against the champion. This
						information would go on the details page of each champion.
						This would potentially assist players in deciding what
						champions they enjoy or would like to play.
					</li>
					<br />
					<li>
						Give users the option to link their Riot Games account to the
						application and automatically blacklist champions the user does
						not own. This also opens up the possibility to display a user's
						match history or keep track of their winrate on specific champions.
						There are many applications out there that already do this, so
						it won't be a top priority.
					</li>
					<br />
					<li>
						Automatically update the application when a new champion is
						released or when a new patch comes out.
					</li>
				</ul>
				<br />

				<h2>Acknowledgements</h2>
				<ul>
					<li>
						Huge thanks to Chris Black, Marc McCarthy and all of my friends
						from the Tanzanite cohort at Prime Digital Academy. You guys
						are awesome! I've learned so much from you all in such a
						short time. Its been quite the journey so far, and I'm excited
						to see where this path takes me into the future.
					</li>
				</ul>

			</div>
		</div>
	);
}

export default AboutPage;
