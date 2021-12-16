import ProjectCard from "./ProjectCard";

const ProjectsContainer = ({projects, reverse}) =>
{
	const arr = (reverse ? projects.data.reverse() : projects.data)

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-2">
			{arr.map((project) => {
				return <ProjectCard project={project} />
			})}
		</div>
	);
};

export default ProjectsContainer;