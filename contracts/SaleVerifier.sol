// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


abstract contract IVerifier {
    function verify(
        uint256[8] memory,
        uint256[7] memory
    ) virtual public view returns (bool);
}

library Pairing {

    uint256 constant PRIME_Q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    struct G1Point {
        uint256 x;
        uint256 y;
    }

    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint256[2] x;
        uint256[2] y;
    }

    /*
     * @return The negation of p, i.e. p.plus(p.negate()) should be zero. 
     */
    function negate(G1Point memory p) internal pure returns (G1Point memory) {

        // The prime q in the base field F_q for G1
        if (p.x == 0 && p.y == 0) {
            return G1Point(0, 0);
        } else {
            return G1Point(p.x, PRIME_Q - (p.y % PRIME_Q));
        }
    }

    /*
     * @return The sum of two points of G1
     */
    function plus(
        G1Point memory p1,
        G1Point memory p2
    ) internal view returns (G1Point memory r) {

        uint256[4] memory input;
        input[0] = p1.x;
        input[1] = p1.y;
        input[2] = p2.x;
        input[3] = p2.y;
        bool success;

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }

        require(success,"pairing-add-failed");
    }

    /*
     * @return The product of a point on G1 and a scalar, i.e.
     *         p == p.scalar_mul(1) and p.plus(p) == p.scalar_mul(2) for all
     *         points p.
     */
    function scalar_mul(G1Point memory p, uint256 s) internal view returns (G1Point memory r) {

        uint256[3] memory input;
        input[0] = p.x;
        input[1] = p.y;
        input[2] = s;
        bool success;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success,"pairing-mul-failed");
    }

    /* @return The result of computing the pairing check
     *         e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
     *         For example,
     *         pairing([P1(), P1().negate()], [P2(), P2()]) should return true.
     */
    function pairing(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2,
        G1Point memory d1,
        G2Point memory d2
    ) internal view returns (bool) {

        G1Point[4] memory p1 = [a1, b1, c1, d1];
        G2Point[4] memory p2 = [a2, b2, c2, d2];

        uint256 inputSize = 24;
        uint256[] memory input = new uint256[](inputSize);

        for (uint256 i = 0; i < 4; i++) {
            uint256 j = i * 6;
            input[j + 0] = p1[i].x;
            input[j + 1] = p1[i].y;
            input[j + 2] = p2[i].x[0];
            input[j + 3] = p2[i].x[1];
            input[j + 4] = p2[i].y[0];
            input[j + 5] = p2[i].y[1];
        }

        uint256[1] memory out;
        bool success;

        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }

        require(success, "pairing-opcode-failed");

        return out[0] != 0;
    }
}

contract Verifier is IVerifier {
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }

    struct VerifyingKey {
        Pairing.G1Point alpha1;
        Pairing.G2Point beta2;
        Pairing.G2Point gamma2;
        Pairing.G2Point delta2;
        Pairing.G1Point[8] IC;
    }

    using Pairing for *;

    uint256 constant PRIME_Q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
    string constant ERROR_PROOF_Q = "VE1";
    string constant ERROR_INPUT_VAL = "VE2";

    function verifyingKey() internal pure returns (VerifyingKey memory vk) {
        vk.alpha1 = Pairing.G1Point(
            uint256(20491192805390485299153009773594534940189261866228447918068658471970481763042),
            uint256(9383485363053290200918347156157836566562967994039712273449902621266178545958)
        );
        vk.beta2 = Pairing.G2Point(
            [uint256(4252822878758300859123897981450591353533073413197771768651442665752259397132),
             uint256(6375614351688725206403948262868962793625744043794305715222011528459656738731)],
            [uint256(21847035105528745403288232691147584728191162732299865338377159692350059136679),
             uint256(10505242626370262277552901082094356697409835680220590971873171140371331206856)]
        );
        vk.gamma2 = Pairing.G2Point(
            [uint256(11559732032986387107991004021392285783925812861821192530917403151452391805634),
             uint256(10857046999023057135944570762232829481370756359578518086990519993285655852781)],
            [uint256(4082367875863433681332203403145435568316851327593401208105741076214120093531),
             uint256(8495653923123431417604973247489272438418190587263600148770280649306958101930)]
        );
        vk.delta2 = Pairing.G2Point(
            [uint256(11896889327360910708440854836161262251558763104555607465208844840587153993861),
             uint256(17307208169555205196993432313900727980384186594042618159219165269656548299277)],
            [uint256(6295171851432356563272715872180038030377040700307934254065753297905169011848),
             uint256(18673936487543105313625012277438804903438760441455592346677478050970007152629)]
        );
        vk.IC[0] = Pairing.G1Point(
            uint256(7577629107392985297190149685631035247710237637213815901629642261135725319204),
            uint256(4511210023358226725210916722016138781663550561696076911946107281282213910872)
        );
        vk.IC[1] = Pairing.G1Point(
            uint256(16129336533522170986026447384984343719961478764445439199351271434561543130017),
            uint256(11556170232755339683579527500257446974529450384062795572232290019547192654826)
        );
        vk.IC[2] = Pairing.G1Point(
            uint256(4164365559969027470567840390406762553877808295196744950312648007362960806403),
            uint256(281783767846248458517360895913056509781098537029686474222016066396275856325)
        );
        vk.IC[3] = Pairing.G1Point(
            uint256(21783136076820882775771048736833981924259786659412240716201527524473792846773),
            uint256(17325792878155631413520135735536133181134848274249313275316064136468281936892)
        );
        vk.IC[4] = Pairing.G1Point(
            uint256(10269173810795378887647935546288001557412889212708683337327808068501064789875),
            uint256(7300974751670697393070024253871518247697099701000740092418690938198680411177)
        );
        vk.IC[5] = Pairing.G1Point(
            uint256(5315097762140670158565584600490116094157412390833239887800001738922485077648),
            uint256(15135582211103807123516135608082860003305215566227052762254663536286187216764)
        );
        vk.IC[6] = Pairing.G1Point(
            uint256(15684949608827263513686905701138591888845646946498611477875386109839349568063),
            uint256(20041309004341399007120941293705005898515239536692692226724010725252872681766)
        );
        vk.IC[7] = Pairing.G1Point(
            uint256(8292706341529648915941357985567613159491608396122155506952309442788671993036),
            uint256(5324685688819076696912591238326675597334209326423884333054449615675151635746)
        );

    }

    /*
     * @returns Whether the proof is valid given the verifying key and public
     *          input. Note that this function only supports one public input.
     *          Refer to the Semaphore source code for a verifier that supports
     *          multiple public inputs.
     */
    function verify(
        uint256[8] memory _proof,
        uint256[7] memory input
    ) override public view returns (bool) {
        VerifyingKey memory vk = verifyingKey();
        Proof memory proof;
        proof.a = Pairing.G1Point(_proof[0], _proof[1]);
        proof.b = Pairing.G2Point(
            [_proof[2], _proof[3]],
            [_proof[4], _proof[5]]
        );
        proof.c = Pairing.G1Point(_proof[6], _proof[7]);

        // Make sure that proof.A, B, and C are each less than the prime q
        require(proof.a.x < PRIME_Q, ERROR_PROOF_Q);
        require(proof.a.y < PRIME_Q, ERROR_PROOF_Q);

        require(proof.b.x[0] < PRIME_Q, ERROR_PROOF_Q);
        require(proof.b.y[0] < PRIME_Q, ERROR_PROOF_Q);

        require(proof.b.x[1] < PRIME_Q, ERROR_PROOF_Q);
        require(proof.b.y[1] < PRIME_Q, ERROR_PROOF_Q);

        require(proof.c.x < PRIME_Q, ERROR_PROOF_Q);
        require(proof.c.y < PRIME_Q, ERROR_PROOF_Q);

        uint256 SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;

        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);

        for (uint256 i = 0; i < 7; i++) {
            // Make sure that every input is less than the snark scalar field
            require(input[i] < SNARK_SCALAR_FIELD,"verifier-gte-snark-scalar-field");

            vk_x = Pairing.plus(vk_x, Pairing.scalar_mul(vk.IC[i + 1], input[i]));
        }

        vk_x = Pairing.plus(vk_x, vk.IC[0]);

        return Pairing.pairing(
            Pairing.negate(proof.a),
            proof.b,
            vk.alpha1,
            vk.beta2,
            vk_x,
            vk.gamma2,
            proof.c,
            vk.delta2
        );
    }
}
