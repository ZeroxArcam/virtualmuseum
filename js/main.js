document.addEventListener('DOMContentLoaded', function () {
  // Cargar Header Dinámicamente
  fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;

      // Agregar Favicon al Head
      const faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.href = '/assets/logo4.ico';
      faviconLink.type = 'image/x-icon';
      document.head.appendChild(faviconLink);

      // Funcionalidad de Menú Hamburguesa
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.main-nav');
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
      });

      // Cerrar Menú al Hacer Clic en un Enlace
      document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
    })
    .catch(error => console.error('Error al cargar el header:', error));

  // Cargar Footer Dinámicamente
  fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
      const footerContainer = document.createElement('div');
      footerContainer.id = 'footer-container';
      footerContainer.innerHTML = data;
      document.body.appendChild(footerContainer);
    })
    .catch(error => console.error('Error al cargar el footer:', error));

  // Funcionalidad del Carrusel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let counter = 1;
    const totalItems = items.length;
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    const allItems = document.querySelectorAll('.carousel-item');
    const itemWidth = 100; 
    carousel.style.transform = `translateX(-${counter * itemWidth}%)`;

    function updateCarousel() {
      carousel.style.transition = "transform 0.6s ease-in-out";
      carousel.style.transform = `translateX(-${counter * itemWidth}%)`;

      setTimeout(() => {
        if (allItems[counter].id === "first-clone") {
          carousel.style.transition = "none";
          counter = 1;
          carousel.style.transform = `translateX(-${counter * itemWidth}%)`;
        } else if (allItems[counter].id === "last-clone") {
          carousel.style.transition = "none";
          counter = totalItems;
          carousel.style.transform = `translateX(-${counter * itemWidth}%)`;
        }
      }, 500);
    }

    prevButton.addEventListener('click', () => {
      if (counter <= 0) return;
      counter--;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      if (counter >= allItems.length - 1) return;
      counter++;
      updateCarousel();
    });

    updateCarousel();
  }

  document.querySelectorAll('.content-item img').forEach(img => {
    img.addEventListener('click', () => {
      const modalId = img.getAttribute('data-id'); 
      console.log('Redirigiendo a gallery.html con hash:', modalId); 
      window.location.href = `/components/gallery.html#${modalId}`; 
    });
  });


  const galleryItems = document.querySelectorAll('.gallery-item img');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const galleryItem = item.closest('.gallery-item');
      const descriptionElement = galleryItem.querySelector('.gallery-description');
      const modalId = item.getAttribute('data-id'); 
      const description = descriptionElement ? descriptionElement.innerHTML : "<p>No description available for this artwork.</p>";
      const modal = document.createElement('div');
      modal.className = 'gallery-modal';
      modal.id = modalId; 
      modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${item.src}" alt="${item.alt}">
            <div class="text-content">
              <p class="modal-title">${item.alt}</p>
              <div class="modal-description">${description}</div>
            </div>
          </div>`;
      document.body.appendChild(modal);

      const closeModal = modal.querySelector('.close-modal');
      closeModal.addEventListener('click', () => modal.remove());

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  });

  if (window.location.pathname.includes('/gallery.html')) {

    const hash = window.location.hash.substring(1); // Obtiene el hash sin el '#'
    console.log('Hash detectado:', hash); // Depuración
    if (hash) {
      const galleryImage = document.querySelector(`.gallery-item img[data-id="${hash}"]`); // Buscar la imagen con el data-id
      console.log('Elemento encontrado:', galleryImage); // Depuración
      if (galleryImage) {
        // Simular el clic
        galleryImage.dispatchEvent(new Event('click')); // Activa el evento click asociado
      } else {
        console.warn('No se encontró una imagen con el ID:', hash);
      }
    }
  }


});
