import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

export const Loading = ({ length = 5, padding = 8 }) => {
	const [indicator, setIndicator] = useState(". ");
	useEffect(() => {
		let timeout = setTimeout(() => {
			if (indicator.length === length * 2) setIndicator(". ");
			else setIndicator(indicator + ". ");
		}, 150); // wait before showing loader

		return () => clearTimeout(timeout);
	}, [indicator]);

	return <div style={{ padding }}>{indicator}</div>;
};
