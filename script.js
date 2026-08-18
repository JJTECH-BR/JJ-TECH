// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Fechar menu mobile ao clicar em link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Filtro do portfólio
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Configurações de WhatsApp para cada profissional
const profissionais = {
  johny: {
    nome: 'Johny',
    telefone: '5584996970693', // Substitua pelo número de Johny
    especialidade: 'Sistemas Web'
  },
  juliana: {
    nome: 'Juliana',
    telefone: '5515998353369', // Substitua pelo número de Juliana
    especialidade: 'Sites e Landing Pages'
  }
};

// Atualizar indicador de profissional ao mudar seleção
document.getElementById('serviceSelect')?.addEventListener('change', function () {
  const profissionalAttr = this.options[this.selectedIndex].getAttribute('data-professional');
  const profissional = profissionais[profissionalAttr] || profissionais.johny;
  const indicator = document.getElementById('professionalIndicator');
  const nameDisplay = document.getElementById('professionalName');

  if (this.value) {
    nameDisplay.textContent = `${profissional.nome} (${profissional.especialidade})`;
    indicator.classList.add('show');
  } else {
    indicator.classList.remove('show');
  }
});

// Envio do formulário com roteamento por WhatsApp
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const nome = document.getElementById('clientName').value;
  const email = document.getElementById('clientEmail').value;
  const telefone = document.getElementById('clientPhone').value;
  const empresa = document.getElementById('clientCompany').value;
  const mensagem = document.getElementById('clientMessage').value;
  const serviceSelect = document.getElementById('serviceSelect');
  const servicoSelecionado = serviceSelect.options[serviceSelect.selectedIndex].text;

  // Determinar profissional baseado na seleção
  const profissionalAttr = serviceSelect.options[serviceSelect.selectedIndex].getAttribute('data-professional');
  const profissional = profissionais[profissionalAttr] || profissionais.johny;

  // Criar mensagem formatada
  const textMensagem = `*Novo Orçamento - JJTech*\n\n` +
    `*Cliente:* ${nome}\n` +
    `*E-mail:* ${email}\n` +
    `*Telefone:* ${telefone || 'Não informado'}\n` +
    `*Empresa:* ${empresa || 'Não informada'}\n` +
    `*Serviço de Interesse:* ${servicoSelecionado}\n` +
    `*Especialista Recomendado:* ${profissional.nome}\n` +
    `\n*Mensagem:*\n${mensagem}`;

  // Codificar mensagem para URL
  const mensagemCodificada = encodeURIComponent(textMensagem);

  // Criar link do WhatsApp
  const whatsappLink = `https://wa.me/${profissional.telefone}?text=${mensagemCodificada}`;

  // Feedback visual
  const btn = e.target.querySelector('.btn-submit');
  const btnOriginal = btn.textContent;
  btn.textContent = '✓ Redirecionando para WhatsApp...';
  btn.style.background = '#16a34a';

  // Redirecionar após breve delay
  setTimeout(() => {
    window.open(whatsappLink, '_blank');
    btn.textContent = btnOriginal;
    btn.style.background = '';
    form.reset();
    document.getElementById('professionalIndicator').classList.remove('show');
  });
}

document.getElementById('contactForm')?.addEventListener('submit', handleSubmit);
