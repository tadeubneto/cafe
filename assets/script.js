const form = document.getElementById('form')
const usuario = document.getElementById('name')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const telefone = document.getElementById('tel')
const dataDeNascimento = document.getElementById('date')
const endereco = document.getElementById('end')

usuario.addEventListener('input', validacaoCampo)
email.addEventListener('input', validacaoCampo)
cpf.addEventListener('input', validacaoCampo)
telefone.addEventListener('input', validacaoCampo)
dataDeNascimento.addEventListener('input', validacaoCampo)
endereco.addEventListener('input', validacaoCampo)

function validacaoCampo() {  

  if (usuario.value.length < 3) {
    document.getElementById('nameErro').textContent = 'O nome deve ter pelo menos 3 caracteres';
    isValid = false
  } else {
    document.getElementById('nameErro').textContent =
      usuario.classList.remove('nameErro')  
  }


}
