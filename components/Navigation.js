import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

const Navigation = () =>
{
	return (
		<nav className="shadow-sm z-10">
			<div className="container mx-auto">
				<ul className="mx-3">
					<li className="flex flex-row gap-x-4 py-2 font-black">
						<a className="my-auto" href="/"><FontAwesomeIcon icon={faBookOpen} className="text-3xl" /></a>
						<a className="hover:underline hover:underline-offset-4 hover:decoration-4 my-auto" href="/projects">Projects</a>
						<div className="flex flex-row gap-x-4 self-end ml-auto my-auto">
							<a href="https://github.com/Dasfaust/"><FontAwesomeIcon icon={faGithub} className="text-3xl" /></a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;