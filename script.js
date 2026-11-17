(function() {
    emailjs.init("8mhlFMfSFs8TAWc7q");
})();

function updateClock() {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');

    const localString = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos} BRT`;
    const clockEl = document.getElementById('utc-clock');
    if (clockEl) {
        clockEl.innerText = localString;
    }

    const loginClockEl = document.getElementById('login-big-clock');
    if (loginClockEl) {
        loginClockEl.innerText = `${horas}:${minutos}`;
    }

    const loginDateEl = document.getElementById('login-date');
    if (loginDateEl) {
        loginDateEl.innerText = `${dia}/${mes}/${ano} // BRT`;
    }
}

setInterval(updateClock, 1000);
updateClock();

let isAuthenticating = false;

function triggerLogin() {
    if (isAuthenticating) return;
    isAuthenticating = true;

    const passInput = document.getElementById('login-pass');
    const statusText = document.getElementById('login-status');
    const btnLogin = document.getElementById('btn-login');
    const loginScreen = document.getElementById('login-screen');

    btnLogin.innerText = '[ VERIFICANDO CREDENCIAIS... ]';
    statusText.innerText = 'VALIDANDO CHAVE CRIPTOGRÁFICA E BIOMETRIA...';
    passInput.value = '';

    const secretKey = '************';
    let i = 0;

    const typeInterval = setInterval(function() {
        passInput.value += secretKey[i];
        i++;

        if (i >= secretKey.length) {
            clearInterval(typeInterval);
            statusText.innerText = 'ACESSO AUTORIZADO // BEM-VINDO, FELIPE JALES.';
            statusText.classList.add('granted');
            btnLogin.innerText = '[ ACESSO LIBERADO ]';

            setTimeout(function() {
                loginScreen.classList.add('unlocked');
                document.body.classList.remove('locked');
                isAuthenticating = false;
            }, 600);
        }
    }, 50);
}

const btnLoginEl = document.getElementById('btn-login');
if (btnLoginEl) {
    btnLoginEl.addEventListener('click', triggerLogin);
}

const btnLockEl = document.getElementById('btn-lock-session');
if (btnLockEl) {
    btnLockEl.addEventListener('click', function() {
        const loginScreen = document.getElementById('login-screen');
        const passInput = document.getElementById('login-pass');
        const statusText = document.getElementById('login-status');
        const btnLogin = document.getElementById('btn-login');

        passInput.value = '';
        statusText.innerText = 'ESTAÇÃO BLOQUEADA // AGUARDANDO CREDENCIAIS...';
        statusText.classList.remove('granted');
        btnLogin.innerText = '[ AUTENTICAR / ENTRAR ]';

        loginScreen.classList.remove('unlocked');
        document.body.classList.add('locked');
    });
}

document.addEventListener('keydown', function(event) {
    const loginScreen = document.getElementById('login-screen');
    if (event.key === 'Enter' && loginScreen && !loginScreen.classList.contains('unlocked')) {
        event.preventDefault();
        triggerLogin();
    }
});

function switchModule(targetId) {
    document.querySelectorAll('.os-panel').forEach(function(panel) {
        panel.classList.remove('active-panel');
    });
    document.querySelectorAll('.nav-tab').forEach(function(tab) {
        tab.classList.remove('active');
    });

    const targetPanel = document.getElementById(targetId);
    const targetTab = document.querySelector(`.nav-tab[data-target="${targetId}"]`);

    if (targetPanel) {
        targetPanel.classList.add('active-panel');
    }
    if (targetTab) {
        targetTab.classList.add('active');
    }

    const viewport = document.getElementById('os-viewport');
    if (viewport) {
        viewport.scrollTop = 0;
    }

    const moduleIndicator = document.getElementById('current-module-name');
    if (moduleIndicator) {
        moduleIndicator.innerText = targetId.toUpperCase();
    }
}

document.querySelectorAll('.nav-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        switchModule(target);
    });
});

document.querySelectorAll('.cmd-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const target = this.getAttribute('data-cmd');
        switchModule(target);
    });
});

const commandMap = {
    'sobre': 'sobre',
    'about': 'sobre',
    'ajuda': 'ajuda',
    'help': 'ajuda',
    'projetos': 'projetos',
    'projects': 'projetos',
    'experiencias': 'experiencias',
    'experience': 'experiencias',
    'xp': 'experiencias',
    'certificacoes': 'certificacoes',
    'certifications': 'certificacoes',
    'certs': 'certificacoes',
    'curriculo': 'curriculo',
    'cv': 'curriculo',
    'resume': 'curriculo',
    'contato': 'contato',
    'contact': 'contato'
};

const cliForm = document.getElementById('cli-form');
if (cliForm) {
    cliForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputEl = document.getElementById('cli-input');
        const feedbackEl = document.getElementById('cli-feedback');
        const rawCmd = inputEl.value.trim().toLowerCase().replace(/^>\s*/, '');

        if (!rawCmd) return;

        if (commandMap[rawCmd]) {
            switchModule(commandMap[rawCmd]);
            feedbackEl.innerText = `OK // [${rawCmd.toUpperCase()}]`;
            feedbackEl.style.color = '#00ff66';
        } else {
            feedbackEl.innerText = 'ERRO: DIGITE "HELP"';
            feedbackEl.style.color = '#ffaa00';
        }

        inputEl.value = '';
    });
}

document.querySelectorAll('.lang-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.idioma').forEach(function(div) {
            div.classList.remove('active-lang');
        });
        
        this.classList.add('active');
        const selectedLang = this.getAttribute('data-lang');
        document.querySelector('.idioma.' + selectedLang).classList.add('active-lang');
    });
});

document.querySelectorAll('.filter-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        document.querySelectorAll('.project-category').forEach(function(category) {
            if (filterValue === 'todos' || category.getAttribute('data-category') === filterValue) {
                category.classList.remove('hidden-category');
            } else {
                category.classList.add('hidden-category');
            }
        });
    });
});

window.onload = function() {
    const form = document.querySelector('.form-contato');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const btn = this.querySelector('button');
            const btnTextoOriginal = btn.innerText;
            btn.innerText = '[ TRANSMITINDO DADOS... ]';

            const nome = this.nome.value;
            const email = this.email.value;
            const mensagem = this.mensagem.value;

            if(nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
                alert('ALERTA DE SISTEMA: Preencha todos os campos obrigatórios para iniciar a transmissão.');
                btn.innerText = btnTextoOriginal;
                return;
            }

            emailjs.sendForm('service_4bsgnqi', 'template_ftbjmru', this)
                .then(function() {
                    alert('TRANSMISSÃO CONCLUÍDA: Mensagem recebida com sucesso. Retornaremos o contato em breve.');
                    form.reset();
                    btn.innerText = btnTextoOriginal;
                }, function(error) {
                    alert('FALHA NA TRANSMISSÃO. Código de erro: ' + JSON.stringify(error));
                    btn.innerText = btnTextoOriginal;
                });
        });
    }
};