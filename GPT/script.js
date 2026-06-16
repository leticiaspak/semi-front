const display = document.getElementById("display");

function adicionar(valor){
    display.value += valor;
}

function limpar(){
    display.value = "";
}

function apagar(){
    display.value = display.value.slice(0,-1);
}

function calcular(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Erro";
    }
}

/* FLORES */

const flores = document.getElementById("flores");

function criarFlor(){

    const flor = document.createElement("span");

    const emojis = ["🌸","🌺","🩷","💮","✨"];
    flor.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

    flor.classList.add("flor");

    flor.style.left = Math.random()*100 + "vw";
    flor.style.fontSize = (20 + Math.random()*20) + "px";

    const duracao = 6 + Math.random()*6;
    flor.style.animationDuration = duracao + "s";

    flores.appendChild(flor);

    setTimeout(()=>{
        flor.remove();
    },duracao*1000);
}

setInterval(criarFlor,300);
