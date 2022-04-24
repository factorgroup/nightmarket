import { h } from "preact";
import { Planet } from "@darkforest_eth/types";
import { PlanetActiveArtifact } from "@df_client/src/Frontend/Views/PlanetCardComponents";
import { PlanetItem } from "./PlanetItem";

export function MyPlanets({
	emptyState,
	planets = [] as Planet[],
}) {
	const planetsFormatted =
		planets.map((planet) => {
			<PlanetItem
				key={planet.locationId}
				planet={planet}
			/>
		})

	return (
		<div>
			{planetsFormatted}
		</div>
	)
}