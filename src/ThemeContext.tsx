import React from "react";

let defaultTheme = false;

if (typeof window !== "undefined") {
	if (localStorage.getItem("theme") === "dark") {
		defaultTheme = false;
	} else if (localStorage.getItem("theme") === "light") {
		defaultTheme = true;
	} else {
		defaultTheme = !window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
}

export const ThemeContext = React.createContext<{
	light: boolean;
	toggleTheme: () => void;
}>({
	light: defaultTheme,
	toggleTheme: () => {},
});

export function useTheme() {
	return React.useContext(ThemeContext);
}
