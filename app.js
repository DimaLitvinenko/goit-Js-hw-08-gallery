const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  list: document.querySelector('.js-gallery'),
  container: document.querySelector('.js-lightbox'),
  image: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

const { list, container, image, closeBtn, overlay } = refs;

// ВАРИАНТ 1- Создание и рендеринг разметки для обьекта
// const createGalleryCard = ({ preview, original, description }) => {
//   const itemEl = document.createElement('li');
//   itemEl.classList.add('gallery__item');

//   const linkEl = document.createElement('a');
//   linkEl.classList.add('gallery__link');
//   linkEl.href = `${original}`;

//   const imageEl = document.createElement('img');
//   imageEl.classList.add('gallery__image');
//   imageEl.src = `${preview}`;
//   imageEl.dataset.source = `${original}`;
//   imageEl.alt = `${description}`;

//   linkEl.append(imageEl);
//   itemEl.append(linkEl);
  
//   return itemEl;
// };
// const markupElements = galleryItems.map(createGalleryCard);
// console.log(markupElements);
// list.append(...markupElements);

// ВАРИАНТ 2- Создание и рендеринг разметки для строки
const createGalleryCard = items => {
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
createGalleryCard(galleryItems, galleryItems.length);  // вызов функции 

// - Закрытие модального окна по нажатию клавиши `ESC`.
const itemGalleryEscHandler = ({ code }) => {
  
  if (code === 'Escape') {
    itemGalleryCloseHandler();
  };
  console.log(code);
};

// - Пролистывание изображений галереи в открытом модальном окне клавишами "влево"
//   и "вправо".
const scrollGalleryHandler = ({ code }) => {
  let currentIndex = galleryItems.findIndex(item => item.description === image.alt || item.original === image.src);
  
  if (code === "ArrowLeft") {
    if (currentIndex !== 0) {
      currentIndex -= 1;
    } else {
      currentIndex = 0;
    };
  };

  if (code === "ArrowRight") {
    if (currentIndex !== galleryItems.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = galleryItems.length - 1;
    };
  };
  console.log(currentIndex);
  image.alt = galleryItems[currentIndex].description;
  image.src = galleryItems[currentIndex].original;
};

// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута `src` элемента `img.lightbox__image`.
const itemGalleryOpenHandler = ({ target, currentTarget }) => {
  if (target.nodeName !== 'IMG') {
    return;
  };
  console.log(target);
  console.log(currentTarget);
  
  event.preventDefault();
  window.addEventListener('keydown', itemGalleryEscHandler);
  window.addEventListener('keydown', scrollGalleryHandler);

  container.classList.add('is-open');
  image.src = target.dataset.source;
  image.alt = target.alt;
  console.log(image.alt);
};

// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.
const itemGalleryCloseHandler = () => {
  window.removeEventListener('keydown', scrollGalleryHandler);

  container.classList.remove('is-open');
  image.src = "";
  image.alt = "";
};

list.addEventListener('click', itemGalleryOpenHandler);

closeBtn.addEventListener('click', itemGalleryCloseHandler);
overlay.addEventListener('click', itemGalleryCloseHandler);