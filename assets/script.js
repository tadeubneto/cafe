const form = document.getElementById('form')
const usuario = document.getElementById('name')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const telefone = document.getElementById('tel')
const dataDeNascimento = document.getElementById('date')
const endereco = document.getElementById('end')
const senha = document.getElementById('password')
const confirmaSenha = document.getElementById('confirm-password')
const botaoEnviar = document.getElementById('btnSub')
const botaoLimpar = document.getElementById('btnRes')

usuario.addEventListener('input', validacaoCampo)
email.addEventListener('input', validacaoCampo)
cpf.addEventListener('input', validacaoCampo)
telefone.addEventListener('input', validacaoCampo)
dataDeNascimento.addEventListener('input', validacaoCampo)
endereco.addEventListener('input', validacaoCampo)
senha.addEventListener('input', validacaoCampo)
confirmaSenha.addEventListener('input', validacaoCampo)
botaoLimpar.addEventListener('click', limparPreferencias)
// botaoEnviar.addEventListener('click', e => {
//   e.preventDefault()

//   console.log('Nome:', usuario.value)
//   console.log('E-mail:', email.value)
//   console.log('CPF:', cpf.value)
//   console.log('Telefone:', telefone.value)
//   console.log('Data de Nascimento:', dataDeNascimento.value)
//   console.log('Endereço:', endereco.value)
//   console.log('Senha:', senha.value)
//   console.log('Confirmar Senha:', confirmaSenha.value)
// })

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
  const telefoneRegex = /(\((\d{2})\)\s?)?(\d{4,5})[-]?(\d{4})/gm

  aplicarMascaraTelefone(telefone)
  
  if (!telefoneRegex.test(telefone.value)) {
    document.getElementById('telErro').textContent = 'Telefone inválido'
  } else {
    document.getElementById('telErro').textContent = ''
  }

  function aplicarMascaraTelefone (input) {
    let value = input.value

    value = value.replace(/\D/g, '')
    if(value.length <= 10) {
      value.value.replace((/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3'))
    }else{
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    value = value.substring(0, 15);
    input.value = value;

  }

  // campo data de nascimento
  const dataRegex =
    /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/

  if (!dataRegex.test(dataDeNascimento.value)) {
    document.getElementById('dateErro').textContent =
      'Data de nascimento inválida. Insira no formato dd/mm/aaaa'
  } else {
    document.getElementById('dateErro').textContent = ''

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
        (mesAtual === dataNascimento.getMonth() + 1 &&
          diaAtual < dataNascimento.getDate())
      ) {
        idade--
      }
      return idade
    }
  }

  // campo endereço
  if (endereco.value.length < 3) {
    document.getElementById('endErro').textContent =
      'O endereço deve ter pelo menos 3 caracteres'
  } else {
    document.getElementById('endErro').textContent = ''
  }

  // campo senha

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()+\-.,;?\^.,;?><:{}\[\]])[\w!@#$%&*()+\-.,;?\^.,;?><:{}\[\]]{6,}$/

  if (!passwordRegex.test(senha.value)) {
    document.getElementById('passwordErro').textContent =
      'Sua senha deve conter: Letra MAIÚSCULA, número, símbolo, ter no mínimo 6 caracteres'
  } else {
    document.getElementById('passwordErro').textContent = ''
  }

  if (confirmaSenha.value !== senha.value) {
    document.getElementById('confirm-passwordErro').textContent =
      'Sua senha deve ser igual a primeira'
  } else {
    document.getElementById('confirm-passwordErro').textContent = ''
  }
}

const formPreferencia  = document.getElementById('form')

formPreferencia.addEventListener('load', () => {
  const preferencias = JSON.parse(localStorage.getItem('preferenciasUsuario'))
  if(preferencias) {
    usuario.value = preferencias.name || '';
    email.value = preferencias.email || '';
    cpf.value = preferencias.cpf || '';
    telefone.value = preferencias.telefone || '';
    dataDeNascimento.value = preferencias.dataDeNascimento || '';
    endereco.value = preferencias.endereco || '';
    
}
})

  formPreferencia.addEventListener('submit', (e) => {
    e.preventDefault()

    const preferencias = {
      name: usuario.value,
      email: email.value,
      cpf: cpf.value,
      telefone: telefone.value,
      nascimento: dataDeNascimento.value,
      endereco: endereco.value
    };
  
    localStorage.setItem('preferenciasUsuario', JSON.stringify(preferencias))
    alert('Salvo!')
  });
  
  function limparPreferencias() {
    localStorage.removeItem('preferenciasUsuario')
    form.reset()
    alert('Excluído!')
  }


