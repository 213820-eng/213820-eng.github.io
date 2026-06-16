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
            
            successMessage.style.display = 'block';        
        
            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefone');
    const messageInput = document.getElementById('mensagem');

    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    function showSuccessPopup() {
        let popup = document.getElementById('success-popup');
        
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'success-popup';
            popup.className = 'popup-overlay';
            
            popup.innerHTML = `
                <div class="popup-content">
                    <span class="material-symbols-outlined">check_circle</span>
                    <h2>Sucesso!</h2>
                    <p>Sua mensagem foi enviada com sucesso. Retornarei o contato em breve!</p>
                    <button class="popup-btn" id="close-popup">OK</button>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            document.getElementById('close-popup').addEventListener('click', () => {
                popup.classList.remove('active');
            });

            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                }
            });
        }
        
        setTimeout(() => {
            popup.classList.add('active');
        }, 10);
    }

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
            const oldSuccessMessage = document.getElementById('form-success');
            if (oldSuccessMessage) oldSuccessMessage.style.display = 'none';

            showSuccessPopup();
            
           
            form.reset();
        }
    });
});