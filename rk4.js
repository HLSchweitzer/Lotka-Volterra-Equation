function atualiza(){

let h = 0.2 // Tamanho do passo do Runge-Kutta
let graf1 = document.getElementById("grafico")
let graf2 = document.getElementById("grafico1")
let graf3 = document.getElementById("grafico2")
let graf4 = document.getElementById("grafico3")
let graf5 = document.getElementById("grafico4")

let alpha = (document.getElementById("slide1").value)/100 // Taxa de crescimento da presa do primeiro modelo
let beta = (document.getElementById("slide2").value)/100 // Taxa de mortalidade da presa devido a predação do primeiro modelo
let gama = (document.getElementById("slide3").value)/100 // Taxa natural de mortalidade do predador do primeiro modelo
let theta = (document.getElementById("slide4").value)/100 // Fator descrevendo quantas presas consumidas geram um novo predador do primeiro modelo

let alpha1 = (document.getElementById("slide11").value)/100 // Taxa de crescimento da presa do segundo modelo
let beta1 = (document.getElementById("slide22").value)/100 // Taxa de mortalidade da presa devido a predação do segundo modelo
let gama1 = (document.getElementById("slide33").value)/100 // Taxa natural de mortalidade do predador do segundo modelo
let theta1 = (document.getElementById("slide44").value)/100 // Fator descrevendo quantas presas consumidas geram um novo predador de segundo modelo
let M = (document.getElementById("slideM").value) // População máxima do segundo modelo

document.getElementById("alphaval").innerHTML = alpha
document.getElementById("betaval").innerHTML = beta
document.getElementById("gamaval").innerHTML = gama
document.getElementById("thetaval").innerHTML = theta

document.getElementById("alphaval1").innerHTML = alpha1
document.getElementById("betaval1").innerHTML = beta1
document.getElementById("gamaval1").innerHTML = gama1
document.getElementById("thetaval1").innerHTML = theta1

document.getElementById("M").innerHTML = M

let resolution = 1000

let p = [] // Presa do primeiro modelo
let w = [] // Predador do primeiro modelo
p[0] = 5 
w[0] = 2 


let c = [] // Presa do segundo modelo
let l = [] // Predador do segundo modelo
c[0] = 5
l[0] = 2

tempo= [] // Tempo usado como eixo horizontal do gráfico


for(let i=0;i<resolution;i++){
    tempo[i] = i/100
}

// Equação diferencial da população da presa do primeiro modelo
function dpdt(p,w) {
	return (alpha*p-beta*p*w) 
}

// Equação diferencial da população do predador do primeiro modelo
function dwdt(p,w) {
	return (theta*p*w-gama*w) 	
}

//Equação diferencial da população da presa do segundo modelo
function dcdt(c,l){
	return (alpha1*c*(1-c/M)-beta1*c*l)
}

//Equação diferencial da população do predador do segundo modelo
function dldt(c,l){
	return(theta1*c*l-gama1*l)
}

let aproximC1 = []

function faproximC1(t){
	return((gama/theta)+(gama/theta)*Math.cos(Math.sqrt(alpha*gama)*(t/5)))

}

for(let t=0; t<resolution; t++){
aproximC1[t] = faproximC1(t)
}


//Método de Runge Kutta de quarta ordem
	

for(let i=0; i<resolution;i++){
	
	let k1 = dpdt(p[i],w[i])
	let k11 = dwdt(p[i],w[i])
	let k111 = dcdt(c[i],l[i])
	let k1111 = dldt(c[i],l[i])

	let s1 = p[i] + k1*h*0.5
	let s11 = w[i] + k11*h*0.5
	let s111 = c[i] + k111*h*0.5
	let s1111 = l[i] + k1111*h*0.5
	
	let k2 = dpdt(s1,s11)
	let k22 = dwdt(s1,s11)
	let k222 = dcdt(s111,s1111)
	let k2222 = dldt(s111,s1111)
	
	let s2 = p[i] + k2*h*0.5
	let s22 = w[i] + k22*h*0.5
	let s222 = c[i] + k222*h*0.5
	let s2222 = l[i] + k2222*h*0.5

	let k3 = dpdt(s2,s22)
	let k33 = dwdt(s2,s22)
	let k333 = dcdt(s222,s2222)
	let k3333 = dldt(s222,s2222)

	let s3 = p[i]+k3*h
	let s33 = w[i]+k33*h
	let s333 = c[i]+k333*h
	let s3333 = l[i] + k3333*h
	
	let k4 = dpdt(s3,s33)
	let k44 = dwdt(s3,s33)
	let k444 = dcdt(s333,s3333)
	let k4444 = dldt(s333,s3333)

	p[i+1] = p[i] + h*(k1/6+k2/3+k3/3+k4/6)
	w[i+1] = w[i] + h*(k11/6+k22/3+k33/3+k44/6)
	c[i+1] = c[i] + h*(k111/6+k222/3+k333/3+k444/6)
	l[i+1] = l[i] + h*(k1111/6+k2222/3+k3333/3+k4444/6)
	}
	

	

var graf_1 = {
    x:tempo,
    y:p,
    mode:'lines',
    type:'scatter',
    name:"Presa"

}

var graf_2 = {
    x:tempo,
    y:w,
    mode:'lines',
    type:'scatter',
    name:"Predador"

}


var graf_3 = {
	x:p,
	y:w,
	mode:'lines',
	type:'scatter',
	
}
var graf_4 = {
    x:tempo,
    y:c,
    mode:'lines',
    type:'scatter',
    name:"Presa"
}

var graf_5 = {
    x:tempo, 
    y:l,
    mode:'lines',
    type:'scatter',
    name:"Predador"
}

var graf_6 = {
    x:c,
    y:l,
    mode:'lines',
    type:'scatter'
}

var graf_7 = {
    x:tempo,
    y:aproximC1,
    mode:'lines',
    type:'scatter',
    name:'Aproximação'
}

var layout_1 = {
	xaxis:{title:"Tempo"},
	yaxis:{title:"População"},
	title:"População da Presa e do Predador"
}


var layout_2 = {
	xaxis:{title:"Presa"},
	yaxis:{title:"Predador"},
	title:"População da Presa X Predador"
}


let data =[graf_1,graf_2,]
let data1 = [graf_3]
let data2 = [graf_4,graf_5]
let data3 = [graf_6]


Plotly.newPlot(graf1,data,layout_1)
Plotly.newPlot(graf2,data1,layout_2)
Plotly.newPlot(graf3,data2,layout_1)
Plotly.newPlot(graf4,data3,layout_2)
Plotly.newPlot(graf5,[graf_7,graf_1])
}

atualiza()



