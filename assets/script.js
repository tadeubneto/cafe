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
  // campo usuario
  if (usuario.value.length < 3) {
    document.getElementById('nameErro').textContent =
      'O nome deve ter pelo menos 3 caracteres'
  } else {
    document.getElementById('nameErro').textContent = ''
  }

  // campo email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email.value)) {
    document.getElementById('emailErro').textContent = 'E-mail inválido'
  } else {
    document.getElementById('emailErro').textContent = ''
  }

  // campo cpf com mascara
  const cpfRegex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm
  aplicarMascaraCpf(cpf)
  if (!cpfRegex.test(cpf.value)) {
    document.getElementById('cpfErro').textContent = 'CPF inválido'
  } else {
    document.getElementById('cpfErro').textContent = ''
  }

  function aplicarMascaraCpf(input) {
    let value = input.value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{3})(\d)/, '$1.$2')
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    value = value.substring(0, 14)
    input.value = value
  }

  // campo telefone
  const telRegex = /(\((\d{2})\)\s?)?(\d{4,5})[-]?(\d{4})/gm
  if (!telRegex.test(telefone.value)) {
    document.getElementById('telErro').textContent = 'Telefone inválido'
  } else {
    document.getElementById('telErro').textContent = ''
  }

  // campo data de nascimento
  const dataRegex =
    /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/
  if (!dataRegex.test(dataDeNascimento.value)) {
    document.getElementById('dateErro').textContent =
      'Data de nascimento inválida. Insira no formato dd/mm/aaaa'
  } else {
    document.getElementById('dateErro').textContent = ''
  }

  const [dia, mes, ano] = dataDeNascimento.value.split(/[\/\-.]/)
  const dataDeNascimentoObj = new Date(ano, mes - 1, dia)
  const idade = calcularIdade(dataDeNascimentoObj)
  const idadeMin = 18
  const idadeMax = 150

  if (idade < idadeMin || idade > idadeMax) {
    document.getElementById('dateErro').textContent =
      'A idade deve ser maior que 18 e menor que 150.'
    return false
  } else {
    document.getElementById('dateErro').textContent = ''
  }

  function calcularIdade(dataNascimento) {
    const dataAtual = new Date()
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear()
    const mesAtual = dataAtual.getMonth() + 1
    const diaAtual = dataAtual.getDate()

    if (
      mesAtual < dataNascimento.getMonth() + 1 ||
      (mesAtual === dataNascimento.getMonth() + 1 && diaAtual < dataNascimento.getDate())
    ) {
      idade--
    }
    return idade
  }

  // campo endereço
  if (endereco.value.length < 3) {
    document.getElementById('endErro').textContent =
      'O endereço deve ter pelo menos 3 caracteres'
  } else {
    document.getElementById('endErro').textContent = ''
  }
}
