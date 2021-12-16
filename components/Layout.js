import Navigation from "./Navigation";
import Header, {HeaderProvider} from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

const Layout = ({children}) =>
{
	return (
		<div className="text-stone-900 flex flex-col h-screen">
			<Meta />
			<Navigation />
			<HeaderProvider>
				<Header />
				<div className="container mx-auto">
					<div className="m-3">
						{children}
					</div>
				</div>
			</HeaderProvider>
			<Footer />
		</div>
	);
};

export default Layout;