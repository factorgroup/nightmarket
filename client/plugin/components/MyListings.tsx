import { h } from "preact";
import { useState } from "preact/hooks";
const styles = {
	artifacts: {
		display: "grid",
		gridRowGap: "4px",
	},
	empty: {
		color: "#838383",
	},
};

export function MyListings({ listings = [] }) {
	return (
		<div>
			This is the MyListings View
			<div>{listings}</div>
		</div>

	)
}