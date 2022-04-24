import { useState, useEffect } from "preact/hooks";
import { POLL_INTERVAL } from "../helpers/constants";
import { Planet, WorldLocation } from "@darkforest_eth/types";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

export function useMyPlanets() {

	const [myPlanets, setMyPlanets] = useState<Planet[]>([]);
	const [loading, setLoading] = useState(true);
	// TODO decide what to do here with setError
	const [error, setError] = useState();

	useEffect(() => {
		const fetchMyPlanets = () => {
			const planetsIter = df.getAllPlanets();
			const planets = [] as Planet[];
			for (var planet of planetsIter) {
				// Filters for known locations and not yet revealed
				if (
					df.getLocationOfPlanet(planet.locationId) &&
					!planet.coordsRevealed
				) {
					planets.push(planet);
				}
			}
			setMyPlanets(planets);
			// setError(err);
			setLoading(false);
		}

		fetchMyPlanets();
		const poll = setInterval(fetchMyPlanets, POLL_INTERVAL * 6); // fetch every 30s
		return () => clearInterval(poll);
	}, []);

	return {
		myPlanets,
		loading,
		error,
	};
}
