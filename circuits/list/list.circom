pragma circom 2.0.3;

// TODO (just a placeholder circuit for now)
template List () {
	// public
    signal input a;
	// private
    signal input b;
	// output
    signal output c;
    
    c <== a * b;
}

// TODO consider refactoring this out
component main { public [ a ] } = List();
