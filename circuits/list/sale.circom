pragma circom 2.0.3;

// TODO (just a placeholder circuit for now)
template Sale () {
	// public
    signal input a;
	// private
    signal input b;
	// output
    signal output c;
    
    c <== a * b;
}

/* INPUT = {
    "a": "5",
    "b": "77"
} */

component main { public [ a ] } = Sale();