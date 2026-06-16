function somar() {
    var n1 = parseFloat(document.getElementById('numero1').value)
    var n2 = parseFloat(document.getElementById('numero2').value)
    var res = document.getElementById('respSoma')
    res.textContent = n1 + n2
}

function sub() {
    var n3 = parseFloat(document.getElementById('numero3').value)
    var n4 = parseFloat(document.getElementById('numero4').value)
    var res = document.getElementById('respSub')
    res.textContent = n3 - n4
}

function mult() {
    var n5 = parseFloat(document.getElementById('numero5').value)
    var n6 = parseFloat(document.getElementById('numero6').value)
    var res = document.getElementById('respMult')
    res.textContent = n5 * n6
}

function div() {
    var n7 = parseFloat(document.getElementById('numero7').value)
    var n8 = parseFloat(document.getElementById('numero8').value)
    var res = document.getElementById('respDiv')
    if (n7 !== 0 && n8 !== 0) {
        res.textContent = (n7 / n8).toFixed(2)
    }else {
        res.textContent = "Não se divide por 0"
    }

}