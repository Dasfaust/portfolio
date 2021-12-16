import {useState, createContext, useContext} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export const HeaderContext = createContext();

export const HeaderProvider = ({children}) =>
{
	const [headerState, setHeaderState] = useState({
		route: "",
		subroutes: [],
		title: "",
		subnavLinks: []
	});

	return (
		<HeaderContext.Provider value={[headerState, setHeaderState]}>
			{children}
		</HeaderContext.Provider>
	);
};

const Header = () =>
{
	const [headerState, setHeaderState] = useContext(HeaderContext);

	return (
		<div className="bg-gray-100">
			<div className="container mx-auto">
				<div className="flex justify-start flex-row ml-3 p-2">
					<div className="font-semibold flex flex-row gap-x-2 flex-nowrap">
						<div className="my-auto"><FontAwesomeIcon icon={faList} /></div>
						<a href={`/${headerState.route}`} className="leading-4 hover:underline hover:underline-offset-1 my-auto">{headerState.title}</a>

						{headerState.subroutes.length > 0 &&
						headerState.subroutes.map((route) => {
							return (
								<>
									<FontAwesomeIcon className="my-auto" icon={faChevronRight} />
									<a href={`/${route.route}`} className="leading-4 hover:underline hover:underline-offset-1 my-auto">{route.title}</a>
								</>
							);
						})}
					</div>

					<div className="flex gap-x-4 flex-row justify-self-end self-end ml-auto my-auto">
						{headerState.subnavLinks.map((subnav) =>
						{
							const currentRoute = (headerState.subroutes.length > 0 ? headerState.subroutes[headerState.subroutes.length - 1].route : headerState.route);

							return (
								<a key={`${subnav.link}`} href={`/${currentRoute}${subnav.link}`} className="leading-3 hover:underline hover:underline-offset-1 my-auto">{subnav.title}</a>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;