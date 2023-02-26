import { EuiButton, EuiIcon, EuiProvider, EuiToolTip } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
// import "@elastic/eui/dist/eui_theme_light.css";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Layout } from "./components/Layout";
import { Agencies } from "./pages/Agencies";
import { Colonies } from "./pages/Colonies";
import { Flags } from "./pages/Flags";
import { Home } from "./pages/Home";
import { Licenses } from "./pages/Licenses";
import { Vessels } from "./pages/Vessels";
import { loadSaveData } from "./save-helper/loadSaveData";
import { Save } from "./save-helper/Save";
import { SaveFileContext } from "./SaveFileContext";
import { ThemeContext } from "./ThemeContext";
import { SaveFile_0_1_0 } from "./types/save/SaveFile-0-1-0";

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
		],
	},
]);

// let defaultTheme = false;

// if (typeof window !== "undefined") {
// 	if (localStorage.getItem("theme") === "dark") {
// 		defaultTheme = false;
// 	} else if (localStorage.getItem("theme") === "light") {
// 		defaultTheme = true;
// 	} else {
// 		defaultTheme = !window.matchMedia("(prefers-color-scheme: dark)").matches;
// 	}
// }

function App() {
	const [saveFile, setSaveFile] = React.useState<Save | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [theme, setTheme] = useState(false);
	const [lastSaveFile, setLastSaveFile] =
		useLocalStorageState<SaveFile_0_1_0 | null>("lastSaveFile", {
			defaultValue: null,
		});

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
			<EuiProvider colorMode={theme ? "light" : "dark"}>
				<div className="w-screen h-screen flex flex-col bg-slate-800 pt-12">
					{saveFile !== null ? (
						<SaveFileContext.Provider value={saveFile}>
							<RouterProvider router={router} />
						</SaveFileContext.Provider>
					) : (
						<div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<AnimatePresence>
								<motion.div
									key="upload"
									layoutId="upload"
									className="p-6 rounded-md bg-white shadow-lg"
								>
									<h1 className="text-2xl font-bold mb-2 text-black">
										Please Upload a Save File (.json)
										<EuiToolTip
											position="right"
											content="Saves can be found in 'users/[username]/AppData/LocalLow/Intercept Games/Kerbal Space Program 2/Saves/SinglePlayer/[savename]/'"
										>
											<EuiIcon
												tabIndex={0}
												type="questionInCircle"
												className="ml-1 mb-1"
											/>
										</EuiToolTip>
									</h1>
									<input
										type="file"
										className="text-black"
										multiple
										onChange={handleFileChange}
									/>
									{error && <p className="text-red-500 mt-2">{error}</p>}
								</motion.div>
								{lastSaveFile && (
									<motion.div
										key="lastSaveFile"
										layoutId="lastSaveFile"
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: 10, opacity: 0 }}
										className="p-6 rounded-md bg-white shadow-lg"
									>
										<h2 className="text-xl font-bold mb-2 text-black">
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
					)}
				</div>
			</EuiProvider>
		</ThemeContext.Provider>
	);
}

export default App;
