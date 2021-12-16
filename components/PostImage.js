import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHandPointer} from '@fortawesome/free-solid-svg-icons'

const PostImage = (props) =>
{
	return (
		<span className="grid w-[256px] max-w-fit transition-[width] ease-in-out delay-75 hover:w-full group">
			<FontAwesomeIcon className="self-grid-stack z-10 opacity-90 text-blue-100 text-2xl ml-auto mt-auto mr-2 mb-2 animate-bounce group-hover:hidden" icon={faHandPointer} />
			<img className="self-grid-stack rounded-sm"  alt={props.alt} src={`https://strapi.dasfaust.me${props.src}`} title={props.title} />
		</span>
	);
};

export default PostImage;