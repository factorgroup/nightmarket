// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


abstract contract IVerifier {
    function verify(
        uint256[8] memory,
        uint256[14] memory
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
        Pairing.G1Point[15] IC;
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
            uint256(21546477247301977935701457766965889487013608826772438623684261051343544656619),
            uint256(10801259158785538258250998948964896397295079297338787499371049169539615854553)
        );
        vk.IC[4] = Pairing.G1Point(
            uint256(6590210873032761970658951855869979890864414531155269666372329738121369319121),
            uint256(5762889784680270361483687830791287521816612564236450879690228662098728141577)
        );
        vk.IC[5] = Pairing.G1Point(
            uint256(4829980570977257718805448787168553550571712835017559165596053529497469472620),
            uint256(16517249978473571923245569872072047830747426077989524323862602695029671837652)
        );
        vk.IC[6] = Pairing.G1Point(
            uint256(20960608398936354818672343637218104576615595687123033665544292986594422852292),
            uint256(16645869376988929380986535305130533608808697655818769218229672852713571995175)
        );
        vk.IC[7] = Pairing.G1Point(
            uint256(20934297992321908805980985037619794525973102836578467788349649133826596386129),
            uint256(7094661137563933540331390746340247645052817748629359121054276962097090950401)
        );
        vk.IC[8] = Pairing.G1Point(
            uint256(11927512710505575828348273292005322405091073526142906848411479424136283415131),
            uint256(13693557773935398134650083680193466991558767709795590447181819478734229728416)
        );
        vk.IC[9] = Pairing.G1Point(
            uint256(4486322222298203086319261152683560331784026035162626266571817335918836203196),
            uint256(3733624912718892630693931874366513227450858396746270032714323358895238693671)
        );
        vk.IC[10] = Pairing.G1Point(
            uint256(19992740291081800675668312215353184369466454853029300325521039710962185034764),
            uint256(19947102138108000647793564550713903642492707898541855597212140706156166372391)
        );
        vk.IC[11] = Pairing.G1Point(
            uint256(3125131774514016957131446600935441344496330472060252660186744192400476379480),
            uint256(14240594206343587749139294569259828957557080667945185697214940714903677847473)
        );
        vk.IC[12] = Pairing.G1Point(
            uint256(15559840171772142100227088566959930751166709905937724224788117701463310768889),
            uint256(15915559181688127645485625143645260331880008297712075231173990055625720409000)
        );
        vk.IC[13] = Pairing.G1Point(
            uint256(141349902522873199466526397608599662305478187061591725576323360504524984372),
            uint256(11871681240383953849040394689670242069834555378152109921671668481329407456161)
        );
        vk.IC[14] = Pairing.G1Point(
            uint256(19156599590514269716845327742679715932548331044022676517760835505452112868857),
            uint256(21498382533481667523409586844450937355039981075450684340460583024193665962085)
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
        uint256[14] memory input
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

        for (uint256 i = 0; i < 14; i++) {
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
