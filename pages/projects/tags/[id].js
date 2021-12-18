import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {HeaderContext} from "../../../components/Header";
import Meta from "../../../components/Meta";
import TagContainer from "../../../components/TagContainer";
import NoPostsWarning from "../../../components/NoPostsWarning";
import ProjectsContainer from "../../../components/ProjectsContainer";

export const getServerSideProps = async(context) =>
{
	const tagsRes = await fetch(`${process.env.strapiRoute}/api/tags?sort=content&pagination[pageSize]=100`);
	const tags = await tagsRes.json();

	const projectsRes = await fetch(`${process.env.strapiRoute}/api/tags/${context.params.id}?populate[projects][populate]=tags,cover`);
	const projectsByTag = await projectsRes.json();

	let projects = {
		data: []
	}
	if (projectsByTag.data != null)
	{
		projectsByTag.data.attributes.projects;

		for (var i = 0; i < projectsByTag.data.attributes.projects.data.length; i++)
		{
			if (projectsByTag.data.attributes.projects.data[i].attributes.publishedAt != null)
			{
				projects.data.push(projectsByTag.data.attributes.projects.data[i]);
			}
		}
	}

	let currentTagName = "Unknown Tag";
	let tagNames = [];
	tags.data.map((tag) => {
		tagNames.push(tag.attributes.content);
		
		if (tag.id == parseInt(context.params.id))
		{
			currentTagName = tag.attributes.content;
		}
	});

	return {
		props: {
			tags,
			projects,
			tagNames,
			currentTagName
		}
	};
};

function ProjectsByTag({tags, projects, tagNames, currentTagName})
{
	const {id} = useRouter().query;
	const route = "projects/tags/" + id;

	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				route: "projects",
				subroutes: [ { route: route, title: currentTagName } ],
				title: "Projects",
				subnavLinks: [{link: "#filter", title: "Filter"}, {link: "#projects", title: "Posts"}]
			}
		});
	}, []);

	return (

		<div id="filter" className="flex flex-col space-y-3">
			<Meta title={`${currentTagName} Projects`} keywords={[...Meta.defaultProps.keywords, ...tagNames, "projects"]} />

			<TagContainer tags={tags} />
			
			{projects.data.length == 0 &&
			<NoPostsWarning />}

			<div id="projects"><ProjectsContainer projects={projects} reverse={true} /></div>
		</div>
	);
};

export default ProjectsByTag;