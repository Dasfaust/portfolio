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

	const projectsRes = await fetch(`${process.env.strapiRoute}/api/projects?filters[year][$eq]=${context.params.id}&sort=year:desc&populate=tags,cover`);
	const projectsByYear = await projectsRes.json();

	let projects = {
		data: []
	}
	if (projectsByYear.data != null)
	{
		projects = projectsByYear;
	}

	let currentYearName = isNaN(parseInt(context.params.id)) ? "January 1, 1970" : context.params.id;

	let tagNames = [];
	tags.data.map((tag) => {
		tagNames.push(tag.attributes.content);
	});

	return {
		props: {
			tags,
			projects,
			tagNames,
			currentYearName
		}
	};
};

function ProjectsByYear({tags, projects, tagNames, currentYearName})
{
	const {id} = useRouter().query;
	const route = "projects/year/" + id;

	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				route: "projects",
				subroutes: [ { route: route, title: currentYearName } ],
				title: "Projects",
				subnavLinks: [{link: "#filter", title: "Filter"}, {link: "#projects", title: "Posts"}]
			}
		});
	}, []);

	return (

		<div id="filter" className="flex flex-col space-y-3">
			<Meta title={`${currentYearName} Projects`} keywords={[...Meta.defaultProps.keywords, ...tagNames, "projects"]} />

			<TagContainer tags={tags} />
			
			{projects.data.length == 0 &&
			<NoPostsWarning />}

			<div id="projects"><ProjectsContainer projects={projects} reverse={true} /></div>
		</div>
	);
};

export default ProjectsByYear;