import {useState, useContext} from "react";
import {HeaderContext} from "./Header";

const NavLink = ({title, route}) =>
{
    const [headerState, setHeaderState] = useContext(HeaderContext);
    const classes = headerState.title == title ? "underline underline-offset-4 decoration-4" : "hover:underline hover:underline-offset-4 hover:decoration-4";
    return (<a className={`my-auto ${classes}`} href={route}>{title}</a>);
};

export default NavLink;