import { h } from "preact";

export function NumInput({
	value,
	onChange,
	style,
	type,
	placeholder = 0,
	min = 0,
	step = 1,
	required = true,
	name
}) {
	const inputStyle = {
		outline: "none",
		background: "rgb(21, 21, 21)",
		color: "rgb(131, 131, 131)",
		borderRadius: "4px",
		border: "1px solid rgb(95, 95, 95)",
		padding: "0 4px",
		...style,
	};

	return (
		<input
			name={name}
			style={inputStyle}
			type={type}
			min={min}
			value={value}
			step={step}
			placeholder={placeholder.toString()}
			// @ts-expect-error
			onInput={(e) => onChange(e.target.value)}
			required={required}
		/>
	);
}

export function TextInput({
	value,
	onChange,
	style,
	type,
	placeholder = "",
	required = true,
	name
}) {
	const inputStyle = {
		outline: "none",
		background: "rgb(21, 21, 21)",
		color: "rgb(131, 131, 131)",
		borderRadius: "4px",
		border: "1px solid rgb(95, 95, 95)",
		padding: "0 4px",
		...style,
	};

	return (
		<input
			name={name}
			style={inputStyle}
			type={type}
			value={value}
			placeholder={placeholder}
			// @ts-expect-error
			onInput={(e) => onChange(e.target.value)}
			required={required}
		/>
	);
}