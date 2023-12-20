import { EuiPageTemplate } from "@elastic/eui";
import { FirstsTab } from "components/StatsTabs/FirstsTab";
import React, { useMemo } from "react";
import { OverviewTab } from "../components/StatsTabs/OverviewTab";
import { VesselsTab } from "../components/StatsTabs/VesselsTab";

interface MyTabProps {
	id: string;
	label: string;
	content?: React.ReactNode;
}

const tabs: MyTabProps[] = [
	{
		id: "overview",
		label: "Overview & Records",
		content: <OverviewTab />,
	},
	{
		id: "vessels",
		label: "Vessels",
		content: <VesselsTab />,
	},
	{
		id: "firsts",
		label: "Firsts",
		content: <FirstsTab />,
	},
];

export const Stats: React.FC = () => {
	const [selectedTabId, setSelectedTabId] = React.useState("overview");

	const selectedTabContent = useMemo(() => {
		return tabs.find((tab) => tab.id === selectedTabId)?.content;
	}, [selectedTabId]);

	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="visPie"
				pageTitle="Stats"
				restrictWidth={false}
				tabs={tabs.map((tab: MyTabProps) => {
					return {
						label: tab.label,
						isSelected: tab.id === selectedTabId,
						onClick: () => setSelectedTabId(tab.id),
					};
				})}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				{selectedTabContent}
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
