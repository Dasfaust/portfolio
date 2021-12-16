import Tag from "./Tag";

const TagContainer = ({tags}) =>
{
	return (
		<div id="filter" className="flex flex-col max-w-[75%] mx-auto">
			<p className="italic">Filter by tag:</p>
			<div className="flex flex-wrap flex-auto gap-1 p-1">
				{tags.data.map((tag) => {
					return <Tag id = {tag.id} name = {tag.attributes.content} color = {tag.attributes.color} />
				})}
			</div>
		</div>
	);
};

export default TagContainer;