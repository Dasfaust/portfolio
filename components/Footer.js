import {useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpotify, faYoutube, faDiscord} from '@fortawesome/free-brands-svg-icons'

const Footer = () =>
{
	const [contactEmail, setContactEmail] = useState("");

	useEffect(() => {
		setContactEmail(process.env.contactEmail);
	}, []);

	return (
		<footer className="bg-stone-900 text-gray-100 mt-auto">
			<div className="container flex flex-col mx-auto">
				<div className="flex flex-row p-3">
					<div>
						<a className="hover:underline hover:underline-offset-1" href={`mailto:${contactEmail}`}>Contact</a>
						<div className="flex flex-row space-x-1 mt-1">
							<a href="https://open.spotify.com/user/dasfaust?si=086921a89ee64dda" target="_blank"><FontAwesomeIcon icon={faSpotify} className="text-2xl" /></a>
							<a href="https://discord.com/users/110969189774139392" target="_blank"><FontAwesomeIcon icon={faDiscord} className="text-2xl" /></a>
							<a href="https://www.youtube.com/channel/UCm5m090JQGD02kspXFq5p6g" target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-2xl" /></a>
						</div>
					</div>
					<div className="flex flex-col ml-auto text-right">
						<a className="hover:underline hover:underline-offset-1" href={`${process.env.strapiRoute}/admin`}>Log In</a>
					</div>
				</div>
				<p className="mx-auto border-t">
					&copy; dasfaust.me 2021
				</p>
			</div>
		</footer>
	);
};

export default Footer;