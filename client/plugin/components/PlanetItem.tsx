import { h } from "preact";
import { getPlanetName, getPlayerColor } from "@darkforest_eth/procedural";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

const styles = {
	planet: {
		display: "grid",
		gridTemplateColumns: "2.75fr 2fr 1fr 2fr 1fr 1fr 1.75fr",
		gridColumnGap: "8px",
		textAlign: "left"
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}
};

export function PlanetItem({ planet, action }) {

	return (
		<div style={styles.planet}>
			{[
				<div style={styles.longText}>{getPlanetName(planet)}</div>,
				<div style={styles.longText}>{planet.owner == 0x0 ? "unowned" : planet.owner}</div>,
				<div>{planet.planetLevel}</div>,
				<div style={styles.longText}>{planet.energy}</div>,
				<div>{planet.silver}</div>
			]}
			<div>{action}</div>
		</div>
	);
}
