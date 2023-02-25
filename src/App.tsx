import { EuiIcon, EuiProvider, EuiToolTip } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
// import "@elastic/eui/dist/eui_theme_light.css";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Agencies } from "./pages/Agencies";
import { Home } from "./pages/Home";
import { Licenses } from "./pages/Licenses";
import { Vessels } from "./pages/Vessels";
import { loadSaveData } from "./save-helper/loadSaveData";
import { Save } from "./save-helper/Save";
import { SaveFileContext } from "./SaveFileContext";
import { ThemeContext } from "./ThemeContext";

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
					<AnimatePresence mode="wait">
						{saveFile !== null ? (
							<SaveFileContext.Provider value={saveFile}>
								<RouterProvider router={router} />
							</SaveFileContext.Provider>
						) : (
							<div className="p-6 rounded-md bg-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
							</div>
						)}
					</AnimatePresence>
				</div>
			</EuiProvider>
		</ThemeContext.Provider>
	);
}

export default App;
