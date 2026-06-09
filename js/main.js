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
			toggle.setAttribute('aria-expanded', String(open));
			backdrop.hidden = !open;
		}

		toggle.addEventListener('click', () => {
			setSidebarState(!body.classList.contains('sidebar-open'));
		});

		backdrop.addEventListener('click', () => setSidebarState(false));

		function setTheme(isDracula) {
			body.classList.toggle('theme-dracula', isDracula);
			themeToggle.setAttribute('aria-pressed', themeState[isDracula ? 'dracula' : 'light'].pressed);
			themeToggle.setAttribute('aria-label', themeState[isDracula ? 'dracula' : 'light'].label);
			themeIcon.textContent = themeState[isDracula ? 'dracula' : 'light'].icon;
		}

		themeToggle.addEventListener('click', () => {
			setTheme(!body.classList.contains('theme-dracula'));
		});

		setTheme(false);
		window.addEventListener('resize', () => {
			if (window.innerWidth > 900) {
				setSidebarState(false);
			}
		});