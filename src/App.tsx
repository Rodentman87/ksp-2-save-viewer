import {
	EuiButton,
	EuiIcon,
	EuiLoadingChart,
	EuiPageTemplate,
	EuiProvider,
	EuiToolTip,
} from "@elastic/eui";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useLayoutEffect, useState } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { SaveFileContext } from "./SaveFileContext";
import { ThemeContext } from "./ThemeContext";
import { Layout } from "./components/Layout";
import { Agencies } from "./pages/Agencies";
import { Colonies } from "./pages/Colonies";
import { Flags } from "./pages/Flags";
import { Home } from "./pages/Home";
import { Licenses } from "./pages/Licenses";
import { TravelLog } from "./pages/TravelLog";
import { VesselDetails } from "./pages/VesselDetails";
import { Vessels } from "./pages/Vessels";
import { Save } from "./save-helper/Save";
import { loadSaveData } from "./save-helper/loadSaveData";
import { SaveFile_0_1_0 } from "./types/save/SaveFile-0-1-0";

const ThemeDark = React.lazy(() => import("./components/ThemeDark"));
const ThemeLight = React.lazy(() => import("./components/ThemeLight"));
const StatsPage = React.lazy(() =>
	import("./pages/Stats").then((module) => ({ default: module.Stats }))
);

const router = createHashRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
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
				path: "licenses",
				element: <Licenses />,
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

function App() {
	const [saveFile, setSaveFile] = React.useState<Save | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [theme, setTheme] = useState(defaultTheme);
	const [lastSaveFile, setLastSaveFile] =
		useLocalStorageState<SaveFile_0_1_0 | null>("lastSaveFile", {
			defaultValue: null,
		});

	useLayoutEffect(() => {
		const query = new URLSearchParams(window.location.search);
		if (lastSaveFile && query.get("autoloadLastSave") === "true") {
			setSaveFile(loadSaveData(JSON.stringify(lastSaveFile)));
		}
	}, [lastSaveFile]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		if (!e.target.files) return;
		if (e.target.files.length > 1) {
			setError("Please add only one file.");
			return;
		}
		const file = e.target.files[0];
		if (file.type !== "application/json") {
			setError("Please add a JSON file.");
			return;
		}
		const body = await file.text();
		setLastSaveFile(JSON.parse(body));
		setSaveFile(loadSaveData(body));
	};

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
				<div className="flex flex-col pt-12">
					{saveFile !== null ? (
						<SaveFileContext.Provider value={saveFile}>
							<RouterProvider router={router} />
						</SaveFileContext.Provider>
					) : (
						<div className="flex flex-col items-center justify-center">
							<div className="flex flex-col gap-4">
								<AnimatePresence>
									<motion.div
										key="upload"
										layoutId="upload"
										className="p-6 bg-white rounded-md shadow-lg"
									>
										<h1 className="mb-2 text-2xl font-bold text-black">
											Please Upload a Save File (.json)
											<EuiToolTip
												position="right"
												content="Saves can be found in 'users/[username]/AppData/LocalLow/Intercept Games/Kerbal Space Program 2/Saves/SinglePlayer/[savename]/'"
											>
												<EuiIcon
													tabIndex={0}
													type="questionInCircle"
													className="mb-1 ml-1"
												/>
											</EuiToolTip>
										</h1>
										<input
											type="file"
											accept=".json,application/json"
											className="text-black"
											onChange={handleFileChange}
										/>
										{error && <p className="mt-2 text-red-500">{error}</p>}
									</motion.div>
									{lastSaveFile && (
										<motion.div
											key="lastSaveFile"
											layoutId="lastSaveFile"
											initial={{ y: 10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: 10, opacity: 0 }}
											className="p-6 bg-white rounded-md shadow-lg"
										>
											<h2 className="mb-2 text-xl font-bold text-black">
												Last used save file: {lastSaveFile.Metadata.Name}
											</h2>
											<div className="flex flex-row justify-end gap-2">
												<EuiButton
													color="danger"
													onClick={() => {
														setLastSaveFile(null);
													}}
												>
													Clear
												</EuiButton>
												<EuiButton
													color="primary"
													onClick={() => {
														setSaveFile(
															loadSaveData(JSON.stringify(lastSaveFile))
														);
													}}
												>
													Load
												</EuiButton>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					)}
				</div>
			</EuiProvider>
		</ThemeContext.Provider>
	);
}

export default App;
