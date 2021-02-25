function loadLivros(busca) {
    let containerDiv = document.querySelector('.container')
    let opcao = document.getElementById('opcao-select').value

    let key = "AIzaSyDwTIySk02ejH7EwqRrmIlGKYSubxuZcq4"

    let xhr = new XMLHttpRequest()

    let url = `https://www.googleapis.com/books/v1/volumes?q=+${opcao}:${busca}&key=${key}`

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
        let busca = document.getElementById('input-busca')
        busca.value = ""
        if(xhr.readyState == 4 && xhr.status == 200) {
            let dadosJSON = JSON.parse(this.responseText)

            for(i=0; i<dadosJSON.items.length;i++) {
                containerDiv.innerHTML += 
                `<div class="card">
                    <div class="imgBx">
                        <img src="${dadosJSON.items[i].volumeInfo.imageLinks.thumbnail}" alt="">
                    </div>
                    <div class="header-content">
                        <h5>Titulo: ${dadosJSON.items[i].volumeInfo.title}</h5>
                        <p>Subtitulo: ${dadosJSON.items[i].volumeInfo.subtitle}</p>
                        <p>Categoria: ${dadosJSON.items[i].volumeInfo.categories}</p>
                        <p>Autor: ${dadosJSON.items[i].volumeInfo.authors}</p>
                        <p>Data de Publicação: ${dadosJSON.items[i].volumeInfo.publishedDate}</p>
                    </div>
                    <div class=footer-content>
                        <a href="${dadosJSON.items[i].selfLink}">Api do livro</a>
                        <a href="${dadosJSON.items[i].volumeInfo.infoLink}">Mais informações</a>
                        <a href="${dadosJSON.items[i].saleInfo.buyLink}">Link de compra</a>
                    </div>
                    <div class="content">
                        <p><b>Descrição:</b> ${dadosJSON.items[i].volumeInfo.description ?? 'Sem informações'}</p>
                    </div>
                </div>`
            }
        }
    }
    xhr.send()
}