import galleryItems from "./references/gallery.js";
const refs = {
  list: document.querySelector('.js-gallery'),
  container: document.querySelector('.js-lightbox'),
  image: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};
const { list, container, image, closeBtn, overlay } = refs;

const createGalleryCard = items => {               // Создание и рендеринг разметки для строки
  return list.insertAdjacentHTML(
    'beforeend',
    items.map(({ preview, original, description }, index) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            data-index="${index}"
          />
        </a>
      </li>`;
    })
      .join('')
  );
};
const markup = createGalleryCard(galleryItems, galleryItems.length);  

const itemGalleryEscHandler = ({ key }) => {                      // - Закрытие модального окна по нажатию клавиши `ESC`.
  if (key === 'Escape') {
    itemGalleryCloseHandler();    
  };
};

const scrollGalleryHandler = ({ key }) => {   
  let currentIndex = galleryItems.findIndex(
    item => item.description === image.alt || item.original === image.src
  );
  if (key === "ArrowLeft") {                // - Пролистывание изображений галереи в открытом модальном окне стрелками "влево".
    if (currentIndex !== 0) {
      currentIndex -= 1;
    } else {
      currentIndex = 0;
    };
  };
  if (key === "ArrowRight") {                // - Пролистывание изображений галереи в открытом модальном окне стрелками "вправо".
    if (currentIndex !== galleryItems.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = galleryItems.length - 1;
    };
  }; 
  
  image.alt = galleryItems[currentIndex].description;
  image.src = galleryItems[currentIndex].original;
};

// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого изображения.
const itemGalleryOpenHandler = ({ event, target, currentTarget }) => {
  if (target.nodeName !== 'IMG') {
    return;
  };
  console.log(target);
  console.log(currentTarget);
  
  event.preventDefault();
  window.addEventListener('keydown', itemGalleryEscHandler);  
  window.addEventListener('keydown', scrollGalleryHandler);

  container.classList.add('is-open');        // - Открытие модального окна по клику на элементе галереи.
  image.src = target.dataset.source;          // - Подмена значения атрибута `src` элемента `img.lightbox__image`.
  image.alt = target.alt;
  console.log(image.alt);
};

const itemGalleryCloseHandler = () => {
  window.removeEventListener('keydown', scrollGalleryHandler);
  
  container.classList.remove('is-open');     // - Закрытие модального окна по клику на кнопку `button[data-action="close-lightbox"]`.
  image.src = "";                         // - Очистка значения атрибута `src` элемента `img.lightbox__image`.
  image.alt = "";
};

list.addEventListener('click', itemGalleryOpenHandler);
closeBtn.addEventListener('click', itemGalleryCloseHandler);
overlay.addEventListener('click', itemGalleryCloseHandler);
