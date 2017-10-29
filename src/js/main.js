// Слайдер с ползунком
const sketchSlider = (block) => {
  const input = document.querySelector(block + ' .sketches__input');
  const circle = document.querySelector(block + ' .sketches__button_mini');
  const wrapper = document.querySelector(block + ' .sketches__blocks');
  const left = document.querySelector(block + ' .sketches__button.sketches__button_left');
  const right = document.querySelector(block + ' .sketches__button.sketches__button_right');
  const margin = parseInt(getComputedStyle(wrapper.children[0]).marginRight);
  const offset = wrapper.children[0].clientWidth + margin;
  const width = wrapper.scrollWidth - offset * Math.floor(window.innerWidth / offset);
  let currentOffset = 0;

  input.onmouseenter = () => circle.style.boxShadow = 'none';
  input.onmouseleave = () => circle.style.boxShadow = '';

  input.oninput = () => {
    circle.style.left = input.value + '%';
    currentOffset = width / 100 * input.value;
    wrapper.style.transform = `translateX(-${currentOffset}px)`
  }

  const drawInputs = () => {
    let proc = currentOffset / width * 100;
    input.value = proc;
    circle.style.left = proc + '%';
    wrapper.style.transform = `translateX(-${currentOffset}px)`
  }

  left.onclick = () => {
    if (currentOffset <= offset) currentOffset = 0
    else currentOffset -= offset;
    drawInputs();
  }

  right.onclick = () => {
    if (currentOffset >= width - offset ) currentOffset = width + (window.innerWidth < 720? margin : 0)
    else currentOffset += offset;
    drawInputs();
  }
}


window.onresize = () => {
  sketchSlider('#sketches');
  //sketchSlider('#top-slider');
}
//['#sketches', '#top-slider'].forEach(id => sketchSlider(id))
['#sketches'].forEach(id => sketchSlider(id))

// Top slider click to view
new lightGallery(document.querySelector('#top-slider .sketches__blocks'), { thumbnail: false });

[...document.querySelectorAll('.jobs__image.lg')].forEach(block => new lightGallery(block, { thumbnail: true }));

// Слайдеры в разделе "Внимание к деталям"
const createCareSlider = (selector) => (
  new Swiper(`${selector} .swiper-container`, {
    spaceBetween: 10,
    slidesPerView: 3,
    touchRatio: 0.2,
    nextButton: `${selector} .care__right`,
    prevButton: `${selector} .care__left`,
    breakpoints: {
      719: {
        spaceBetween: 0,
        slidesPerView: 1,
        touchRatio: 1
      }
    }
  })
);

createCareSlider('#embroidery');
createCareSlider('#logotype');
createCareSlider('#monogramma');
createCareSlider('#insoles');
createCareSlider('#sole');

// Соответствие нажатой картинки с большой картинкой
const careSliders = () => {
  if (window.innerWidth < 720) return null
  const images = [...document.querySelectorAll('.care__minislide')];
  if (!images) return null;
  images.forEach(image => image.onclick = (e) => {
    const src = e.target.style.backgroundImage.match(/\("([^"]*)/)[1];
    e.target.closest('.care__block').querySelector('.care__big').style.backgroundImage = `url('${src}')`;
    [...e.target.parentElement.children].forEach(el=>el.classList.remove('is-selected'))
    e.target.classList.add('is-selected')
  })
}
careSliders()



// callback popup
var modal = new tingle.modal({
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2']
});

var callBackWrap = () => {
  return`<div class="call">
            <div class="g-wrapper">
              <div class="call__content">
                <div class="call__title"> Заказать звонок</div>
                <form class="call__form">
                  <div class="call__item">
                    <label class="call__field"> * Ваше имя:</label>
                    <input class="call__input" type="text" required name="name" placeholder="Например, Антон" />
                  </div>
                  <div class="call__item">
                    <label class="call__field"> * Ваш телефон:</label>
                    <input class="call__input" type="tel" required name="phone" placeholder="+7 (999) 999-99-99" />
                  </div>
                  <button class="button call__submit"> Записаться </button>
                </form>
              </div>
            </div>
          </div>
        `
};

var callBack = function(){
  const callBackButton = Array.prototype.slice.call(document.querySelectorAll('.callback__button'));
  const sewingButton = Array.prototype.slice.call(document.querySelectorAll('.sewing'));
  if(!callBackButton || !sewingButton) return null;
  sewingButton.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(callBackWrap());
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal-box').style.background="none";
    document.querySelector('.call__title').innerHTML = 'Заказать пошив'
    modal.open();
  })
  callBackButton.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(callBackWrap());
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal-box').style.background="none";
    modal.open();
  })
}
callBack();


// popups


var modalWrap = () => {
  return`<div class="modal__wrap">
            <div class="modal__top">
              <div class="modal__title"> Броги </div>
              <img src="../images/shape-hand.svg" class="modal__svg"/>
            </div>
            <div class="modal__photo">
              <img src="../images/brogi.png" />
            </div>
            <div class="modal__previews">
              <img src="../images/mini-brogi.png"/>
              <img src="../images/mini-brogi.png"/>
            </div>
            <div class="modal__text">
              Броги - это не отдельный фасон обуви, а способ ее декорирования. Брогирование - нанесение перфорации на те же оксфорды, дерби и даже лоуферы.
              <br><br>
              Полностью декорированные тяжелые броги сильно нагружены визуально, и носить их со строгими костюмами не вполне уместно. Лучше всего такая обувь смотрится с тканями вроде твида, вельвета, клетчатыми спортивными пиджаками, блейзерами. Не стоит носить броги со слишком узкими брюками, в таком случае нога будет смотреться огромной, а еще лучше если на брюках будут отвороты, а еще лучше просто оденьте джинсы
            </div>
            <div class="button modal__button sewing"> Заказать пошив </div>
          </div>`;
};

var popup = function(){
  const PopUp = Array.prototype.slice.call(document.querySelectorAll('.sketch'));
  if(!PopUp) return null;
  PopUp.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(modalWrap());
    document.querySelector('.tingle-modal-box').style.background="white";
    modal.open();
    const sewingButton = document.querySelector('.sewing');
    sewingButton.onclick = function(e){
      e.preventDefault();
      modal.setContent(callBackWrap());
      document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
      document.querySelector('.tingle-modal-box').style.background="none";
      document.querySelector('.call__title').innerHTML = 'Заказать пошив'
      modal.open();
    }
  })
}
popup();


// Плавный скролл
new SmoothScroll('a[href*="#"]', { speed: 1500 })

const mobileMenu = () => {
  const hamburger = document.querySelector('.header__hamburger svg');
  const close = document.querySelector('.mob-menu__close');
  const menu = document.querySelector('.mob-menu');
  const items = [...document.querySelectorAll('.mob-menu__item')];
  items.forEach(el => el.onclick = () => menu.style.bottom = '');
  hamburger.onclick = () => menu.style.bottom = 0;
  close.onclick = () => menu.style.bottom = '';

}
mobileMenu();

// Input Masks
[...document.querySelectorAll('.callback__input[name="phone"]')].forEach(el =>
  new Inputmask("+7 (999) 999-99-99").mask(el)
)

// scrollTop button

window.onscroll = () => {
  const topButton = document.querySelector('.to-top')
  topButton.style.opacity = window.pageYOffset > 1000? 1 : ''
}
