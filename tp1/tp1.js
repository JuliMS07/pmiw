let pantalla = "intro";
let estado = "respirar";
let indice = 0;

//Fondos
let fondoIntro;
let fondoMenu;
let fondoInstrucciones;
let fondoJuego;

//Fotos
let introFrames = [];
let transicionFrames = [];
let respirarFrames = [];
let tomarFrames = [];

//Velocidades
let velocidadIntro = 6;
let velocidadTransicion = 4;
let velocidadRespirar = 10;
let velocidadTomar = 6;

let personajeX = 400;
let personajeY = 350;


//Cargar las imágenes
 function preload () {
   fondoIntro = loadImage("data/pantalla_inicio.png");
   fondoMenu = loadImage("data/menu.png");
   fondoInstrucciones = loadImage("data/instrucciones.png");
   fondoJuego = loadImage("data/fondo.png");
   
   //intro
   for (let i = 0; i < 34; i++){
     let n= i + 1;
     let numero = "";
     if (n < 10){
       numero = "00" + n;  
     } else {
       numero = "0" + n;
     }
     introFrames [i] = loadImage ("data/animacion_inicio_" + numero + ".png");
   }
   
   //Transición
   for (let i = 0; i < 16; i++){
     let n= i + 1;
     let numero = "";
     if (n < 10){
       numero = "00" + n;  
     } else {
       numero = "0" + n;
     }
     transicionFrames [i] = loadImage ("data/transicion_" + numero + ".png");
   }
   
   //Respiración
   respirarFrames[0] = loadImage ("data/respirar_001.png");
   respirarFrames[1] = loadImage ("data/respirar_002.png");
   respirarFrames[2] = loadImage ("data/respirar_003.png");
   
   //Tomar
   for (let i = 0; i < 42; i++) {
    let n = i + 1;
    let numero = "";
    if (n < 10) {
      numero = "00" + n;      
    } else {
      numero = "0" + n;  // esto indica que si el numero es mayor a 10, se le suma un cero adelante
    }
    tomarFrames [i] = loadImage("data/tomar_" + numero + ".png");
  }
}  
   
 function setup () {
   createCanvas (800, 600);
 }

 function draw () {
   if (pantalla === "intro") {
     dibujarIntro();
   } else if (pantalla === "transicion") {
     dibujarTransicion();
   } else if (pantalla === "menu") {
     dibujarMenu();
   } else if (pantalla === "juego") {
     dibujarJuego();
   } else if (pantalla === "instrucciones") {
     dibujarInstrucciones();
   }
 }

 //Pantalla Intro
 function dibujarIntro() {
   imageMode(CORNER);
   image(fondoIntro, 0, 0, width, height);
   
   indice = siguienteFrame(indice, introFrames.length, velocidadIntro, true);
   mostrarAnimacion(introFrames, personajeX, personajeY);
   
   fill (255);
   textAlign(CENTER, CENTER);
   textSize(24);
   text("Presioná una tecla para continuar", width /2, height -40);
 }


 //Pantalla Transición
 function dibujarTransicion () {
   imageMode(CORNER);

  indice = siguienteFrame(indice, transicionFrames.length, velocidadTransicion, false);

  if (indice === -1) {
    pantalla = "menu";
    indice = 0;
  } else {
    image(transicionFrames[indice], 0, 0, width, height);
  }
 }


 //Pantalla Menú
 function dibujarMenu() {
  imageMode(CORNER);
  image(fondoMenu, 0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("JUGAR", width / 2, 300);
  text("INSTRUCCIONES", width / 2, 380);
  
  fill(255, 255, 0);
  textSize(14);
  text("X: " + mouseX + " Y: " + mouseY, 100, 30);
}
 
 
 //Pantalla Juego
 function dibujarJuego() {
  imageMode(CORNER);
  image(fondoJuego, 0, 0, width, height);

  if (estado === "respirar") {
    indice = siguienteFrame(indice, respirarFrames.length, velocidadRespirar, true);
    mostrarAnimacion(respirarFrames, personajeX, personajeY);
  } else if (estado === "tomar") {
    indice = siguienteFrame(indice, tomarFrames.length, velocidadTomar, false);

    if (indice === -1) {
      estado = "respirar";
      indice = 0;
    } else {
      mostrarAnimacion(tomarFrames, personajeX, personajeY);
    }
  }
}

 
 //Pantalla Intrucciones
 function dibujarInstrucciones() {
  imageMode(CORNER);
  image(fondoInstrucciones, 0, 0, width, height);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("2 = Tomar", width / 2, 280);
  text("R = Volver al menú", width / 2, 330);

  fill(0);
  triangle(50, 550, 80, 530, 80, 570);

  fill(255, 255, 0);
  textSize(14);
  text("X: " + mouseX + " Y: " + mouseY, 100, 30);
}


 function siguienteFrame(indiceActual, cantidadDeFotos, velocidad, repetir) {
  if (frameCount % velocidad === 0) {
    indiceActual = indiceActual + 1;
  }
  if (indiceActual >= cantidadDeFotos) {
    if (repetir) {
      indiceActual = 0;
    } else {
      return -1;
    }
  }
  return indiceActual;
}


 function mostrarAnimacion(arrayDeFotos, x, y) {
  imageMode(CENTER);
  image(arrayDeFotos[indice], x, y);
}


 //Eventos de Teclado
 function keyPressed() {
  if (pantalla === "intro") {
    pantalla = "transicion";
    indice = 0;
  } else if (pantalla === "juego") {
    if (key === "2") {
      estado = "tomar";
      indice = 0;
    }
    if (key === "r" || key === "R") {
      pantalla = "menu";
    }
  }
}


 //Eventos de Mouse
 function mousePressed() {
  if (pantalla === "menu") {
    //Botón de Jugar
    if (mouseX > 300 && mouseX < 500 && mouseY > 280 && mouseY < 320) {
      pantalla = "juego";
      estado = "respirar";
      indice = 0;
    }
    //Botón de Instrucciones
    if (mouseX > 250 && mouseX < 545 && mouseY > 355 && mouseY < 400) {
      pantalla = "instrucciones";
    }
  } else if (pantalla === "instrucciones") {
    //Flecha para volver de Instrucciones
    if (mouseX > 40 && mouseX < 90 && mouseY > 520 && mouseY < 580) {
      pantalla = "menu";
    }
  }
}
