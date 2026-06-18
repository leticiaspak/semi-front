function navTo(id){
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function enviar() {
    const nome = document.getElementById('nome').value
    const assunto = document.getElementById('assunto').value
    const mensagem = `Gostaria de entrar em contato!\n\nNome: ${nome} \nAssunto: ${assunto}`
    const msg = encodeURIComponent(mensagem)
    window.open(`https://wa.me/41995708440?text=${msg}`)
}