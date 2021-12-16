import Tag from "./Tag";
import moment from "moment";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"

const RecentPostCard = ({project}) =>
{
	const blurb = (project.attributes.blurb.length > 200 ? project.attributes.blurb.slice(0, 200) + "..." : project.attributes.blurb);
	const date = moment(project.attributes.updatedAt, "YYYY-MM-DD").format("MM/DD/YY");

	return (
		<div key={project.id} className="rounded-sm border shadow-sm flex flex-col">
			<div className="grid">
				<div className="self-grid-stack z-10 mt-auto ml-auto">
					<a href={`/projects/year/${project.attributes.year}`} className="bg-purple-300 border-purple-400 hover:bg-purple-200 hover:border-purple-300 h-full inline-block px-1 rounded-tl-sm rounded-br-sm border">{project.attributes.year}</a>
				</div>
				<div className="self-grid-stack h-40">
					<img className="w-full h-full object-cover rounded-t-sm" src={`https://strapi.dasfaust.me${project.attributes.cover.data.attributes.url}`}></img>
				</div>
			</div>
			{project.attributes.content == null &&
				<span className="mt-1 mx-1">{project.attributes.title}</span>
			}
			{project.attributes.content != null &&
				<a className="underline text-blue-600 hover:text-blue-500 hover:underline mt-1 mx-1" href={`/projects/${project.id}`}>{project.attributes.title}</a>
			}
			<div className="flex flex-row flex-wrap gap-1 px-1 pt-1">
				<Tag className="font-mono" id="-1" name="Project" color = "#d8b4fe" link="/projects" />

				{project.attributes.tags.data.length > 0 &&
				<span className="italic">+ {project.attributes.tags.data.length} tags</span>}

				<p className="ml-auto my-auto pr-1 justify-self-end italic">{date}</p>
			</div>
			<div className="px-1 grid mb-auto overflow-hidden">
				{/*<div className="w-full h-full self-grid-stack bg-gradient-to-b from-transparent to-[#f9fafb] z-10"></div>*/}
				<p className="self-grid-stack">{blurb}</p>
			</div>
			<div className="flex flex-row justify-end pr-1 pt-1 gap-1">
				{project.attributes.url != null &&
				<a href={project.attributes.url} target="_blank"><FontAwesomeIcon icon={faGlobe} className="text-2xl" /></a>}
				{project.attributes.github != null &&
				<a href={project.attributes.github} target="_blank"><FontAwesomeIcon icon={faGithub} className="text-2xl" /></a>}
			</div>
		</div>
	);
};

export default RecentPostCard;