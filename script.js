let editIndex = -1;

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.textContent = '';

    if (!nome || !email || !numero) {
        errorMessage.textContent = 'Por favor, preencha todos os campos.';
    } else {
        let listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];

        if (editIndex === -1) {
            if (!isDuplicate(nome, email, numero, listaContatos)) {
                listaContatos.push({ nome, email, numero });
            } else {
                errorMessage.textContent = 'Contato já existe.';
                return;
            }
        } else {
            listaContatos[editIndex] = { nome, email, numero };
            editIndex = -1;
        }
        
        localStorage.setItem('listaContatos', JSON.stringify(listaContatos));
        atualizarLista();
        document.getElementById('cadastroForm').reset();
        alert('Formulário enviado com sucesso!');
    }
});

function atualizarLista() {
    const listaElement = document.getElementById('listaContatos');
    listaElement.innerHTML = ''; 

    const listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    
    listaContatos.forEach((contato, index) => {
        const li = document.createElement('li');
        li.classList.add('contato-item');

        const nomeP = document.createElement('p');
        nomeP.textContent = `Nome: ${contato.nome}`;
        li.appendChild(nomeP);

        const emailP = document.createElement('p');
        emailP.textContent = `Email: ${contato.email}`;
        li.appendChild(emailP);

        const numeroP = document.createElement('p');
        numeroP.textContent = `Número: ${contato.numero}`;
        li.appendChild(numeroP);

        const dadosDiv = document.createElement('div');
        dadosDiv.classList.add('contato-dados');
        dadosDiv.appendChild(nomeP);
        dadosDiv.appendChild(emailP);
        dadosDiv.appendChild(numeroP);
        li.appendChild(dadosDiv);
        
        const editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.onclick = function() {
            editarContato(index);
        };
        li.appendChild(editar);

        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.onclick = function() {
            if (confirm('Você tem certeza que deseja excluir este contato?')) {
                excluirContato(index);
            }
        };
        li.appendChild(excluir);
        
        listaElement.appendChild(li);
    });
}

function editarContato(index) {
    const listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    const contato = listaContatos[index];
    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('numero').value = contato.numero;
    document.getElementById('cadastro').value = "Salvar"

    editIndex = index;
}

function excluirContato(index) {
    let listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    listaContatos.splice(index, 1);
    localStorage.setItem('listaContatos', JSON.stringify(listaContatos));
    atualizarLista();
}

function isDuplicate(nome, email, numero, listaContatos) {
    return listaContatos.some(contato => contato.nome === nome && contato.email === email && contato.numero === numero);
}

document.addEventListener('DOMContentLoaded', atualizarLista);
