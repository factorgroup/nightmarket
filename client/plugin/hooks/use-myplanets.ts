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
			for (var planet of planetsIter) {
				if (df.getLocationOfPlanet(planet.locationId)) {
					setMyPlanets((myPlanets) => [
						...myPlanets,
						planet
					]);
				}
			}
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
