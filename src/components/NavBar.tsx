import {
	EuiButton,
	EuiHeader,
	EuiHeaderLink,
	EuiHeaderLogo,
	EuiModal,
	EuiModalBody,
	EuiModalFooter,
	EuiModalHeader,
	EuiText,
} from "@elastic/eui";
import { SetSaveFileContext } from "App";
import { motion } from "framer-motion";
import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSaveFileUnsafe } from "../SaveFileContext";
import { useTheme } from "../ThemeContext";
import { ReactComponent as Logo } from "../icons/Logo.svg";

export const NavBar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [showExportModal, setShowExportModal] = React.useState(false);

	const save = useSaveFileUnsafe();
	const setSaveFile = useContext(SetSaveFileContext);

	const { toggleTheme } = useTheme();

	const headerLeftItems = useMemo(() => {
		const items = [
			<EuiHeaderLogo
				iconType={() => <Logo className="inline-block text-white" />}
			>
				KSP 2 Save Viewer
			</EuiHeaderLogo>,
		];
		if (save !== null) {
			items.push(
				<EuiHeaderLink
					onClick={() => {
						navigate("/home");
					}}
					isActive={location.pathname === "/home"}
					isSelected={location.pathname === "/home"}
				>
					Home
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/vessels");
					}}
					isActive={location.pathname === "/vessels"}
					isSelected={location.pathname === "/vessels"}
				>
					Vessels
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/agencies");
					}}
					isActive={location.pathname === "/agencies"}
					isSelected={location.pathname === "/agencies"}
				>
					Agencies
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/colonies");
					}}
					isActive={location.pathname === "/colonies"}
					isSelected={location.pathname === "/colonies"}
				>
					Colonies
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/flags");
					}}
					isActive={location.pathname === "/flags"}
					isSelected={location.pathname === "/flags"}
				>
					Flags
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/travel-log");
					}}
					isActive={location.pathname === "/travel-log"}
					isSelected={location.pathname === "/travel-log"}
				>
					Travel Log
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						navigate("/stats");
					}}
					isActive={location.pathname === "/stats"}
					isSelected={location.pathname === "/stats"}
				>
					Stats
				</EuiHeaderLink>
			);
		}
		return items;
	}, [location.pathname, save, navigate]);

	const headerRightItems = useMemo(() => {
		const items = [
			<EuiHeaderLink
				target="_blank"
				href="https://github.com/Rodentman87/ksp-2-save-viewer"
			>
				Source
			</EuiHeaderLink>,
			<EuiHeaderLink
				onClick={() => {
					navigate("/licenses");
				}}
				isActive={location.pathname === "/licenses"}
				isSelected={location.pathname === "/licenses"}
			>
				Licenses
			</EuiHeaderLink>,
			<EuiHeaderLink
				onClick={() => {
					toggleTheme();
				}}
			>
				Toggle Theme
			</EuiHeaderLink>,
		];
		if (save !== null) {
			items.unshift(
				<EuiHeaderLink
					onClick={() => {
						setSaveFile(null);
						navigate("/");
					}}
				>
					Clear Selected Save
				</EuiHeaderLink>,
				<EuiHeaderLink
					onClick={() => {
						setShowExportModal(true);
					}}
				>
					Export Save
				</EuiHeaderLink>
			);
		}
		return items;
	}, [location.pathname, save, navigate, toggleTheme]);

	return (
		<>
			{save !== null && showExportModal && (
				<EuiModal onClose={() => setShowExportModal(false)}>
					<EuiModalHeader>
						<EuiText>
							<h2>Export Save</h2>
						</EuiText>
					</EuiModalHeader>
					<EuiModalBody>
						Warning, the save export is not 100% tested and may cause
						inconsistencies with your previous save file. It is recommended that
						you backup your save file before overwriting it with the export.
					</EuiModalBody>
					<EuiModalFooter>
						<EuiButton
							color="danger"
							onClick={() => {
								save.export();
							}}
						>
							Export Save
						</EuiButton>
					</EuiModalFooter>
				</EuiModal>
			)}
			<motion.div className="absolute top-0 left-0 w-screen">
				<EuiHeader
					theme="dark"
					sections={[
						{
							items: headerLeftItems,
						},
						{
							items: headerRightItems,
						},
					]}
				/>
			</motion.div>
		</>
	);
};
