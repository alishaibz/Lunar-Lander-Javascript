//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;

//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 300;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var pausa = 1; //variable que indica que el juego está activo cuando su valor es 0 o en pausa si su valor es 1
var vlimite = 5;

//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var velocidad_limite = null;

//AL CARGAR LA PÁGINA
window.onload = function(){
	
	velocidad_limite = document.getElementById("velocidad_limite");
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	
	//se muestra la pantalla de Inicio
	document.getElementById("inicio").style.display = "table";

	//al hacer click en el botón FÁCIL se inicia el juego en nivel fácil
	document.getElementById("facil").onclick = function () {
		c = 300;
		vlimite = 5;
		combustible.innerHTML=c;	
		velocidad_limite.innerHTML=vlimite;	
		document.getElementById("inicio").style.display = "none";
		start();
		pausa = 0;
	}
	
	//al hacer click en el botón MEDIO se inicia el juego en nivel medio
	document.getElementById("medio").onclick = function () {
		c = 200;
		vlimite = 3;
		combustible.innerHTML=c;
		velocidad_limite.innerHTML=vlimite;
		document.getElementById("inicio").style.display = "none";
		start();
		pausa = 0;
	}
	
	//al hacer click en el botón DIFÍCIL se inicia el juego en nivel difícil
	document.getElementById("dificil").onclick = function () {
		c = 100;
		vlimite = 1;
		combustible.innerHTML=c;
		velocidad_limite.innerHTML=vlimite;
		document.getElementById("inicio").style.display = "none";
		start();
		pausa = 0;
	}
	
	//al hacer click en el botón Menú, el menú se muestra o se esconde
	document.getElementById("bmenu").onclick = function () {
		document.getElementById("menu").classList.toggle("show");
	}

	//al hacer click en la opción Pausar/Reanudar del menú, el juego se pausa o reanuda
	document.getElementById("play-pause").onclick = function () {
		if (pausa == 0){
			pausar();
		} else {
			reanudar();
		}
	}


	//al hacer click en la pantalla se enciende o apaga el motor de la nave
	document.onclick = function () {
		if (pausa==0){
			if (a==g){
				motorOn();
			} else {
				motorOff();
			}
		}
	}

	//al apretar una tecla se enciende el motor de la nave
	document.onkeydown = function () {
		if (pausa==0){
			motorOn();
		}
	}
	
	//al soltar una tecla se apaga el motor de la nave		
	document.onkeyup = function () {
		if (pausa==0){
			motorOff();
		}
	}
}



//DEFINICIÓN DE FUNCIONES

//la nave empieza a moverse
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

//la nave para de moverse
function stop(){
	clearInterval(timer);
}

//mueve la nave
function moverNave(){
	//cambiar velocidad y posición
	v +=a*dt;
	y +=v*dt;
	//si la velocidad es mayor que la velocidad límite se muestra en rojo sino en verde
	if (v > vlimite) {
		document.getElementById("velocidad").style.color = "red";
	} else { 
		document.getElementById("velocidad").style.color = "#00FF00";
	}
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		pausa=1;
		stop();
		motorOff();
		if(v<vlimite){
			document.getElementById("ganador").style.display = "table";
		} else {
			document.getElementById("img_nave").src="img/boom.png";
			document.getElementById("perdedor").style.display = "table";
		}	
	}
}

//enciende el motor
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	document.getElementById("img_nave").src="img/nave_on.png";
	//mientras el motor está activado gasta combustible
	if (timerFuel==null){
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
}

//apaga el motor
function motorOff(){
	a=g;
	document.getElementById("img_nave").src="img/nave_off.png";
	clearInterval(timerFuel); //Para el gasto de combustible
	timerFuel=null;	
}

//actualiza el nivel de combustible de la nave
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
		c = 0;
		motorOff();
	}
	combustible.innerHTML=c.toFixed(2);	
}

//pausa el juego
function pausar() {
	stop();
	document.getElementById("play-pause").innerHTML="Reanudar";
	clearInterval(timerFuel); //Para el gasto de combustible
	timerFuel=null;
	pausa = 1;
}

//reanuda el juego
function reanudar() {
	start();
	document.getElementById("play-pause").innerHTML="Pausar";
	if (timerFuel==null){
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
	pausa = 0;
}