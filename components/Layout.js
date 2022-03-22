import Navigation from "./Navigation";
import Header, {HeaderProvider} from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

const Layout = ({children}) =>
{
	return (
		<div className="text-stone-900 flex flex-col h-screen">
			<HeaderProvider>
				<Navigation />
				<Header />
				<div className="container mx-auto">
					<div className="m-3">
						{children}
					</div>
				</div>
				<Footer />
			</HeaderProvider>
		</div>
	);
};

export default Layout;