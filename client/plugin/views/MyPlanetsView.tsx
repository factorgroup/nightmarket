import { h } from "preact";
import { ErrorLabel } from "../components/ErrorLabel";
import { Loading } from "../components/Loading";
import { useMyPlanets } from "../hooks/use-myplanets";
import { MyPlanets } from "../components/MyPlanets";

export function MyPlanetsView() {
	// Fetch my planets
	const { myPlanets, loading, error } = useMyPlanets();

	if (error) return <ErrorLabel error={error} />;
	if (loading) return <Loading />;

	console.log("my planets");
	console.log(myPlanets);

	return (
		<div>
			<title>My known coordinates</title>
			<MyPlanets
				emptyState="I don't know of any planet coordinates."
				planets={myPlanets}
			/>
			Helloo my planets
		</div>
	)
}