function calc() {
    var n1 = parseFloat(document.getElementById('n1').value)
    var n2 = parseFloat(document.getElementById('n2').value)
    var operador = document.getElementById('op').value
    var res

    switch (operador) {
        case '+':
            res = n1 + n2
            break;
        case '-':
            res = n1 - n2
            break;
        case '*':
            res = n1 * n2
            break;
        case '/':
            if (n1 !== 0 && n2 !== 0) {
                res = (n1 / n2).toFixed(2)
            } else {
                res = "Não se divide por 0"
            }
            break;
        default: "operador inválido"
            break;
    }
    document.getElementById('res').textContent = res
}