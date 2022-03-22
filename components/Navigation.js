import NavLink from "./NavLink"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

const Navigation = () =>
{
	return (
		<nav className="shadow-sm z-10">
			<div className="container mx-auto">
				<ul className="mx-3">
					<li className="flex flex-row gap-x-4 py-2 font-black">
						{<NavLink title="Home" route="/" />}
						{<NavLink title="Projects" route="/projects" />}
						<div className="flex flex-row gap-x-4 self-end ml-auto my-auto">
							<a href="https://github.com/Dasfaust/" target="_blank"><FontAwesomeIcon icon={faGithub} className="text-3xl" /></a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;