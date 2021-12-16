import {useState, useEffect} from "react";
import Tag from "./Tag";
  

const TagScroller = ({tags}) =>
{
	const [tagIndex, setTagIndex] = useState(0);
	const [classNames, setClassNames] = useState("opacity-0");
	const tagsLength = tags.data.length - 1;

	useEffect(() =>
	{
		var halfSeconds = 0;
		var index = 0;

		const interval = setInterval(() => {
			if (halfSeconds >= 10)
			{
				setTagIndex(index);
				halfSeconds = 0;
			}

			if (halfSeconds == 0)
			{
				setClassNames("opacity-100");
			}
			else if (halfSeconds == 9)
			{
				setClassNames("opacity-0");
			}

			index++;
			if (index > tagsLength)
			{
				index = 0;
			}

			halfSeconds++;
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`inline-block transition-opacity ease-in-out delay-150 ${classNames}`}>
			<Tag id={tags.data[tagIndex].id} name={tags.data[tagIndex].attributes.content} color={tags.data[tagIndex].attributes.color} /> {tags.data[tagIndex].attributes.verb}.
		</div>
	);
};

export default TagScroller;