function getAllSuperHerois() {
    axios.get('http://localhost:8080/superHeroi')
    .then(function(response) {
        console.log(response);

        var jsonData = response.data;
        var tableBody = $("table tbody");
        tableBody.empty();  // Limpa ao conteúdo da tebla antes de adicionar novas linhas
        jsonData.forEach(superHeroi => {
            // Formata a data para exibir somente a data
            var dataFormatada = "";
            if (superHeroi.primeiraAparicao) {
                let parteData = superHeroi.primeiraAparicao.split("T")[0].split("-"); // Separa o ano, mês e dia
                dataFormatada = `${parteData[2]}/${parteData[1]}/${parteData[0]}`; // Formata a data para o padrão brasileiro
            }

            var markup = "<tr style='text-align: center'>" +
                            "<td>" + superHeroi.id + "</td>" +
                            "<td>" + superHeroi.nome + "</td>" +
                            "<td>" + superHeroi.apelido + "</td>" +
                            "<td>" + superHeroi.superPoder + "</td>" +
                            "<td>" + superHeroi.fraqueza + "</td>" +
                            "<td>" + superHeroi.historiaOrigem + "</td>" +
                            "<td>" + dataFormatada + "</td>" +
                            "<td>" + 
                                "<button class='btn btn-danger' onclick='deletaSuperHeroi(" + superHeroi.id + ")'>Excluir</button> <br>" +
                                "<br> <button class='btn btn-warning' onclick='editaSuperHeroi(" + superHeroi.id + ")'>Editar</button>" + 
                            "</td>" +
                        "</tr>";

            tableBody.append(markup);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

function deletaSuperHeroi(id) {
    axios.delete("http://localhost:8080/superHeroi/" + id)
    .then(function(response) {
        alert("Super-Herói excluído com sucesso!");
        getAllSuperHerois();
    })
    .catch(function(error) {
        console.log(error);
    });
}

function editaSuperHeroi(id) {
    axios.get(`http://localhost:8080/superHeroi/${id}`)
    .then(function(response) {
        const superHeroi = response.data;

        // Preenche os campos do modal com os dados do super-herói
        document.getElementById("id").value = superHeroi.id;
        document.getElementById("nome").value = superHeroi.nome;
        document.getElementById("apelido").value = superHeroi.apelido;
        document.getElementById("superPoder").value = superHeroi.superPoder;
        document.getElementById("fraqueza").value = superHeroi.fraqueza;
        document.getElementById("historiaOrigem").value = superHeroi.historiaOrigem;
        document.getElementById("primeiraAparicao").value = superHeroi.primeiraAparicao;

        // Abre o modal
        const modal = new bootstrap.Modal(document.getElementById("editSuperHeroiModal"));
        modal.show();
    })
    .catch(function(error) {
        console.log(error);
    });
}
function salvarEdicaoSuperHeroi() {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const apelido = document.getElementById("apelido").value;
    const superPoder = document.getElementById("superPoder").value;
    const fraqueza = document.getElementById("fraqueza").value;
    const historiaOrigem = document.getElementById("historiaOrigem").value;
    const primeiraAparicao = document.getElementById("primeiraAparicao").value;

    // Cria o objeto com os dados atualizados
    const superHeroi = {
        nome: nome,
        apelido: apelido,
        superPoder: superPoder,
        fraqueza: fraqueza,
        historiaOrigem: historiaOrigem,
        primeiraAparicao: primeiraAparicao
    };

    // Envia o objeto atualizado ao backend
    axios.put(`http://localhost:8080/superHeroi/${id}`, superHeroi)
    .then(function(response) {
        //Fecha o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("editSuperHeroiModal"));
        modal.hide();

        // Atualiza a lista de super-heróis
        getAllSuperHerois();
    })
    .catch(function(error) {
        console.log(error);
    });
}