import {useContext, useEffect} from "react";
import {HeaderContext} from "../components/Header"
import Meta from "../components/Meta";

function NotFound()
{
	const [headerState, setHeaderState] = useContext(HeaderContext);
	useEffect(() =>
	{
		setHeaderState(prevHeaderState =>
		{
			return {
				...prevHeaderState,
				title: "404"
			}
		});
	}, []);

	return (
		<div className="flex flex-col space-y-3">
			<Meta title="404" />
			<div className="rounded-sm border bg-amber-100 border-amber-200 shadow-sm flex flex-row p-2 space-x-2 mx-auto">
				<img className="my-auto h-16 w-16 rounded-full" src="/travolta.gif"></img>
				<p className="my-auto">This address couldn't be found.</p>
			</div>
		</div>
	);
};

export default NotFound;