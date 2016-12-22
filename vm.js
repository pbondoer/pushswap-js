/*
sa  | sb    | ss  // swap the top two elements of an array (a, b, both)
pa  | pb    |     // push top of a to top of b (or reverse)
ra  | rb    | rr  // rotate array
rra | rrb   | rrr // reverse rotate (per array, and both)
*/

var M = module.exports;

var swapper = M.swapper = A => (A[0] ^= A[1], A[1] ^= A[0], A[0] ^= A[1]);
var pusher = M.pusher = (X, Y) => Y.unshift(X.shift());
var rotater = M.rotater = A => A.push(A.shift());
var unrotater = M.unrotater = A => A.unshift(A.pop());

var sorter = M.sorter = function (o_A) {
    var A = o_A.slice(0);
    var B = [];

    return {
        sa: _ => swapper(A),
        sb: _ => swapper(B),
        ss: _ => (swapper(A),swapper(B)),

        pa: _ => pusher(B, A),
        pb: _ => pusher(A, B),

        ra: _ => rotater(A),
        rb: _ => rotater(B),
        rr: _ => (rotater(A), rotater(B)),

        rra: _ => unrotater(A),
        rrb: _ => unrotater(B),
        rrr: _ => (unrotater(A), unrotater(B)),

        ga: _ => A,
        gb: _ => B,
    };
};

var log = M.log = m => console.log(m);
var debug = (A, l) => (l||'') + JSON.stringify(A);

var isSorted = M.isSorted = A => {
    var A2 = A.slice(0).sort();
    return !A.some((a, i) => a !== A2[i]);
};

var isCorrect = (O, A) => isSorted(A) && O.length === A.length;

var run = M.run = (A, src) => {
    var ops = src.split(/\s+/).filter(s => s.trim());

    log(A);
    var S = sorter(A);
    ops.forEach(op => {
        log(op);
        S[op]();
        log(debug(S.ga(), 'A: '));
        log(debug(S.gb(), 'B: '));
    });

    log('========================');
    log(S.ga());

    log(`Correct: ${isCorrect(A, S.ga())}`);
    return ops.length;
};


