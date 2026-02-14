// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Cambiar ícono
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Formulario de agendamiento - MODIFICADO PARA FORMSPREE
    const formAgenda = document.getElementById('form-agenda');
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    const modalClose = document.querySelector('.modal-close');
    const btnModal = document.querySelector('.btn-modal');
    
    if (formAgenda) {
        formAgenda.addEventListener('submit', function(e) {
            // NO usar e.preventDefault() aquí - Dejar que Formspree haga el envío
            
            // Obtener valores del formulario para mostrar en el modal
            const nombre = document.getElementById('nombre').value;
            const servicio = document.getElementById('servicio').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const estilista = document.getElementById('estilista').value;
            
            // Validar campos requeridos
            if (!nombre || !servicio || !fecha || !hora) {
                alert('Por favor, completa todos los campos requeridos');
                e.preventDefault(); // Solo preventDefault si hay error
                return;
            }
            
            // Validar fecha (no puede ser anterior a hoy)
            const hoy = new Date().toISOString().split('T')[0];
            if (fecha < hoy) {
                alert('Por favor, selecciona una fecha futura');
                e.preventDefault(); // Solo preventDefault si hay error
                return;
            }
            
            // Formatear la fecha para mostrarla
            const fechaObj = new Date(fecha);
            const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Formatear el nombre del servicio
            const serviciosNombres = {
                'corte': 'Corte de pelo',
                'coloracion': 'Coloración',
                'tratamiento': 'Tratamiento capilar',
                'masaje': 'Masaje Relajante',
                'barberia': 'Servicio de Barbería',
                'manicura': 'Manicura / Pedicura',
                'completo': 'Servicio Completo'
            };
            
            const servicioNombre = serviciosNombres[servicio] || servicio;
            
            // Formatear nombre del estilista (actualizado con los nombres correctos)
            const estilistasNombres = {
                'cristo': 'Cristo Vieira (Dueño)',
                'fernando': 'Fernando Galvão',
                '': 'Cualquier estilista'
            };
            
            const estilistaNombre = estilistasNombres[estilista] || 'Cualquier estilista';
            
            // Mostrar los detalles en el modal
            if (document.getElementById('reserva-nombre')) {
                document.getElementById('reserva-nombre').textContent = nombre;
            }
            if (document.getElementById('reserva-servicio')) {
                document.getElementById('reserva-servicio').textContent = servicioNombre;
            }
            if (document.getElementById('reserva-fecha')) {
                document.getElementById('reserva-fecha').textContent = fechaFormateada;
            }
            if (document.getElementById('reserva-hora')) {
                document.getElementById('reserva-hora').textContent = hora;
            }
            
            // Mostrar el modal después de un breve retraso
            setTimeout(() => {
                if (modalConfirmacion) {
                    modalConfirmacion.style.display = 'flex';
                }
            }, 300);
            
            // Limpiar formulario después de mostrar el modal
            setTimeout(() => {
                formAgenda.reset();
                
                // Restablecer fecha por defecto (mañana)
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const manana = new Date();
                    manana.setDate(manana.getDate() + 1);
                    const mananaFormatted = manana.toISOString().split('T')[0];
                    fechaInput.value = mananaFormatted;
                }
            }, 500);
        });
    }
    
    // Cerrar modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (modalConfirmacion) {
                modalConfirmacion.style.display = 'none';
            }
        });
    }
    
    if (btnModal) {
        btnModal.addEventListener('click', function() {
            if (modalConfirmacion) {
                modalConfirmacion.style.display = 'none';
            }
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (modalConfirmacion && e.target === modalConfirmacion) {
            modalConfirmacion.style.display = 'none';
        }
    });
    
    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : '';
            
            if (!email || !email.includes('@')) {
                alert('Por favor, introduce un email válido');
                return;
            }
            
            // Simular envío
            if (emailInput) {
                emailInput.value = '';
            }
            
            // Mostrar mensaje de éxito
            const button = this.querySelector('button');
            if (button) {
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = '#4CAF50';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                }, 2000);
            }
            
            console.log('Email suscrito:', email);
        });
    }
    
    // Fecha mínima en el formulario de reserva (hoy)
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
        
        // Establecer fecha por defecto (mañana)
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        const mananaFormatted = manana.toISOString().split('T')[0];
        fechaInput.value = mananaFormatted;
    }
    
    // Efecto scroll suave para enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Cambiar header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '8px 0';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
            } else {
                header.style.padding = '12px 0';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
        }
    });
    
    // Inicializar acordeón si existe la librería
    function initializeAccordion() {
        if (typeof Accordion !== 'undefined' && document.querySelector('.accordion')) {
            try {
                new Accordion('.accordion', {
                    duration: 400,
                    showMultiple: false,
                    onOpen: function(currentElement) {
                        // Agregar clase personalizada al abrir
                        currentElement.classList.add('is-active');
                    },
                    onClose: function(currentElement) {
                        // Remover clase personalizada al cerrar
                        currentElement.classList.remove('is-active');
                    }
                });
                console.log('Acordeón inicializado correctamente');
            } catch (error) {
                console.error('Error al inicializar el acordeón:', error);
            }
        } else {
            console.log('Librería Accordion no disponible, usando funcionalidad básica');
            initializeBasicAccordion();
        }
    }
    
    // Funcionalidad básica del acordeón si no hay librería
    function initializeBasicAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion__header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const content = this.nextElementSibling;
                
                // Cerrar otros items
                document.querySelectorAll('.accordion__item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-active')) {
                        otherItem.classList.remove('is-active');
                        const otherContent = otherItem.querySelector('.accordion__content');
                        if (otherContent) {
                            otherContent.style.maxHeight = null;
                        }
                    }
                });
                
                // Alternar item actual
                item.classList.toggle('is-active');
                
                if (item.classList.contains('is-active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }
    
    // Funcionalidad del carrusel
    function initializeCarousels() {
        const carousels = document.querySelectorAll('.carousel-container');
        
        if (carousels.length === 0) {
            console.log('No se encontraron carruseles');
            return;
        }
        
        carousels.forEach((carousel, index) => {
            const track = carousel.querySelector('.carousel-track');
            const items = carousel.querySelectorAll('.servicio-carousel-item');
            const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
            const prevBtn = carousel.querySelector('.carousel-arrow.prev');
            const nextBtn = carousel.querySelector('.carousel-arrow.next');
            
            if (!track || items.length === 0) {
                console.log(`Carrusel ${index} no tiene elementos válidos`);
                return;
            }
            
            let currentIndex = 0;
            const totalItems = items.length;
            
            // Ocultar controles si solo hay un elemento
            if (totalItems <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (dots.length > 0) {
                    dots.forEach(dot => {
                        dot.style.display = 'none';
                    });
                }
                return;
            }
            
            function updateCarousel() {
                // Mover el track
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Actualizar puntos de navegación
                dots.forEach((dot, i) => {
                    if (dot) {
                        dot.classList.toggle('active', i === currentIndex);
                    }
                });
                
                // Actualizar índices en los ítems para accesibilidad
                items.forEach((item, i) => {
                    item.setAttribute('aria-hidden', i !== currentIndex);
                    item.setAttribute('tabindex', i === currentIndex ? '0' : '-1');
                });
            }
            
            // Event listeners para flechas
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                    updateCarousel();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    currentIndex = (currentIndex + 1) % totalItems;
                    updateCarousel();
                });
            }
            
            // Event listeners para puntos de navegación
            dots.forEach((dot, i) => {
                if (dot) {
                    dot.addEventListener('click', function() {
                        currentIndex = i;
                        updateCarousel();
                    });
                }
            });
            
            // Navegación con teclado
            track.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                    updateCarousel();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % totalItems;
                    updateCarousel();
                }
            });
            
            // Inicializar carrusel
            updateCarousel();
            
            // Auto-rotación opcional (cada 8 segundos)
            let autoRotateInterval;
            
            function startAutoRotate() {
                autoRotateInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalItems;
                    updateCarousel();
                }, 8000);
            }
            
            function stopAutoRotate() {
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                }
            }
            
            // Pausar auto-rotación al interactuar
            carousel.addEventListener('mouseenter', stopAutoRotate);
            carousel.addEventListener('mouseleave', startAutoRotate);
            carousel.addEventListener('focusin', stopAutoRotate);
            carousel.addEventListener('focusout', startAutoRotate);
            
            // Iniciar auto-rotación
            startAutoRotate();
        });
    }
    
    // Botones de WhatsApp - ATUALIZADO COM NÚMERO CORRETO
    function initializeWhatsAppButtons() {
        const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const servicioCard = this.closest('.servicio-carousel-item');
                let servicioNombre = 'Servicio en Cisealux Galants';
                let servicioPrecio = '';
                
                if (servicioCard) {
                    const nombreElement = servicioCard.querySelector('h4');
                    if (nombreElement) {
                        servicioNombre = nombreElement.textContent.trim();
                    }
                    
                    const precioElement = servicioCard.querySelector('.precio-actual');
                    if (precioElement) {
                        servicioPrecio = precioElement.textContent.trim();
                    }
                }
                
                const mensaje = `¡Hola Cisealux Galants! 👋\n\nMe interesa el servicio:\n📋 ${servicioNombre}\n💰 ${servicioPrecio ? `Precio: ${servicioPrecio}` : ''}\n\n¿Podrían darme más información o ayudarme a reservar?`;
                const url = `https://wa.me/34605886004?text=${encodeURIComponent(mensaje)}`;
                
                window.open(url, '_blank', 'noopener,noreferrer');
            });
        });
    }
    
    // Botones de Reservar (Booksy)
    function initializeReserveButtons() {
        const reserveButtons = document.querySelectorAll('.btn-reservar');
        
        reserveButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtener información del servicio para passar a Booksy
                const servicioCard = this.closest('.servicio-carousel-item');
                let servicioNombre = 'Servicio';
                
                if (servicioCard) {
                    const nombreElement = servicioCard.querySelector('h4');
                    if (nombreElement) {
                        servicioNombre = nombreElement.textContent.trim();
                    }
                }
                
                // URL de Booksy
                const booksyUrl = `https://booksy.com/es-es/136783_ciseaux-galants_peluqueria_48863_barcelona?do=invite&_branch_match_id=1544150758857710068&utm_medium=merchant_customer_invite&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVL8ovD3Q0qwxKjUyyrytKTUstKsrMS49PAooXpxbZOmcU5eemAgAbsAxXPAAAAA%3D%3D`;
                
                window.open(booksyUrl, '_blank', 'noopener,noreferrer');
            });
        });
    }
    
    // Validar y formatear inputs de teléfono
    function initializePhoneInput() {
        const phoneInput = document.getElementById('telefono');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    value = value.match(/.{1,3}/g).join(' ');
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Agregar año actual al footer
    function updateFooterYear() {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement && yearElement.textContent.includes('2026')) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
        }
    }
    
    // Inicializar todos los componentes
    function initializeAll() {
        initializeAccordion();
        initializeCarousels();
        initializeWhatsAppButtons();
        initializeReserveButtons();
        initializePhoneInput();
        updateFooterYear();
        
        // Marcar enlace activo en navegación
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === '/')) ||
                (linkHref === currentPage)) {
                link.classList.add('active');
            }
        });
        
        console.log('Cisealux Galants - Sitio inicializado correctamente');
    }
    
    // Ejecutar inicialización
    initializeAll();
    
    // Recargar carruseles cuando se abre un acordeón (para asegurar dimensiones correctas)
    document.addEventListener('accordionBeforeOpen', function() {
        setTimeout(initializeCarousels, 100);
    });
});