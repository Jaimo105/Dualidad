const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    parent: "juego",
    backgroundColor: "#5effff",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        create: crear
    }
};

const game = new Phaser.Game(config)

let boton;
let contador = 0;
let textoContador;
let textoEstado;

let colores = [
    0x0000ff,
    0xff0000,
    0x00ff00,
    0xffff00,
    0xff00ff
]

let indiceColor = 0
let juegoTerminado = false;

function crear(){
    // Rectángulo centrado con el primer color
    boton = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 200, 100, colores[indiceColor])
    boton.setInteractive()

    this.add.text(this.scale.width / 2 - 40, this.scale.height / 2 - 10, "Haz clic", {
        fontSize: "20px",
        color: "#ffffff"
    })

    textoContador = this.add.text(120, 50, "Clics: 0", {
        fontSize: "24px",
        color: "#000000"
    })

    textoEstado = this.add.text(80, 90, "Jugando...", {
        fontSize: "24px",
        color: "#ff0000"
    })

    // Evento de clic
    boton.on("pointerdown", () => cambiarColor(this))
}

function cambiarColor(scene){
    if(juegoTerminado) return

    scene.tweens.add({
        targets: boton,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 100,
        yoyo: true
    })

    contador++
    textoContador.setText("Clics: " + contador)

    indiceColor++

    if(indiceColor < colores.length){
        boton.setFillStyle(colores[indiceColor])
    } else {
        textoEstado.setText("¡Lo  hiciste!")
        boton.disableInteractive()
        juegoTerminado = true
    }
}
