import { h } from "preact";
import { Planet } from "@darkforest_eth/types";
import { PlanetItem } from "./PlanetItem";
import { myPlanetstyles } from "../helpers/theme";

export function MyPlanets ({
	emptyState,
	planets,
	setActivePlanet
}) {
	console.log("Calling MyPlanets");
	const planetsFormatted =
		planets.map((planet: Planet) => (
			<PlanetItem
				key={planet.locationId}
				planet={planet}
				action={setActivePlanet(planet)}
			/>
		));

	return (
		<div>
			<div style={myPlanetstyles.planets}>{planetsFormatted}</div>
		</div>
	);
}