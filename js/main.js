document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/superHeroi")
    .then(response => response.json())
    .then(herois => {
        const carouselInner = document.getElementById("carousel-content");
        herois.forEach((heroi, index) => {
            const activeClass = index === 0 ? "active" : "";
            const card = `
                <div class="carousel-item ${activeClass} justify-content-center">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <img src="${heroi.imagem}" class="card-img-top" alt="Imagem de ${heroi.nome}">
                            <h5 class="card-title">${heroi.nome}</h5>
                            <p class="card-text">
                                <strong>Apelido:</strong> ${heroi.apelido} <br>
                                <strong>Super Poder:</strong> ${heroi.superPoder} <br>
                                <strong>Fraqueza:</strong> ${heroi.fraqueza} <br>
                                <strong>História de Origem:</strong> ${heroi.historiaOrigem} <br>
                                <strong>Primeira Aparição:</strong> ${new Date(heroi.primeiraAparicao).toLocaleDateString()} <br>
                            </p>
                            <a href="#" class="btn btn-primary">Mais detalhes</a>
                        </div>
                    </div>
                </div>`;
            carouselInner.innerHTML += card;
        });
    })
    .catch(error => console.error("Erro ao carregar dados dos heróis:", error));
})