import {useEffect} from "react";

import Layout from "../components/Layout";
import "../styles/globals.css";

function App({Component, pageProps})
{
	useEffect(() => {
		document.getElementById("application").classList.remove("hidden");
	}, []);

	return (
		<div id="application" className="hidden">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
};

export default App;