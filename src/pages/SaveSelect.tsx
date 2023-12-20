import { EuiCallOut, EuiIcon, EuiPageTemplate } from "@elastic/eui";
import { SetSaveFileContext } from "App";
import { Button } from "components/ui/button";
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	MotionCard,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "save-helper/Save";
import { loadSaveData } from "save-helper/loadSaveData";
import { SaveFile_0_1_0 } from "types/save/SaveFile-0-1-0";
import useLocalStorageState from "use-local-storage-state";

export const SaveSelect: React.FC = () => {
	const setSaveFile = useContext(SetSaveFileContext);
	const navigate = useNavigate();
	const setSave = useCallback(
		(save: Save) => {
			setSaveFile(save);
			navigate("/home");
		},
		[setSaveFile, navigate]
	);

	const [error, setError] = React.useState<string | null>(null);
	const [lastSaveFile, setLastSaveFile] =
		useLocalStorageState<SaveFile_0_1_0 | null>("lastSaveFile", {
			defaultValue: null,
		});

	useLayoutEffect(() => {
		const query = new URLSearchParams(window.location.search);
		if (lastSaveFile && query.get("autoloadLastSave") === "true") {
			setSave(loadSaveData(JSON.stringify(lastSaveFile)));
		}
	}, [lastSaveFile, setSave]);

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
		setSave(loadSaveData(body));
	};

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="save"
				pageTitle="Select a save file"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				<div className="flex flex-col items-center justify-center">
					<div className="flex flex-col gap-4">
						<AnimatePresence>
							<MotionCard key="upload" layoutId="upload">
								<CardHeader>
									<CardTitle>
										Upload a Save File (.json)
										<Tooltip>
											<TooltipTrigger>
												<EuiIcon
													tabIndex={0}
													type="questionInCircle"
													className="mb-1 ml-1"
												/>
											</TooltipTrigger>
											<TooltipContent>
												Saves can be found in
												'users/[username]/AppData/LocalLow/Intercept
												Games/Kerbal Space Program
												2/Saves/SinglePlayer/[savename]/'
											</TooltipContent>
										</Tooltip>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<EuiCallOut
										title="WARNING for pre-0.2.0 saves"
										color="warning"
										iconType="warning"
									>
										<p className="text-sm text-justify w-96">
											Due to changes with the save format of KSP 2 in version
											0.2.0, save files from before 0.2.0 will not work with
											this tool anymore, please load the save in version 0.2.0
											or later and save it again.
										</p>
									</EuiCallOut>
									<div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
										<Label htmlFor="save-file">Save File</Label>
										<Input
											id="save-file"
											accept=".json,application/json"
											type="file"
											onChange={handleFileChange}
										/>
									</div>
								</CardContent>
								{error && <p className="mt-2 text-red-500">{error}</p>}
							</MotionCard>
							{lastSaveFile && (
								<MotionCard
									key="lastSaveFile"
									layoutId="lastSaveFile"
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 10, opacity: 0 }}
								>
									<CardHeader>
										<CardTitle>
											Last used save file: {lastSaveFile.Metadata.Name}
										</CardTitle>
									</CardHeader>
									<CardFooter className="flex flex-row justify-end gap-2">
										<Button
											variant="destructive"
											onClick={() => {
												setLastSaveFile(null);
											}}
										>
											Clear
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												setSave(loadSaveData(JSON.stringify(lastSaveFile)));
											}}
										>
											Load
										</Button>
									</CardFooter>
								</MotionCard>
							)}
						</AnimatePresence>
					</div>
				</div>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
