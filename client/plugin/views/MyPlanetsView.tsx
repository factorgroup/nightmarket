import { h } from "preact";
import { useState } from "preact/hooks";
import { ErrorLabel } from "../components/ErrorLabel";
import { Loading } from "../components/Loading";
import { useMyPlanets } from "../hooks/use-myplanets";
import { MyPlanets } from "../components/MyPlanets";
import { SellPlanetView } from "./SellPlanetView";
import { Button } from '../components/Button';

export function MyPlanetsView() {
	console.log("MyPlanetsView");
	// Fetch my planets
	const { myPlanets, loading, error } = useMyPlanets();

	// Zoom in on planet to sell
	const [activePlanet, setActivePlanet] = useState(false);

	if (error) return <ErrorLabel error={error} />;
	if (loading) return <Loading />;

	// Zoomed View
	if (activePlanet) {
		console.log("Active Planet Mode");
		console.log(activePlanet);
		return (
			<SellPlanetView
				planet={activePlanet}
				setActivePlanet={setActivePlanet}
			/>
		);
	}

	// List view
	// TODO disable sell button when planet is currently listed
	return (
		<div>
			<title>My known coordinates</title>
			<MyPlanets
				emptyState="I don't know of any planet coordinates."
				planets={myPlanets}
				setActivePlanet={(planet) => {
					return (
						<Button
							children={
								("sell")
							}
							style={{ width: "100%" }}
							onClick={() => setActivePlanet(planet)}
						/>
					)
				}}
			/>
		</div>
	)
}