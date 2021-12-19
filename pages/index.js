import {useContext, useEffect} from "react";
import {HeaderContext} from "../components/Header";
import RecentPostCard from "../components/RecentPostCard";
import NoPostsWarning from "../components/NoPostsWarning";
import TagScroller from "../components/TagScroller";

export const getServerSideProps = async(context) =>
{
	const tagsRes = await fetch(`${process.env.strapiRoute}/api/tags?filters[verb][$notNull]=true&pagination[pageSize]=100`);
	var tagsWithVerb = await tagsRes.json();

	var _tags = {
		data: []
	}
	for (var i = 0; i < tagsWithVerb.data.length; i++)
	{
		if (tagsWithVerb.data[i].attributes.verb.length > 0)
		{
			_tags.data.push(tagsWithVerb.data[i]);
		}
	}

	for (var i = _tags.data.length - 1; i > 0; i--)
	{
		const rand = Math.floor(Math.random() * (i + 1));
		[_tags.data[i], _tags.data[rand]] = [_tags.data[rand], _tags.data[i]];
	}
	const tags = _tags;

	const projectsRes = await fetch(`${process.env.strapiRoute}/api/projects?sort=updatedAt:desc&pagination[pageSize]=4&populate=tags,cover`);
	const projects = await projectsRes.json();

	return {
		props: {
			tags,
			projects
		}
	}
};

function Home({tags, projects})
{
	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				title: "Home",
				subnavLinks: [{link: "#recent-posts", title: "Recent Posts"}]
			}
		});
	}, []);

	return (
		<>
			<div className="flex flex-col space-y-3">
				<div className="rounded-sm border shadow-sm mx-auto p-2 flex flex-row gap-4 bg-gray-100 border-gray-200  w-[320px] lg:w-[544px]">
					<img className="w-12 h-12 rounded-full my-auto" src="profile.jpg"></img>
					<p className="my-auto">My name is Cody, and I am a <TagScroller tags={tags} /></p>
				</div>

				<div>
					<p className="italic">Recent Posts:</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-auto">

					{projects.data.length == 0 &&
					<NoPostsWarning />}

					{projects.data.map((project) => {
						return <RecentPostCard project={project} />
					})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;