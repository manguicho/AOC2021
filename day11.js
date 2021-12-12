let s= `6318185732
1122687135
5173237676
8754362612
5718474666
8443654137
1247634346
1446514585
6717288267
1727871228`.split('\n')
    .map(e => e.split('').map(e => parseInt(e)));

ss=`11111
19991
19191
19991
11111`.split('\n') //EXAMPLE
    .map(e => e.split('').map(e => parseInt(e)));

const nearby = (y,x) =>
  [
    [(y), (x) - 1],
    [(y), (x) + 1],
    [(y) - 1, (x)],
    [(y) + 1, (x)],
    [(y) - 1, (x)+1],
    [(y) + 1, (x)-1],
    [(y) - 1, (x)-1],
    [(y) + 1, (x)+1],
  ].filter(([yy, xx]) => yy >= 0 && yy < s.length && xx >= 0 && xx < s[0].length);


const flash = (input, y,x)=>{
	flashed.push([y,x])
	let neighbours = nearby(y,x)
	for (n of neighbours){		
		let num = 0; num = parseInt(input[n[0]][n[1]])		
		if (!flashed.map(e=>e.join(",")).includes(n.join(",")) && num<10 && num > 0){
			input[n[0]][n[1]] = num+1; //l(y,x,n,s[n[0]][n[1]])
			if (input[n[0]][n[1]] == 10) 	flash(input, n[0],n[1])
		} 
	}
	input[y][x]=0
}

const solve= (input, steps,p2=false)=>
{
	let total = []
	for (i=0;parseInt(i) < ((p2 == false)?parseInt(steps):Infinity);i++){
		input = input.map(e=>e.map(f=>f+1))			
		flashed = []
		for (let y in input)
			for (let x in input){
				if (input[y][x] == 10) {flash(input, parseInt(y),parseInt(x))}
			}	
		total.push(flashed.length)
		if (input.filter(e=>e.join("") == "0000000000").length==10) return parseInt(i)+1
	}
	return total.reduce((a,b)=>a+b)
}

console.log("P1", solve(s,100,false))  
console.log("P2", solve(s,Infinity,true))  
