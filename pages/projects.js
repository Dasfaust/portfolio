import {useContext, useEffect} from "react";
import {HeaderContext} from "../components/Header";
import Meta from "../components/Meta";
import TagContainer from "../components/TagContainer";
import NoPostsWarning from "../components/NoPostsWarning";
import ProjectsContainer from "../components/ProjectsContainer";

export const getServerSideProps = async(context) =>
{
	const tagsRes = await fetch(`${process.env.strapiRoute}/api/tags?sort=content&pagination[pageSize]=100`);
	const tags = await tagsRes.json();

	const projectsRes = await fetch(`${process.env.strapiRoute}/api/projects?sort=year:desc&pagination[pageSize]=100&populate=tags,cover`);
	const projects = await projectsRes.json();

	let tagNames = [];
	tags.data.map((tag) => {
		tagNames.push(tag.attributes.content);
	});

	return {
		props: {
			tags,
			projects,
			tagNames
		}
	}
};

function Projects({tags, projects, tagNames})
{
	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				route: "projects",
				title: "Projects",
				subnavLinks: [{link: "#filter", title: "Filter"}, {link: "#projects", title: "Posts"}]
			}
		});
	}, []);

	return (
		<div className="flex flex-col space-y-3">
			<Meta title="Projects" keywords={[...Meta.defaultProps.keywords, ...tagNames, "projects"]} />

			<TagContainer tags={tags} />
			
			{projects.data.length == 0 &&
			<NoPostsWarning />}

			<div id="projects"><ProjectsContainer projects={projects} /></div>
		</div>
	);
};

export default Projects;