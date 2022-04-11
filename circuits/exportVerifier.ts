import * as fs from 'fs'

const main = async (
	circuitName: string
) => {

	// Note: hardcoded paths here
	const verifierSolPath = `./contracts/${circuitName}Verifier.sol`
	const verifierTemplatePath = `./circuits/verifierTemplate.sol`
	const vkJsonPath = `./client/${circuitName}/${circuitName}.vkey.json`

	if (!fs.existsSync(verifierTemplatePath)) {
		console.error('The verifier template file does not exist')
		process.exit(1)
	}

	if (!fs.existsSync(vkJsonPath)) {
		console.error('The vk.json file does not exist')
		process.exit(1)
	}

	const vkJson = fs.readFileSync(vkJsonPath).toString()
	const verificationKey = JSON.parse(vkJson)

	let template = fs.readFileSync(verifierTemplatePath).toString()
	const vkalpha1_str =
		`\n            ` +
		`uint256(${verificationKey.vk_alpha_1[0].toString()}),\n` +
		`            uint256(${verificationKey.vk_alpha_1[1].toString()})\n        `
	template = template.replace("<%vk_alpha1%>", vkalpha1_str)

	const vkbeta2_str =
		`\n            ` +
		`[uint256(${verificationKey.vk_beta_2[0][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_beta_2[0][0].toString()})],\n` +
		`            [uint256(${verificationKey.vk_beta_2[1][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_beta_2[1][0].toString()})]\n        `
	template = template.replace("<%vk_beta2%>", vkbeta2_str)

	const vkgamma2_str =
		`\n            ` +
		`[uint256(${verificationKey.vk_gamma_2[0][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_gamma_2[0][0].toString()})],\n` +
		`            [uint256(${verificationKey.vk_gamma_2[1][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_gamma_2[1][0].toString()})]\n        `
	template = template.replace("<%vk_gamma2%>", vkgamma2_str)

	const vkdelta2_str =
		`\n            ` +
		`[uint256(${verificationKey.vk_delta_2[0][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_delta_2[0][0].toString()})],\n` +
		`            [uint256(${verificationKey.vk_delta_2[1][1].toString()}),\n` +
		`             uint256(${verificationKey.vk_delta_2[1][0].toString()})]\n        `
	template = template.replace("<%vk_delta2%>", vkdelta2_str)
	const vil = '<%vk_input_length%>'
	while (template.includes(vil)) {
		template = template.replace(vil, (verificationKey.IC.length - 1).toString())
	}
	const vic = '<%vk_ic_length%>'
	while (template.includes(vic)) {
		template = template.replace(vic, verificationKey.IC.length.toString())
	}

	let vi = ""
	for (let i = 0; i < verificationKey.IC.length; i++) {
		if (vi != "") vi = vi + "        ";
		vi = vi + `vk.IC[${i}] = Pairing.G1Point(\n` +
			`            uint256(${verificationKey.IC[i][0].toString()}),\n` +
			`            uint256(${verificationKey.IC[i][1].toString()})\n        );\n`
	}
	template = template.replace("<%vk_ic_pts%>", vi)

	fs.writeFileSync(verifierSolPath, template)
}

if (require.main === module) {
	if (process.argv.length !== 3) {
		console.error('Usage: node <this file> <name of circuit>')
		process.exit(1)
	}
	const circuitName = process.argv[2];

	main(
		circuitName
	)
}