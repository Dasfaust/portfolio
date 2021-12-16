import {useContext, useEffect} from "react";
import {HeaderContext} from "../components/Header";
import RecentPostCard from "../components/RecentPostCard";
import NoPostsWarning from "../components/NoPostsWarning";
import TagScroller from "../components/TagScroller";

export const getServerSideProps = async(context) =>
{
	const tagsRes = await fetch(`${process.env.strapiRoute}/api/tags?filters[verb][$notNull]=true&pagination[pageSize]=100`);
	var _tags = await tagsRes.json();

	var emptyTags = [];
	for (var i = 0; i < _tags.data.length; i++)
	{
		if (_tags.data[i].attributes.verb.length == 0)
		{
			emptyTags.push(i);
		}
	}

	emptyTags.map((index) => {
		_tags.data.splice(index, 1);
	});

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
				<div className="rounded-sm border shadow-sm w-fit mx-auto p-2 flex flex-row gap-4 bg-gray-100 border-gray-200">
					<img className="w-24 h-24 rounded-full my-auto" src="profile.jpg"></img>
					<p className="my-auto">Hi, I go by <span className="italic">Dasfaust</span>, and I am a <TagScroller tags={tags} /><br />I dabble in all kinds of projects (and even finish some of them!)</p>
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