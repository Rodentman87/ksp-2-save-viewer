import {
	EuiFlexGrid,
	EuiFlexItem,
	EuiPageTemplate,
	EuiPanel,
} from "@elastic/eui";
import React from "react";
import data from "../licenses.json";

export const Licenses: React.FC = () => {
	return (
		<EuiPageTemplate grow>
			<EuiPageTemplate.Header pageTitle="Licenses" restrictWidth={false} />
			<EuiPageTemplate.Section restrictWidth={false}>
				<EuiFlexGrid columns={3}>
					{data.map((license) => (
						<EuiFlexItem>
							<EuiPanel>
								<h2 className="text-xl font-bold">{license.name}</h2>
								<div className="grid grid-cols-2 gap-1">
									<span>Version</span>
									<span>{license.installedVersion}</span>
									<span>License</span>
									<span>{license.licenseType}</span>
									<span>Repository</span>
									<span>
										<a href={license.link}>{license.link}</a>
									</span>
									<span>Author</span>
									<span>{license.author}</span>
									<span>NPM</span>
									<span>
										<a href={`https://www.npmjs.com/package/${license.name}`}>
											{`https://www.npmjs.com/package/${license.name}`}
										</a>
									</span>
								</div>
							</EuiPanel>
						</EuiFlexItem>
					))}
				</EuiFlexGrid>
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
};
