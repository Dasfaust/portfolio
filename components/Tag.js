// https://css-tricks.com/snippets/javascript/lighten-darken-color/
function shiftColor(col, amt)
{
    var usePound = false;
  
    if (col[0] == "#")
	{
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function getLuminosity(c)
{
	var c = c.substring(1);
	var rgb = parseInt(c, 16);
	var r = (rgb >> 16) & 0xff;
	var g = (rgb >>  8) & 0xff;
	var b = (rgb >>  0) & 0xff;

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const Tag = ({id, name, color, link}) =>
{
	const lum = getLuminosity(color);
	const tagStyle = {
		background: color,
		borderColor: shiftColor(color, (lum >= 120 ? -50 : 50)),
		color: (lum >= 150 ? "black" : "white")
	};

	const href = (link != null ? link : "/projects/tags/" + id);

	return (
		<a key={`tag${id}`} href={`${href}`} className="rounded-sm border px-1 tag font-mono" style={tagStyle}>{name}</a>
	);
};

export default Tag;