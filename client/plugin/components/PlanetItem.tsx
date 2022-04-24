import { h } from "preact";


const styles = {

};

export function PlanetItem({ key, planet }) {

	return (
		<div>
			Planet:
			{key} === {planet.x}, {planet.y}
		</div>
	);
}
