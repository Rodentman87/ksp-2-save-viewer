import { EuiEmptyPrompt, EuiPageTemplate } from "@elastic/eui";
import React from "react";

export const Colonies: React.FC = () => {
	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header
				iconType="node"
				pageTitle="Colonies"
				restrictWidth={false}
			/>
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiEmptyPrompt
					iconType="node"
					iconColor="danger"
					title={<h2>:(</h2>}
					body={<span>Not yet :(</span>}
				/>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
