export const colors = {
	muted: "#838383",
	gray: "#aaaaaa",
	background: "#151515",
	backgrounddark: "#252525",
	border: "#777",
	borderlight: "#5f5f5f",
	blueBackground: "#0a0a23",
	dfblue: "#00ADE1",
	dfgreen: "#00DC82",
	dfred: "#FF6492",
	dfyellow: "#e8e228",
	dfpurple: "#9189d9",
	dfwhite: "#ffffff",
	dfblack: "#000000",
	dfrare: "#6b68ff",
	dfepic: "#c13cff",
	dflegendary: "#f8b73e",
	dfmythic: "#ff44b7",
};
export const clickableLinkStyle = {textDecoration: "underline", cursor: "pointer"}

export const listingStyles = {
	listing: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
		gridColumnGap: "4px",
		textAlign: "center"
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	} // TODO: longText should be 
};

export const orderStyles = {
	order: {
		display: "grid",
		gridColumnGap: "4px",
		textAlign: "center",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
	}
};

export const orderPlacerStyles = { // TODO: unify all styles in single file
	order: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		columnGap: "4px",
		rowGap: "4px",
	},
	longText: {
		overflow: "hidden",
		"text-overflow": "ellipsis",
		"white-space": "nowrap"
	}
};

export const myPlanetstyles = {
	planets: {
		display: "grid",
		gridRowGap: "4px",
	},
	empty: {
		color: "#838383",
	},
};