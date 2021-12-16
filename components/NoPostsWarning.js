import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

const NoPostsWarning = () =>
{
	return (
		<div className="rounded-sm border shadow-sm flex flex-row bg-amber-100 border-amber-200 p-2 space-x-2 mx-auto">
			<div className="my-auto"><FontAwesomeIcon icon={faSpinner} className="text-2xl" /></div>
			<p className="my-auto">There aren't any posts in this category or tag yet.</p>
		</div>
	);
};

export default NoPostsWarning;