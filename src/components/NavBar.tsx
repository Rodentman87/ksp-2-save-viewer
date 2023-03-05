import { EuiHeader, EuiHeaderLink, EuiHeaderLogo } from "@elastic/eui";
import { motion } from "framer-motion";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSaveFile } from "../SaveFileContext";
import { useTheme } from "../ThemeContext";

export const NavBar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const save = useSaveFile();

	const { toggleTheme } = useTheme();

	return (
		<>
			<motion.div className="absolute top-0 left-0 w-screen">
				<EuiHeader
					theme="dark"
					sections={[
						{
							items: [
								<EuiHeaderLogo iconType="globe">
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
										save.export();
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
