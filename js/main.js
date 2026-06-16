const body = document.body;
const toggle = document.querySelector('.menu-toggle');
const backdrop = document.querySelector('.backdrop');
const themeToggle = document.querySelector('.theme-toggle-social');
const themeIcon = document.querySelector('.theme-toggle-icon');

const themeState = {
	light: {
		label: 'Ativar tema Dracula',
		icon: 'dark_mode',
		pressed: 'false'
	},
	dracula: {
		label: 'Voltar ao tema padrão',
		icon: 'light_mode',
		pressed: 'true'
	}
};

function setSidebarState(open) {
	body.classList.toggle('sidebar-open', open);
	if (toggle) toggle.setAttribute('aria-expanded', String(open));
}

if (toggle) {
	toggle.addEventListener('click', () => {
		setSidebarState(!body.classList.contains('sidebar-open'));
	});
}

if (backdrop) {
	backdrop.addEventListener('click', () => setSidebarState(false));
}

const themeToggleFab = document.getElementById('toggle-theme-fab');
const themeIconFab = document.querySelector('.theme-toggle-icon-fab');

function setTheme(isDracula) {
	body.classList.toggle('theme-dracula', isDracula);
	
	if (themeToggle && themeIcon) {
		themeToggle.setAttribute('aria-pressed', themeState[isDracula ? 'dracula' : 'light'].pressed);
		themeToggle.setAttribute('aria-label', themeState[isDracula ? 'dracula' : 'light'].label);
		themeIcon.textContent = themeState[isDracula ? 'dracula' : 'light'].icon;
	}
    
    if (themeToggleFab && themeIconFab) {
        themeToggleFab.setAttribute('aria-label', themeState[isDracula ? 'dracula' : 'light'].label);
        themeIconFab.textContent = themeState[isDracula ? 'dracula' : 'light'].icon;
    }

	localStorage.setItem('meuBlogTema', isDracula ? 'dracula' : 'light');
}

if (themeToggle) {
	themeToggle.addEventListener('click', () => setTheme(!body.classList.contains('theme-dracula')));
}

if (themeToggleFab) {
    themeToggleFab.addEventListener('click', () => {
        setTheme(!body.classList.contains('theme-dracula'));
        closeFab(); 
    });
}

const temaSalvo = localStorage.getItem('meuBlogTema');
if (temaSalvo === 'dracula') {
	setTheme(true);
} else {
	setTheme(false);
}

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			scrollToTopBtn.classList.add('show');
		} else {
			scrollToTopBtn.classList.remove('show');
		}
	});

	scrollToTopBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

let currentFontSize = parseFloat(localStorage.getItem('meuBlogFontSize')) || 16;
document.documentElement.style.fontSize = currentFontSize + 'px'; 

const btnIncreaseFont = document.getElementById('increase-font');
const btnDecreaseFont = document.getElementById('decrease-font');
const fabContainer = document.querySelector('.fab-container');
const fabMain = document.querySelector('.fab-main');

function closeFab() {
    if(fabContainer) fabContainer.classList.remove('active');
}

if (btnIncreaseFont && btnDecreaseFont) {
    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontSize < 26) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('meuBlogFontSize', currentFontSize);
        }
        closeFab();
    });

    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontSize > 12) { 
            currentFontSize -= 2;
            document.documentElement.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('meuBlogFontSize', currentFontSize);
        }
        closeFab();
    });
}

if (fabMain) {
    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('active');
    });
}

if (fabContainer) {
    fabContainer.addEventListener('mouseleave', () => {
        closeFab();
    });
}

const backBtn = document.getElementById('back-btn');

if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (window.history.length > 1 && document.referrer !== "") {
            window.history.back();
        } else {
            window.close();
            
            setTimeout(() => {
                if (window.location.pathname.includes('/receitas/')) {
                    window.location.href = '../receitas.html';
                } else {
                    window.location.href = '../blog.html';
                }
            }, 300);
        }
    });
}

const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');

const lightboxImage = document.createElement('img');
lightboxOverlay.appendChild(lightboxImage);

document.body.appendChild(lightboxOverlay);

const clickableImages = document.querySelectorAll('article img, .post-image');

clickableImages.forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxOverlay.classList.add('active');
    });
});

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target !== lightboxImage) {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefone');
    const messageInput = document.getElementById('mensagem');
    const successMessage = document.getElementById('form-success');

    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
        });

        if (nameInput.value.trim().length < 3) {
            document.getElementById('name-error').textContent = 'Por favor, insira um nome com pelo menos 3 caracteres.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            document.getElementById('email-error').textContent = 'Por favor, insira um endereço de e-mail válido.';
            isValid = false;
        }

        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            document.getElementById('telefone-error').textContent = 'Por favor, insira um telefone válido com o DDD.';
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            document.getElementById('mensagem-error').textContent = 'Sua mensagem deve conter pelo menos 10 caracteres.';
            isValid = false;
        }

        if (isValid) {
            alert("Sua mensagem foi enviada e recebida com sucesso! Em breve daremos um retorno.");
            
            successMessage.textContent = "Mensagem enviada e recebida! Retornaremos em breve.";
            successMessage.style.display = 'block';        
        
            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});