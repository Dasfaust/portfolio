import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {serialize} from "next-mdx-remote/serialize"
import {MDXRemote} from "next-mdx-remote"
import moment from "moment";
import {HeaderContext} from "../../components/Header";
import Meta from "../../components/Meta";
import NoPostsWarning from "../../components/NoPostsWarning";
import Tag from "../../components/Tag";
import PostImage from "../../components/PostImage";
import StatsGrid from "../../components/StatsGrid";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"

const components = { img: (props) => { return (<PostImage {...props} />); }, StatsGrid };

export const getServerSideProps = async(context) =>
{
	const projectsRes = await fetch(`${process.env.strapiRoute}/api/projects/${context.params.id}?populate=tags,cover`);
	const project = await projectsRes.json();

	let tagNames = [];
	let content = null;
	if (project.data != null)
	{
		project.data.attributes.tags.data.map((tag) => {
			tagNames.push(tag.attributes.content);
		});

		if (project.data.attributes.content != null)
		{
			content = await serialize(project.data.attributes.content);
		}
	}

	return {
		props: {
			project,
			content,
			tagNames
		}
	}
};

function Project({project, content, tagNames})
{
	const {id} = useRouter().query;
	const route = "projects/" + id;
	const projectTitle = (project.data == null ? "Unknown Project" : project.data.attributes.title);

	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				route: "projects",
				title: "Projects",
				subroutes: [ { route: route, title: projectTitle } ],
				subnavLinks: []
			}
		});
	}, []);

	return (
		<div className="flex flex-col space-y-2 w-11/12 mx-auto">
			{project.data == null &&
			<>
				<NoPostsWarning />
				<Meta title="Unknown Project" keywords={[...Meta.defaultProps.keywords, ...tagNames, "project"]} />
			</>}

			{project.data != null &&
			<>
				<Meta title={project.data.attributes.title} keywords={[...Meta.defaultProps.keywords, ...tagNames, ...projectTitle.split(" "), "project"]} />

				<div className="grid grid-cols-4 gap-1 rounded-sm border shadow-sm w-11/12 mx-auto bg-gray-100 border-gray-200">
					<div className="col-span-1 md:max-h-24">
						<img className="object-cover rounded-l-sm w-full h-full" src={`https://strapi.dasfaust.me${project.data.attributes.cover.data.attributes.url}`}></img>
					</div>
					<div className="col-span-3 my-auto md:max-h-24 p-2">{project.data.attributes.blurb}</div>
				</div>

				<p className="underline font-medium text-2xl">{project.data.attributes.title}</p>

				<div className="flex flex-wrap flex-auto gap-1">
					{project.data.attributes.tags.data.map((tag) => {
						return <Tag id = {tag.id} name = {tag.attributes.content} color = {tag.attributes.color} />
					})}
				</div>

				<div className="flex flex-row gap-1">
					{project.data.attributes.url != null &&
					<a href={project.data.attributes.url} target="_blank"><FontAwesomeIcon icon={faGlobe} className="text-2xl my-auto" /></a>}
					{project.data.attributes.github != null &&
					<a href={project.data.attributes.github} target="_blank"><FontAwesomeIcon icon={faGithub} className="text-2xl my-auto" /></a>}

					<span className="italic self-end my-auto ml-auto">
						Posted {moment(project.data.attributes.publishedAt, "YYYY-MM-DD").format("MM/DD/YY")}, last revised {moment(project.data.attributes.updatedAt, "YYYY-MM-DD").format("MM/DD/YY")}
					</span>
				</div>

				{content != null &&
				<div id="post-content" className="flex flex-col bg-gray-100 rounded-sm p-3">
					<MDXRemote {...content} components={components} />
				</div>}
			</>}
		</div>
	);
};

export default Project;