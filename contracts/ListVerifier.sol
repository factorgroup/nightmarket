// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


abstract contract IVerifier {
    function verify(
        uint256[8] memory,
        uint256[15] memory
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
        Pairing.G1Point[16] IC;
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
            [uint256(12599857379517512478445603412764121041984228075771497593287716170335433683702),
             uint256(7912208710313447447762395792098481825752520616755888860068004689933335666613)],
            [uint256(11502426145685875357967720478366491326865907869902181704031346886834786027007),
             uint256(21679208693936337484429571887537508926366191105267550375038502782696042114705)]
        );
        vk.IC[0] = Pairing.G1Point(
            uint256(16218905599826448895242028545807567741589768123958536096702191207973750214617),
            uint256(4537176114213662795725926208967156028505502267412490153839447145800430731445)
        );
        vk.IC[1] = Pairing.G1Point(
            uint256(7106984253856114116541967700095875958155405405691331755706133431590463035310),
            uint256(5817221333417605446908504558291553134261301633719184747703788480063534429312)
        );
        vk.IC[2] = Pairing.G1Point(
            uint256(1766660006446479618980561422106691857947511913922347502741022673540524715351),
            uint256(13140095120401486462041029359588642164115984248987638050831817716082082308054)
        );
        vk.IC[3] = Pairing.G1Point(
            uint256(8863075795233137578099804411078010343554420598505767553436858993514371089808),
            uint256(11044829890792557718217043948190745534428150041280266991293498166878997175005)
        );
        vk.IC[4] = Pairing.G1Point(
            uint256(12655352859534191364590785907334038300713650165056223806279095530501861144831),
            uint256(10922736113479847674440518376046258539973609312992490431456657242611432604632)
        );
        vk.IC[5] = Pairing.G1Point(
            uint256(14996133675380327151229720868626470300477745906678364703999354533619379625238),
            uint256(5145529836171022111353935241774945971168176768163015443107876645418989187519)
        );
        vk.IC[6] = Pairing.G1Point(
            uint256(13285401096558367914365497845061350465278877245156774900959448526977417845706),
            uint256(6001458813695364449105024118948453857686344273609286180097703046916738228373)
        );
        vk.IC[7] = Pairing.G1Point(
            uint256(3895720088633437982817217868088075883999156383103471599760013466612511751383),
            uint256(14666426593917190888381081101786007105128244528710830080040376486612324121521)
        );
        vk.IC[8] = Pairing.G1Point(
            uint256(5572625152876606568129324375530481372167611989920048248567094354516630236579),
            uint256(6716347073427300842035278401814619115019884478232131394361436561593403078247)
        );
        vk.IC[9] = Pairing.G1Point(
            uint256(10134312334954126246056338326242819166363746578737013060355613841611318154058),
            uint256(3524562595603937610816377697820970008911067578631632477762889250913793017116)
        );
        vk.IC[10] = Pairing.G1Point(
            uint256(3503742399253984735230373885468899706793596465312949993983811305649184258248),
            uint256(580404355773384068428593350019825711193826664088830713227361120418997449874)
        );
        vk.IC[11] = Pairing.G1Point(
            uint256(1594204818742989463295539930679197972197265303769344256551570155896758349082),
            uint256(18457554959053521842288257436850121309540181148060498209497158993343828132954)
        );
        vk.IC[12] = Pairing.G1Point(
            uint256(7722815216730514137171677248184842420716918527963933762413071918933108672030),
            uint256(8771713572797039653765392316998676683163033560770762629430372757211556923198)
        );
        vk.IC[13] = Pairing.G1Point(
            uint256(10327910756328756654418937901389915359444222830390828459655779616514476405806),
            uint256(11539565975794882679040830889975941653407232230332206539883201818643153447467)
        );
        vk.IC[14] = Pairing.G1Point(
            uint256(2612680725605364625871698075146115016016307008195275765764428431609664864012),
            uint256(7716659423576194779741597695086881546054296277526515971201354688196410154291)
        );
        vk.IC[15] = Pairing.G1Point(
            uint256(14442185447439485192660204577547661358042533309336275650767875087075531111320),
            uint256(6767267710264067116315360566405666002121686489099382132021090145813138947198)
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
        uint256[15] memory input
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

        for (uint256 i = 0; i < 15; i++) {
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
