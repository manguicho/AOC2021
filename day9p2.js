let s = `2199943210
3987894921
9856789892
8767896789
9899965678`.split("\n")
s = s.map((e,j)=>e.split("").map(Number))//.map((f,k)=>set.set(j.toString()+","+k.toString(),f)))

const nearby = (y,x) =>
  [
    [Number(y), Number(x) - 1],
    [Number(y), Number(x) + 1],
    [Number(y) - 1, Number(x)],
    [Number(y) + 1, Number(x)],
  ].filter(([yy, xx]) => yy >= 0 && yy < s.length && xx >= 0 && xx < s[0].length);

const getBasin = (y,x,set)=>{
	let adys = nearby(y,x).filter(e=>Number(s[e[0]][e[1]])<9 && !(set.has(e[0].toString()+","+e[1].toString())))
	adys.forEach(e=>{
		set.add(e[0].toString()+","+e[1].toString());
		getBasin(e[0],e[1],set)
	})		
	return set.size
}

const getLows = ()=>{
	let res = []
	for (y in s)
		for (x in s[y])
			if (s[y][x] < Math.min(...nearby(y,x).map(e=>s[e[0]][e[1]]))) res.push([y,x])
	return res
}

console.log("P1",getLows().map(e=>s[e[0]][e[1]]).reduce((a,b)=>a+b)+getLows().length)
console.log("P2",getLows().map(e=>getBasin(e[0], e[1], (new Set()))).sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a*b))
