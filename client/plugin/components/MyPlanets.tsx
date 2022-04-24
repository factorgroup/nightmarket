import { h } from "preact";
import { Planet } from "@darkforest_eth/types";
import { PlanetActiveArtifact } from "@df_client/src/Frontend/Views/PlanetCardComponents";
import { PlanetItem } from "./PlanetItem";

const styles = {
	planets: {
		display: "grid",
		gridRowGap: "4px",
	},
	empty: {
		color: "#838383",
	},
};

export function MyPlanets({
	emptyState,
	planets,
}) {
	console.log("planets");
	const planetsFormatted =
		planets.map((planet: Planet) => (
			<PlanetItem
				key={planet.locationId}
				planet={planet}
			/>
		));

	return (
		<div>
			<div style={styles.planets}>{planetsFormatted}</div>
		</div>
	)
}