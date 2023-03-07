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
import { motion } from "framer-motion";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { useSaveFile } from "../SaveFileContext";
import { useTheme } from "../ThemeContext";

export const NavBar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [showExportModal, setShowExportModal] = React.useState(false);

	const save = useSaveFile();

	const { toggleTheme } = useTheme();

	return (
		<>
			{showExportModal && (
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
							items: [
								<EuiHeaderLogo
									iconType={() => <Logo className="inline-block text-white" />}
								>
									KSP 2 Save Viewer
								</EuiHeaderLogo>,
								<EuiHeaderLink
									onClick={() => {
										navigate("/");
									}}
									isActive={location.pathname === "/"}
									isSelected={location.pathname === "/"}
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
							],
						},
						{
							items: [
								<EuiHeaderLink
									onClick={() => {
										setShowExportModal(true);
									}}
								>
									Export Save
								</EuiHeaderLink>,
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
							],
						},
					]}
				/>
			</motion.div>
		</>
	);
};
