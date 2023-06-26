import { EuiLoadingChart, EuiPageTemplate, EuiProvider } from "@elastic/eui";
import clsx from "clsx";
import { RedirectOnMissingSaveFile } from "components/RedirectOnMissingSaveFile";
import { TooltipProvider } from "components/ui/tooltip";
import React, { Suspense, createContext, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SaveFileContext } from "./SaveFileContext";
import { ThemeContext } from "./ThemeContext";
import { Layout } from "./components/Layout";
import { Agencies } from "./pages/Agencies";
import { Colonies } from "./pages/Colonies";
import { Flags } from "./pages/Flags";
import { Home } from "./pages/Home";
import { Licenses } from "./pages/Licenses";
import { SaveSelect } from "./pages/SaveSelect";
import { TravelLog } from "./pages/TravelLog";
import { VesselDetails } from "./pages/VesselDetails";
import { Vessels } from "./pages/Vessels";
import { Save } from "./save-helper/Save";

const ThemeDark = React.lazy(() => import("./components/ThemeDark"));
const ThemeLight = React.lazy(() => import("./components/ThemeLight"));
const StatsPage = React.lazy(() =>
	import("./pages/Stats").then((module) => ({ default: module.Stats }))
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <SaveSelect />,
			},
			{
				path: "licenses",
				element: <Licenses />,
			},
			{
				path: "/",
				element: <RedirectOnMissingSaveFile />,
				children: [
					{
						path: "home",
						element: <Home />,
					},
					{
						path: "vessels",
						element: <Vessels />,
					},
					{
						path: "vessels/:vesselId",
						element: <VesselDetails />,
					},
					{
						path: "agencies",
						element: <Agencies />,
					},
					{
						path: "colonies",
						element: <Colonies />,
					},
					{
						path: "flags",
						element: <Flags />,
					},
					{
						path: "travel-log",
						element: <TravelLog />,
					},
					{
						path: "stats",
						element: (
							<Suspense
								fallback={
									<EuiPageTemplate grow>
										<EuiPageTemplate.Header
											restrictWidth={false}
											iconType="visPie"
											pageTitle="Stats"
										/>
										<EuiPageTemplate.EmptyPrompt
											icon={<EuiLoadingChart size="xl" />}
											title={<h2>Loading Stats</h2>}
										/>
									</EuiPageTemplate>
								}
							>
								<StatsPage />
							</Suspense>
						),
					},
				],
			},
		],
	},
]);

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

export const SetSaveFileContext = createContext<React.Dispatch<Save | null>>(
	() => {}
);

function App() {
	const [saveFile, setSaveFile] = React.useState<Save | null>(null);
	const [theme, setTheme] = useState(defaultTheme);

	return (
		<ThemeContext.Provider
			value={{
				light: theme,
				toggleTheme: () => {
					setTheme(!theme);
					localStorage.setItem("theme", theme ? "dark" : "light");
				},
			}}
		>
			<React.Suspense>{theme ? <ThemeLight /> : <ThemeDark />}</React.Suspense>
			<EuiProvider colorMode={theme ? "light" : "dark"}>
				<TooltipProvider>
					<div className={clsx("flex flex-col pt-12", { dark: !theme })}>
						<SetSaveFileContext.Provider value={setSaveFile}>
							<SaveFileContext.Provider value={saveFile}>
								<RouterProvider router={router} />
							</SaveFileContext.Provider>
						</SetSaveFileContext.Provider>
					</div>
				</TooltipProvider>
			</EuiProvider>
		</ThemeContext.Provider>
	);
}

export default App;
