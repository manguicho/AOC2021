const _ = require('lodash')
let s = `VCOPVNKPFOOVPVSBKCOF

NO -> K
PO -> B
HS -> B
FP -> V
KN -> S
HV -> S
KC -> S
CS -> B
KB -> V
OB -> V
HN -> S
OK -> N
PC -> H
OO -> P
HF -> S
CB -> C
SB -> V
FN -> B
PH -> K
KH -> P
NB -> F
KF -> P
FK -> N
FB -> P
FO -> H
CV -> V
CN -> P
BN -> N
SC -> N
PB -> K
VS -> N
BP -> P
CK -> O
PS -> N
PF -> H
HB -> S
VN -> V
OS -> V
OC -> O
BB -> F
SK -> S
NF -> F
FS -> S
SN -> N
FC -> S
BH -> N
HP -> C
VK -> F
CC -> N
SV -> H
SO -> F
HH -> C
PK -> P
NV -> B
KS -> H
NP -> H
VO -> C
BK -> V
VV -> P
HK -> B
CF -> B
BF -> O
OV -> B
OH -> C
PP -> S
SP -> S
CH -> B
OF -> F
NK -> F
FV -> F
KP -> O
OP -> O
SS -> P
CP -> H
BO -> O
KK -> F
HC -> N
KO -> V
CO -> F
NC -> P
ON -> P
KV -> C
BV -> K
HO -> F
PV -> H
VC -> O
NH -> B
PN -> H
VP -> O
NS -> N
NN -> S
BS -> H
SH -> P
VB -> V
VH -> O
FH -> K
FF -> H
SF -> N
BC -> H
VF -> P`

ss= `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

let polymer = s.split("\n\n")[0]
let rules = new Map()
s = s.split("\n\n")[1]
	 .split("\n")
	 .map(e=>rules.set(e.split(" -> ")[0],e.split(" -> ")[1]))

let map = new Map()
for (let i=0; i<polymer.length-1; i++){
	let pair = polymer[i]+polymer[i+1]
	map.set(pair,(map.get(pair)||0)+1) 
}

const step = (steps)=>{
	let letterCount =  _.countBy(polymer)
	for (let i = 1; i <= steps; i++) {
		let new_map = new Map();
		for (let [pair, q] of map) {
			const letter = rules.get(pair);
			new_map.set(pair[0] + letter,  q + (new_map.get(pair[0] + letter) || 0));
			new_map.set(letter  + pair[1], q + (new_map.get(letter  + pair[1]) || 0));
			letterCount[letter] = (letterCount[letter] || 0) +q
			}
		map = new_map;
	}
	return (Math.max(...Object.values(letterCount))-Math.min(...Object.values(letterCount)))
}
console.log("p1", step(10))
console.log("p2", step(40))