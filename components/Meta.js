import Head from "next/head";

const Meta = ({title, keywords}) =>
{
	return (
		<Head>
			<title>{title}</title>
			<meta name="keywords" content={keywords.toString()} />
		</Head>
	);
};

Meta.defaultProps = {
	title: "dasfaust.me",
	keywords: [
		"programming",
		"programmer",
		"developer",
		"software",
		"engineer",
		"blog",
		"tutorial",
		"full",
		"stack",
		"full-stack",
		"freelance",
		"for hire",
		"hire",
		"portfolio"
	]
};

export default Meta;