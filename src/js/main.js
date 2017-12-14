window.phoneIsValid = false;

/**
 * Пост запрос формы обратной связи
 */
var sendMail = function sendMail(selector) {
  return fetch('/mail.php', {
    method: 'POST',
    body: new FormData(document.querySelector(selector))
  }).then(r => {
    if(r.status != "200") throw Error(r.statusText)
  }).catch(function (error) {
    alertify.error("Ошибка. Повторите отправку позже");
    throw Error(error)
  });
};

var sendPresentMail = function sendMail(selector) {
  return fetch('/mail-present.php', {
    method: 'POST',
    body: new FormData(document.querySelector(selector))
  }).then(r => {
    if(r.status != "200") throw Error(r.statusText)
  }).catch(function (error) {
    alertify.error("Ошибка. Повторите отправку позже");
    throw Error(error)
  });
};




// SVG line width fix

// [...document.querySelectorAll('.sketch__sketch svg')]
//   .forEach(
//     (svg, i) => [0,1].includes(i)
//       ? [...svg.querySelectorAll('path')].forEach(path=>path.style.strokeWidth = 2)
//       : i==6
//         ? [...svg.querySelectorAll('path')].forEach(path=>path.style.strokeWidth = 2)
//         :''
//   );


///////////////////
(()=>{
  const preloader = document.querySelector('.preloader');
  const images = [...document.querySelectorAll('.header__slider img')];
  // const images = [...document.querySelectorAll('img')];
  const promises = images.map(image => new Promise((res, rej) => {
    const img = new Image();
    img.src = image.src;
    img.onload = img.onerror = () => res(img)
  }))
  Promise.all(promises).then(()=>{
    preloader.style.opacity = 0;
    preloader.addEventListener('transitionend', function end(){
      this.remove();
    })
  })
})()

// Слайдер с ползунком
// const sketchSlider = (block) => {
//   const input = document.querySelector(block + ' .sketches__input');
//   const circle = document.querySelector(block + ' .sketches__button_mini');
//   const wrapper = document.querySelector(block + ' .sketches__blocks');
//   const left = document.querySelector(block + ' .sketches__button.sketches__button_left');
//   const right = document.querySelector(block + ' .sketches__button.sketches__button_right');
//   const margin = parseInt(getComputedStyle(wrapper.children[0]).marginRight);
//   const offset = wrapper.children[0].clientWidth + margin;
//   const width = wrapper.scrollWidth - offset * Math.floor(window.innerWidth / offset);
//   let currentOffset = 0;

//   input.onmouseenter = () => circle.style.boxShadow = 'none';
//   input.onmouseleave = () => circle.style.boxShadow = '';

//   input.oninput = () => {
//     circle.style.left = input.value + '%';
//     currentOffset = width / 100 * input.value;
//     wrapper.style.transform = `translateX(-${currentOffset}px)`
//   }

//   const drawInputs = () => {
//     let proc = currentOffset / width * 100;
//     input.value = proc;
//     circle.style.left = proc + '%';
//     wrapper.style.transform = `translateX(-${currentOffset}px)`
//   }

//   left.onclick = () => {
//     if (currentOffset <= offset) currentOffset = 0
//     else currentOffset -= offset;
//     drawInputs();
//   }

//   right.onclick = () => {
//     if (currentOffset >= width - offset ) currentOffset = width + (window.innerWidth < 720? margin : 0)
//     else currentOffset += offset;
//     drawInputs();
//   }
// }


// window.onresize = () => {
//   sketchSlider('#sketches');
//   //sketchSlider('#top-slider');
// }
// //['#sketches', '#top-slider'].forEach(id => sketchSlider(id))
// ['#sketches'].forEach(id => sketchSlider(id))

// Top slider click to view
new lightGallery(document.querySelector('#top-slider .sketches__blocks'), { thumbnail: false });
// Внимание к деталям лайт галлери
new lightGallery(document.querySelector('.header-swiper-wrapper'), { thumbnail: false });


(()=>{
  const block = document.querySelector('.works__images');
  const templates = [...document.querySelector('.works__images_template').children];
  const button = document.querySelector('#more-works');
  const addNine = () => (templates.splice(0, 9).forEach(el => block.appendChild(el)),
    [...document.querySelectorAll('.works__images img')].forEach(i => i.setAttribute('src', i.getAttribute('data-src'))),
    new lightGallery(document.querySelector('.works__images'), { thumbnail: false }))
  button.onclick = addNine;
  addNine();
})();

// (()=>{
//   const block = document.querySelector('.footer__images');
//   const templates = [...document.querySelector('.footer__images_template').children];
//   const button = document.querySelector('#footer-works');
//   const addNine = () => (templates.splice(0, 9).forEach(el => block.appendChild(el)),
//   new lightGallery(document.querySelector('.footer__images'), { thumbnail: false }))
//   button.onclick = addNine;
//   addNine();
// })()



// Слайдеры в хедере
var swiper = new Swiper('#header-swiper', {
  slidesPerView: 5,
  spaceBetween: 20,
  autoplay:{
    delay:2000,
  },
  nextButton: '.header__pag_right',
  prevButton: '.header__pag_left',
  navigation: {
    nextEl: '.header__pag_right',
    prevEl: '.header__pag_left',
  },
});

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
  onOpen: function(){
    [...document.querySelectorAll('input[type="tel"]')].forEach(el =>
      new Inputmask("+7 (999) 999-99-99", {
        oncomplete: function() { window.phoneIsValid = true },
        onincomplete: function() { window.phoneIsValid = false }
      }).mask(el)
    )
  },
  cssClass: ['custom-class-1', 'custom-class-2']
});

/**
 * Подарочный сертификат
 */

const presentForm = () => {
  var form = document.querySelector('.present__form');
  form.onsubmit = function(e){
    e.preventDefault();
    if(!window.phoneIsValid) return alertify.error("Введите правильный номер телефона");
    sendPresentMail('.call__form').then(_ => (alertify.success("Ваша заявка отправленна"), document.querySelector('.present__form').reset(), modal.close()))
  }
};
presentForm();

/**
 * отправка модалки
 */

const callBackFormSend = () => {
  var submit = document.querySelector('#call-submit')
  var checkbox = document.querySelector('#modal-checkbox')
  var form = document.querySelector('.call__form');
  document.querySelector('.call__form').onsubmit = function(e){
    e.preventDefault();
    if(!window.phoneIsValid) return alertify.error("Введите правильный номер телефона");
    if(!checkbox.checked){
      alertify.error("Вы не приняли соглашение об обработке персональных данных");
    } else {
      sendMail('.call__form').then(_ => (alertify.success("Ваша заявка отправленна"), document.querySelector('.call__form').reset(), modal.close()))
    }
  }
};

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
                  <div class="footer__item footer__personal feedback__item_marg">&nbsp; &nbsp; &nbsp; &nbsp;
                    <label class="confirm__label">
                        <input type="checkbox" id="modal-checkbox"/><span></span></label>
                    <p>Я принимаю <a>соглашение сайта</a> об обработке персональных данных</p>
                  </div>
                  <button type="submit" class="button call__submit" id="call-submit"> Записаться </button>
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
    callBackFormSend();
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal-box').style.background="none";
    document.querySelector('.call__title').innerHTML = 'Заказать пошив';
    modal.open();
  })
  callBackButton.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(callBackWrap());
    callBackFormSend();
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal-box').style.background="none";
    modal.open();
  })
}
callBack();

// политика конф.
const politic = `<div style="color: black; font-size: 1.8rem;">
<h2>Политика конфиденциальности</h2>
<p>Настоящий документ «Политика конфиденциальности» представляет собой правила использования shoes.strogo-mtm.ru персональной информации Пользователя.</p>
<p>Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:</p>
<ul style="margin: 1.5rem 0 1.5rem 4rem;">
  <li>Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта, оказания услуг, обработку запросов и заявок от Пользователя.</li>
  <li>Осуществление клиентской поддержки</li>
  <li>Получения Пользователем информации о маркетинговых событиях</li>
  <li>Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых услуг</li>
</ul>
<h2>Персональная информация</h2>
<p>Под персональными данными подразумевается любая информация, предоставляемая пользователем самостоятельно, включая персональные данные пользователя, такие как:</p>
<ul style="margin: 1.5rem 0 1.5rem 4rem;">
<li>Фамилия, Имя, Отчество</li>
<li>Контактный телефон</li>
<li>Адрес электронной почты</li>
</ul>
А также данные, которые передаются в автоматическом режиме.
<p>Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.</p>
<p>Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением следующего случая:</p>
<ul style="margin: 1.5rem 0 1.5rem 4rem;">
<li>По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ.</li>
</ul>
<p> Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на Сайте.
</p></div>
`
var showPolitics = function(){
  modal.setContent(politic);
  modal.open();
}
/**
 * Вызов политики конф в футер форме
 */
var openFooterPolitics = function(){
  const buttons = Array.prototype.slice.call(document.querySelectorAll('.politics'))
  if(!buttons) return null;
  buttons.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    showPolitics();
  }
  )

}
openFooterPolitics();
// popups

//Контент для ботинок в попап "Эскизы моделей"
const modelSketches = [
  {
    data: 'brogs',
    title: 'Броги',
    text: 'Броги - это не отдельный фасон обуви, а способ ее декорирования. Брогирование - нанесение перфорации на те же оксфорды, дерби и даже лоуферы.<br><br>Полностью декорированные тяжелые броги сильно нагружены визуально, и носить их со строгими костюмами не вполне уместно. Лучше всего такая обувь смотрится с тканями вроде твида, вельвета, клетчатыми спортивными пиджаками, блейзерами. Не стоит носить броги со слишком узкими брюками, в таком случае нога будет смотреться огромной, а еще лучше если на брюках будут отвороты, а еще лучше просто оденьте джинсы',
    photoBig: '../images/brogi.png',
    photoMin1: '../images/mini-brogi.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'single-monks',
    title: 'Синг монки',
    text: 'Из всей классической обуви монки - самые самостоятельные, в том смысле что могут создать образ в целом. Монки делятся на два вида: monk strap shoe и double monk strap shoe в зависимости от количества ремешков. Ремешки - деталь декоративная, ботинок и без них хорошо держится на ноге, а одевать их легко как любую обувь без шнурков. Носить можно как с джинсами, так и деловыми костюмами. Считается, что монки из гладкой кожи с одним ремешком более строгие и лучше сочетаются с костюмами, а монки с двойной пряжкой из замши и украшенные перфорацией придают расслабленности и годятся для неформальных сочетаний и носки без носков. ',
    photoBig: '../images/single.png',
    photoMin1: '../images/mini-single.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'double-monks',
    title: 'Дабл монки',
    text: 'Из всей классической обуви монки - самые самостоятельные, в том смысле что могут создать образ в целом. Монки делятся на два вида: monk strap shoe и double monk strap shoe в зависимости от количества ремешков. Ремешки - деталь декоративная, ботинок и без них хорошо держится на ноге, а одевать их легко как любую обувь без шнурков. Носить можно как с джинсами, так и деловыми костюмами. Считается, что монки из гладкой кожи с одним ремешком более строгие и лучше сочетаются с костюмами, а монки с двойной пряжкой из замши и украшенные перфорацией придают расслабленности и годятся для неформальных сочетаний и носки без носков. ',
    photoBig: '../images/double.png',
    photoMin1: '../images/mini-double.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'lufers',
    title: 'Лоферы',
    text: 'Самая удобная обувь среди классики - Лоуферы. Есть много вариаций: венецианские, пенни-лоферы, бельгийские, с кисточками, с пряжкми, но всегда не изменен каблук и отсутствие шнурков. Лоферы вполне можно сочетать с носками, носить как с костюмами, так и с джинсами и чиносами. ',
    photoBig: '../images/loafer.png',
    photoMin1: '../images/mini-loafer.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'houlcats',
    title: 'Хоулкатс',
    text: 'Классические мужские туфли, сделанные из одного куска кожи; единственный шов располагается сзади. Такие туфли сложнее в изготовлении, чем обычные оксфорды — именно поэтому wholecuts предлагают далеко не все производители обуви. Производство wholecuts, кроме того, обходится дороже из-за того, что для таких туфель нужны большие куски кожи высокого качества без дефектов. Туфли wholecuts хорошо сочетаются с костюмами из гладких шерстяных тканей, а также фланели. Льняные и хлопковые костюмы тоже подойдут, но не к черным моделям, а только к коричневым, бордово-коричневым и рыжевато-коричневым. С джинсами wholecuts носить не стоит; что касается непарных брюк, то неплохо подойдут фланелевые модели, а также строгие чиносы. Вельветовые брюки с wholecuts лучше не сочетать, равно как и твидовые костюмы. Черные лакированные wholecuts подходят исключительно для ношения со смокингом.',
    photoBig: '../images/howcults.png',
    photoMin1: '../images/mini-howcults.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'oxfords',
    title: 'Оксфорды',
    text: 'Самый популярный и востребованный вид обуви в классике. Оксфорды из гладкой кожи и закрытой шнуровкой самая строгая обувь, предназначенная для официально-деловых встреч и торжественных случаев. Одевать под оксфорды стоит строгие костюмы и смокинги. ',
    photoBig: '../images/oxford.png',
    photoMin1: '../images/mini-oxford.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'derbi',
    title: 'Дерби',
    text: 'Самая популярная обувь среди классики наряду с оксфордами. Секрет успеха, во первых, в открытой шнуровке, которая подходит для любого подъема стопы, во вторых, в универсальности. Дерби отлично смотрятся с официальным костюмом и с повседневной одеждой. ',
    photoBig: '../images/derbi.png',
    photoMin1: '../images/mini-derbi.png',
    photoMin2: '../images/mini-brogi.png'
  },
  {
    data: 'slippers',
    title: 'Слипперы',
    text: 'Слиперы - это идеальное решение для неформального выхода. Эта обувь совершенно не требовательная и подходит практически ко всему, если помнить эти простые правила: 1) Не носите слиперы с носками. 2) Не носите брюки которые закрывают щиколотку, когда на ногах слиперы. 3) Не носите очень широкие брюки вместе с ними. ',
    photoBig: '../images/loafer.png',
    photoMin1: '../images/mini-loafer.png',
    photoMin2: '../images/mini-brogi.png'
  },
]


var modalWrap = ({title,text,photoBig,photoMin1,photoMin2}) => {
  return`<div class="modal__wrap">
            <div class="modal__top">
              <div class="modal__title"> ${title} </div>
              <img src="../images/shape-hand.svg" class="modal__svg"/>
            </div>
            <div class="modal__content">
              <div class="modal__grid">
                <div class="modal__text">
                  ${text}
                </div>
                <div class="button modal__button sewing"> Заказать пошив </div>
              </div>
              <div class="modal__grid">
                <div class="modal__photo">
                  <img src="${photoBig}" />
                </div>
                <div class="modal__previews">
                  <img src="${photoMin1}"/>
                  <img src="${photoMin2}"/>
                </div>
              </div>
            </div>
          </div>`;
};

var popup = function(){
  const PopUp = Array.prototype.slice.call(document.querySelectorAll('.sketch'));
  if(!PopUp) return null;
  PopUp.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    console.log(el.dataset.boots)
    modal.setContent(modalWrap(modelSketches.find(item=> item.data === el.dataset.boots )));
    document.querySelector('.tingle-modal-box').style.background="white";
    modal.open();
    const sewingButton = document.querySelector('.sewing');
    sewingButton.onclick = function(e){
      e.preventDefault();
      modal.setContent(callBackWrap());
      callBackFormSend();
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
  const body = document.querySelector('body')
  const close = document.querySelector('.mob-menu__close');
  const menu = document.querySelector('.mob-menu');
  const items = [...document.querySelectorAll('.mob-menu__item')];
  items.forEach(el => el.onclick = () => {
    menu.style.bottom = '';
    body.style.overflow = '';
  });
  hamburger.onclick = () => {
    menu.style.bottom = 0;
    body.style.overflow = 'hidden';
  };

  close.onclick = () => {
    menu.style.bottom = '';
    body.style.overflow = ''
  }
}
mobileMenu();

// Input Masks
[...document.querySelectorAll('input[type="tel"]')].forEach(el =>
  new Inputmask("+7 (999) 999-99-99", {
    oncomplete: function() { window.phoneIsValid = true },
    onincomplete: function() { window.phoneIsValid = false }
  }).mask(el)
)

// scrollTop button

window.onscroll = () => {
  const topButton = document.querySelector('.to-top')
  topButton.style.opacity = window.pageYOffset > 1000? 1 : ''
}

// Показать больше в блоке "Внимание к деталям"
// const showMoreDetails = (buttonEl,blocksEl) => {
//   const button = document.querySelector(buttonEl)
//   const blocks = Array.prototype.slice.call(document.querySelectorAll(blocksEl))
//   button.onclick = function(){
//     blocks.forEach((e)=> (e.style.display='block'))
//   }
// }
// showMoreDetails('#footer-works','.footer__images a');
// showMoreDetails('#more-works','.works__images a');

// * сортировка блоков Наши работы




/**
 * Отправка заявки футер
 */
var feedBack = function(){
  const checkbox = document.getElementById('feedback-checkbox')
  const form = document.getElementById('feedbackform')
  document.getElementById('feedbackform').onsubmit = function(e){
    e.preventDefault();
    if(!window.phoneIsValid) return alertify.error("Введите правильный номер телефона");
    if(!checkbox.checked){
      alertify.error("Вы не приняли соглашение об обработке персональных данных");
    } else {
      sendMail("#feedbackform").then(_ => (alertify.success("Ваша заявка отправленна"), document.getElementById('feedbackform').reset()))
    }
  }
}
feedBack();

var footerForm = function(){
  const checkbox = document.getElementById('footercheckbox')
  const form = document.getElementById('footerform')
  document.getElementById('footerform').onsubmit = function(e){
    e.preventDefault();
    if(!window.phoneIsValid) return alertify.error("Введите правильный номер телефона");
    if(!checkbox.checked){
      alertify.error("Вы не приняли соглашение об обработке персональных данных");
    } else {
      sendMail("#footerform").then(_ => (alertify.success("Ваша заявка отправленна"), document.getElementById('footerform').reset()))
    }
  }
}
footerForm();

(()=>{
  const makeBlock = (name, price, img, category, type, video) => {
    const mount = document.querySelector('.jobs__blocks_template');
    let [folder, qty] = img.split(' ');
    const block = document.createElement('div');
    block.className = `jobs__block ${!type? '' : type=='left'? 'jobs__block_left' : 'jobs__block_right'}`;
    block.setAttribute('data-category', category);
    block.innerHTML = `
      <div class="jobs__image lg">
        <img src="" data-src="${folder}/1.jpg" style="width: 100%" />
      </div>
      <div class="jobs__shape">
        <?xml version="1.0" encoding="UTF-8"?>
        <svg width="60px" height="17px" viewBox="0 0 60 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="shape-hand" fill-rule="nonzero" fill="#B35330">
                    <path d="M48.31567,5.4e-05 C48.290137,-0.001024 48.238033,0.014414 48.211878,0.013632 C46.380185,-0.041028 43.057947,0.531669 39.765767,1.480081 C36.306481,2.476632 32.97598,4.109257 29.217813,5.363455 C27.520677,4.526893 25.794854,3.729006 24.06712,3.082313 C21.058502,1.95621 18.150604,1.222095 15.867497,1.222095 C15.300083,1.222095 14.746079,1.259445 14.206813,1.330721 C13.667548,1.401997 13.136752,1.507872 12.636928,1.64302 C11.63728,1.91332 10.72461,2.302214 9.951312,2.783591 C8.571658,3.64237 7.653799,4.810128 7.460288,6.123836 C6.673248,6.15131 5.922619,6.194791 5.293594,6.273197 C3.80201,6.459112 2.723355,6.772454 1.946279,7.182938 C1.557763,7.388181 1.241901,7.616768 0.986197,7.86185 C-0.03666,8.842172 0.000166,10.075575 0.000166,10.835483 C0.000166,11.34655 0.242958,11.917079 0.687814,12.54634 C1.132669,13.175601 1.795157,13.846161 2.698776,14.460871 C3.150607,14.768225 3.656119,15.06221 4.229719,15.329878 C5.37696,15.865212 6.772765,16.296787 8.433323,16.524762 C9.263624,16.63875 10.166786,16.701279 11.131934,16.701279 C12.040203,16.701279 13.049234,16.600448 14.103021,16.456871 C17.558446,15.986065 21.619066,14.85596 25.325586,13.646177 C25.949048,13.442686 26.402207,13.266703 26.999264,13.062313 C27.507765,13.304136 28.026272,13.527166 28.530207,13.768381 C30.935831,14.919932 33.276232,16.041672 35.45837,17 L35.717851,16.361823 C33.551033,15.410213 31.209387,14.282259 28.802642,13.130204 C28.516506,12.993231 28.221361,12.860308 27.933399,12.722857 C31.514247,11.468876 34.603616,10.290463 35.549168,9.93932 C35.646857,9.903047 36.049739,9.754886 36.171924,9.70849 C38.145272,10.640152 40.216393,11.545965 42.28274,12.301932 C43.98411,12.924375 45.621129,13.449147 47.070158,13.836272 C48.519187,14.223397 49.779729,14.472585 50.715897,14.515184 C52.581509,14.600077 54.914188,14.009613 56.787771,12.940109 C57.256125,12.672733 57.688982,12.372778 58.085179,12.043945 C58.481377,11.715113 58.830494,11.360963 59.123106,10.971265 C59.708207,10.191866 60.056909,9.273612 59.99235,8.282775 C59.868878,6.387232 58.900533,5.094546 57.514319,4.33151 C56.609953,3.833738 55.50016,3.590399 54.335647,3.435347 C54.071391,2.225667 53.469684,1.373745 52.584166,0.869061 C51.959417,0.513007 51.196416,0.318375 50.352623,0.190149 C49.69109,0.055935 49.040143,0.007653 48.445411,0.013632 C48.404766,0.014041 48.355693,-0.000854 48.31567,5.4e-05 Z M48.713781,1 L48.726758,1 C49.455759,1.031544 50.088322,1.103769 50.683157,1.191956 C51.222144,1.299976 51.761794,1.444589 52.237927,1.678245 C53.048688,2.076105 53.685232,2.652281 54,3.521024 C53.607203,3.489602 53.238909,3.414184 52.833922,3.40585 C46.714346,4.023627 40.901951,5.903053 34.967041,8 C34.422249,7.732551 33.783633,7.472023 33.295642,7.206581 C32.889412,6.985624 32.423395,6.784892 32,6.566728 C32.10162,6.524786 32.326212,6.451222 32.414605,6.413163 C33.922691,5.763882 37.11648,4.423048 40.382824,3.239488 C43.642452,2.058353 47.00627,1.039763 48.713781,1 Z M15.616621,2 C16.144407,2 16.711329,2.034907 17.316283,2.115596 C17.921237,2.196286 18.555799,2.323937 19.220459,2.475229 C21.92437,3.090724 25.040702,4.248187 28,5.609174 C26.220675,6.440962 24.635191,7.222126 22.376991,8.152294 C21.577215,8.481722 20.874237,8.705339 20.102228,9 C19.24933,8.658566 18.397414,8.311851 17.559115,8.011009 C15.198065,7.163738 12.910502,6.503029 10.785945,6.174312 C9.816784,6.024372 8.892852,5.966896 8,5.968807 C8.137569,5.297079 8.520916,4.636895 9.188479,4.055046 C9.462432,3.81627 9.783578,3.596734 10.134167,3.387156 C10.835346,2.968001 11.670578,2.614105 12.600644,2.372477 C13.53071,2.130849 14.554302,2 15.616621,2 Z M51.37672,4.003192 C51.497408,3.9974 51.615228,4.000799 51.722397,4.003192 C52.339764,4.016982 52.932061,4.054702 53.52747,4.085535 C53.516737,4.250744 53.528576,4.415417 53.501866,4.579594 C53.378679,5.336359 53.090192,6.075453 52.682533,6.747961 C52.478723,7.084215 52.236283,7.398919 51.978438,7.694906 C51.462709,8.28688 50.860376,8.785119 50.211751,9.135909 C49.887377,9.311307 49.550221,9.44952 49.213188,9.547625 C48.876155,9.645729 48.537812,9.702834 48.201803,9.712311 C47.503239,9.732016 46.900374,9.641865 46.39673,9.492729 C45.912053,9.349228 45.516807,9.146331 45.206115,8.916328 C45.796609,8.799743 46.255845,8.251664 46.255886,7.585115 C46.255886,6.833966 45.676372,6.22645 44.975678,6.226455 C44.91136,6.226455 44.858186,6.230271 44.796449,6.240179 C44.681046,6.229248 44.55495,6.235589 44.425209,6.253903 C44.06036,6.36978 43.715297,6.773169 43.669865,7.406705 C43.644425,7.760912 43.734593,8.124232 43.925907,8.477165 C44.117221,8.830098 44.413042,9.172514 44.796449,9.465282 C45.179856,9.75805 45.658797,10.009743 46.230282,10.178921 C46.801767,10.3481 47.457234,10.433592 48.214626,10.412227 C48.606595,10.401169 48.99672,10.343968 49.379595,10.233817 C49.762469,10.123666 50.144484,9.962748 50.506178,9.767206 C50.867873,9.571664 51.214615,9.33453 51.543168,9.06729 C51.87172,8.800051 52.181551,8.50048 52.464918,8.17524 C52.748284,7.850001 53.006661,7.504801 53.233043,7.132228 C53.459424,6.759656 53.65418,6.359657 53.809116,5.951978 C53.964052,5.544299 54.072777,5.119944 54.14197,4.689385 C54.172572,4.499082 54.155735,4.306035 54.167574,4.112983 C55.10821,4.184655 56.000423,4.302776 56.727991,4.552146 C57.395174,4.780818 57.931141,5.110335 58.31545,5.56771 C58.699758,6.025085 58.940519,6.621346 58.99398,7.461601 C59.019585,7.864476 58.9626,8.24306 58.840355,8.614403 C58.718111,8.985746 58.528312,9.342 58.277064,9.684863 C58.025815,10.027726 57.712379,10.355627 57.355314,10.659256 C56.998248,10.962884 56.598127,11.242978 56.164699,11.49641 C55.297845,12.003279 54.306165,12.405429 53.322637,12.662937 C52.339109,12.920444 51.360948,13.031553 50.519001,12.992309 C49.68029,12.953219 48.483039,12.717538 47.07522,12.333564 C45.6674,11.949591 44.053764,11.420097 42.389657,10.796494 C40.587697,10.121224 38.749727,9.340919 37,8.518336 C38.522158,7.9192 40.50687,7.114179 43.183386,6.171559 C46.290503,5.077284 49.566239,4.090112 51.37672,4.003192 Z M8,7.000201 C10.674044,6.985696 13.830877,7.758297 17.185455,8.932411 C17.780892,9.140824 18.395031,9.390951 19,9.621608 C18.432834,9.824649 17.788341,10.084669 17.273034,10.249268 C16.681241,10.438297 16.164212,10.582572 15.671211,10.70463 C15.074012,10.808533 14.277705,11 13.931751,11 C12.508371,11 10.981874,10.501187 9.839574,9.720064 C8.763509,8.984235 8.080011,8.009038 8,7.000201 Z M7.677868,7 C7.718876,7.723961 7.914548,8.414244 8.268541,9.038405 C8.661653,9.731632 9.21703,10.355169 9.860793,10.870015 C10.504555,11.38486 11.251331,11.80718 12.030857,12.096012 C12.810382,12.384844 13.62508,12.539143 14.432095,12.539143 C15.269146,12.539143 16.561767,12.256116 18.117365,11.815362 C19.042433,11.55326 20.136011,11.162675 21.186322,10.810931 C21.24241,10.837353 21.297102,10.858212 21.353231,10.884786 C22.56893,11.46029 23.779206,12.121446 25,12.745938 C24.162044,13.17237 23.840143,13.363599 22.906981,13.794682 C19.263745,15.477637 15.050998,17 11.363138,17 C10.435318,17 9.574434,16.927459 8.782171,16.807976 C7.989908,16.688494 7.261252,16.517098 6.599246,16.305761 C5.275109,15.883087 4.211198,15.305286 3.3762,14.680945 C2.958681,14.368778 2.600456,14.056473 2.297579,13.735598 C1.994702,13.414724 1.745817,13.090361 1.552816,12.790251 C1.166813,12.190027 1.000603,11.656194 1.000685,11.37223 C1.000685,10.945628 0.987413,10.482328 1.077729,10.028065 C1.168046,9.573802 1.36454,9.126951 1.771129,8.698671 C1.974362,8.484531 2.239559,8.273255 2.580075,8.078287 C3.261106,7.688355 4.242056,7.360168 5.661851,7.162482 C6.239417,7.082061 6.948514,7.030667 7.677868,7 Z M30.246928,7 C30.819808,7.267895 31.434921,7.521553 31.975327,7.795455 C32.276167,7.947971 32.676997,8.096895 33,8.25 C30.491433,9.187215 28.162776,10.072913 25.493814,11 C24.326404,10.518749 23.169543,10.029825 22,9.579545 C22.36488,9.478196 22.682391,9.412211 23.049365,9.306818 C25.917795,8.483058 28.512249,7.627269 30.246928,7 Z" id="Shape-Copy-3"></path>
                </g>
            </g>
        </svg>
      </div>
      <div class="jobs__label">${name}</div>
      <div class="jobs__price">${price} ${price && '<span>руб.</span>'}</div>
    `;
    block.onclick = () => {
      const options = {
        dynamic: true,
        dynamicEl: Array.from({length: qty}).fill(0).map((_, i) => ({
          src: `${folder}/${i+1}.jpg`,
          thumb: `${folder}/${i+1}.jpg`
        }))
      };
      if (video) options.dynamicEl.push({ src: `/images/video/${video}`, poster: `/images/video/${video}` })
      lightGallery(block, options);
      block.addEventListener('onBeforeSlide', e => {
        const thumbs = [...document.querySelectorAll('.lg-thumb img')];
        if (thumbs.length > 0) thumbs.forEach(img => img.getAttribute('src') === 'undefined' && img.setAttribute('src', '/images/video.jpg'))
      });
      block.addEventListener('onSlideItemLoad', e => {
        const video = document.querySelector('.lg-video img');
        if (video) video.outerHTML = video.outerHTML.replace(/(<\/?)img/g, '$1video autoplay loop')
      });
    }
    mount.appendChild(block);
  };

  makeBlock('Brogue Black Navy', '25 000', '/images/models/brogi_1 3', 'brogs' , '')
  makeBlock('Derby Captoe', '27 000', '/images/models/derbi_1 3', 'derbi' , '')
  makeBlock('Loafer Brown Tassels', '23 000', '/images/models/lofers_1 3', 'lofers' , '')
  makeBlock('Oxford Brown Painted', '25 000', '/images/models/oxfords_1 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Tassels Black Croco', '20 000', '/images/models/slippers_1 3', 'slippers' , '')
  makeBlock('Wholecut Brown Calf Suede', '28 000', '/images/models/howlcuts_1 3', 'howlcuts' , '', '')
  makeBlock('Single Monk Black Leather', '25 000', '/images/models/single_1 3', 'single' , '')
  makeBlock('Double Monk Calf Black Nav', '25 000', '/images/models/double_1 3', 'double' , '')
  makeBlock('Loafer Mask Navy Painted Calf', '23 000', '/images/models/lofers_18 3', 'lofers' , '')
  //SECTOR 2
  makeBlock('Brogue Calf Black', '25 000', '/images/models/brogi_2 3', 'brogs' , '')
  makeBlock('Derby Punched', '25 000', '/images/models/derbi_2 3', 'derbi' , '')
  makeBlock('Loafer Mask Calf Brown', '23 000', '/images/models/lofers_2 3', 'lofers' , '')
  makeBlock('Oxford Polished Calf', '27 000', '/images/models/oxfords_2 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Grey Velvet', '20 000', '/images/models/slippers_2 3', 'slippers' , '')
  makeBlock('Wholecut Calf Burgundy', '28 000', '/images/models/howlcuts_2 3', 'howlcuts' , '')
  makeBlock('Single Monk Florantic Cognac', '27 000', '/images/models/single_2 3', 'single' , '')
  makeBlock('Double Monk Black Polished', '25 000', '/images/models/double_2 3', 'double' , '')
  makeBlock('Belgian Slipper Taupe Suede Tassels', '20 000', '/images/models/slippers_16 3', 'slippers' , '')
  //SECTOR 3
  makeBlock('Brogue Brown', '27 000', '/images/models/brogi_3 3', 'brogs' , '')
  makeBlock('Derby Suede Brown', '25 000', '/images/models/derbi_3 3', 'derbi' , '')
  makeBlock('Loafer Navy Pebblegrain', '23 000', '/images/models/lofers_3 3', 'lofers' , '')
  makeBlock('Oxford Monti Black', '25 000', '/images/models/oxfords_3 3', 'oxfords' , '')
  makeBlock('Belgian Sneaker Tassels Grey Calf Suede', '20 000', '/images/models/slippers_3 3', 'slippers' , '')
  makeBlock('Whole Cut Lux Suede Dark Brown', '28 000', '/images/models/howlcuts_3 3', 'howlcuts' , '')
  makeBlock('Single Monk Golf Black And Brown', '27 000', '/images/models/single_3 3', 'single' , '')
  makeBlock('Double Monk Calf Burgundy', '25 000', '/images/models/double_3 7', 'double' , '')
  makeBlock('Loafer Polished Black Calf Bit Metal', '23 000', '/images/models/lofers_19 3', 'lofers' , '')
  //SECTOR 4
  makeBlock('Brogue Pebblegrain Navy', '27 000', '/images/models/brogi_4 3', 'brogs' , '')
  makeBlock('Derby Brown', '27 000', '/images/models/derbi_4 3', 'derbi' , '')
  makeBlock('Loafer Bit Oxblood', '23 000', '/images/models/lofers_4 3', 'lofers' , '')
  makeBlock('Oxford Burgundy', '25 000', '/images/models/oxfords_4 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Wool Blackwatch', '20 000', '/images/models/slippers_4 3', 'slippers' , '')
  makeBlock('Whole Cut Plum', '28 000', '/images/models/howlcuts_4 3', 'howlcuts' , '')
  makeBlock('Single Monk Brown', '27 000', '/images/models/single_4 3', 'single' , '')
  makeBlock('Double Monk Brown Painted', '27 000', '/images/models/double_4 6', 'double' , '')
  makeBlock('Double Monk Brown Cap Toe', '27 000', '/images/models/double_17 3', 'double' , '')
  //SECTOR 5
  makeBlock('Brogue Brown Herringbone', '27 000', '/images/models/brogi_5 3', 'brogs' , '')
  makeBlock('Derby Punched Calf Brown', '25 000', '/images/models/derbi_5 3', 'derbi' , '')
  makeBlock('Loafer Bit', '23 000', '/images/models/lofers_5 3', 'lofers' , '')
  makeBlock('Oxford Flannel Dark Grey Tartan Green', '27 000', '/images/models/oxfords_5 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Brown Suede', '20 000', '/images/models/slippers_5 3', 'slippers' , '')
  makeBlock('Wholecut Crust Patina Brown Papiro', '28 000', '/images/models/howlcuts_5 3', 'howlcuts' , '')
  makeBlock('Single Monk Painted Calf Lux Suede', '27 000', '/images/models/single_5 3', 'single' , '')
  makeBlock('Double Monk Navy Painted Calf Sportwedge', '25 000', '/images/models/double_5 3', 'double' , '')
  makeBlock('Chukka Lux Suede Navy', '20 000', '/images/models/slippers_18 3', 'slippers' , '')
  //SECTOR 6
  makeBlock('Brogue Pebblegrain', '25 000', '/images/models/brogi_6 3', 'brogs' , '')
  makeBlock('Derby Suede Brown 2', '25 000', '/images/models/derbi_6 4', 'derbi' , '')
  makeBlock('Loafer Brown', '23 000', '/images/models/lofers_6 3', 'lofers' , '')
  makeBlock('Oxford Pebblggrain Cognac', '27 000', '/images/models/oxfords_6 3', 'oxfords' , '')
  makeBlock('Belgian Sneaker Croco Cuero', '20 000', '/images/models/slippers_6 3', 'slippers' , '')
  makeBlock('Wholecut Basco Miel', '28 000', '/images/models/howlcuts_6 3', 'howlcuts' , '')
  makeBlock('Single Monk Brown Croco Calf', '25 000', '/images/models/single_6 3', 'single' , '')
  makeBlock('Double Monk Pebblegrain Herring', '27 000', '/images/models/double_6 3', 'double' , '')
  makeBlock('Loafer Bit Pebblegrain Navy', '23 000', '/images/models/lofers_20 3', 'lofers' , '')
  //SECTOR 7
  makeBlock('Brogue Navy Painted', '25 000', '/images/models/brogi_7 3', 'brogs' , '')
  makeBlock('Derby Captoe Run', '25 000', '/images/models/derbi_7 3', 'derbi' , '')
  makeBlock('Loafer Burgundy Mask', '23 000', '/images/models/lofers_7 3', 'lofers' , '')
  makeBlock('Oxford Brown Frannel And Tbrown Tweed', '25 000', '/images/models/oxfords_7 3', 'oxfords' , '', 'oxford-grey.mp4')
  makeBlock('Belgian Sneaker Ice Linen', '20 000', '/images/models/slippers_7 3', 'slippers' , '')
  makeBlock('Wholecut Cut Monti', '28 000', '/images/models/howlcuts_7 3', 'howlcuts' , '')
  makeBlock('Single Monk Basco Grey', '25 000', '/images/models/single_7 2', 'single' , '')
  makeBlock('Double Monk Brown Croco', '27 000', '/images/models/double_7 3', 'double' , '')
  makeBlock('Loafer Monti Flannel Dark Grey Croco', '25 000', '/images/models/lofers_21 3', 'lofers' , '')
  //SECTOR 8
  makeBlock('Brogue Brown Leather', '27 000', '/images/models/brogi_8 3', 'brogs' , '')
  makeBlock('Derby Calf Running', '25 000', '/images/models/derbi_8 3', 'derbi' , '')
  makeBlock('Loafer Tassels Navy Brown Painted Calf', '23 000', '/images/models/lofers_8 3', 'lofers' , '')
  makeBlock('Oxford Monti Lux Suede Painted Calf Medbrown', '27 000', '/images/models/oxfords_8 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Grey Wool Flannel', '20 000', '/images/models/slippers_8 3', 'slippers' , '')
  makeBlock('Wholecut Patina Running Sole', '28 000', '/images/models/howlcuts_8 3', 'howlcuts' , '')
  makeBlock('Single Monk Сalf Brown', '27 000', '/images/models/single_8 3', 'single' , '', 'single-monk-calf.mp4')
  makeBlock('Double Monk Box Сalf Black And', '25 000', '/images/models/double_8 3', 'double' , '')
  makeBlock('Loafer Nailhead Croco Tassels', '23 000', '/images/models/lofers_22 3', 'lofers' , '')
  //SECTOR 9
  makeBlock('Brogue Navy', '25 000', '/images/models/brogi_9 3', 'brogs' , '')
  makeBlock('Derby Crust Patina', '25 000', '/images/models/derbi_9 3', 'derbi' , '')
  makeBlock('Loafer Patent Leather Beige', '23 000', '/images/models/lofers_9 1', 'lofers' , '')
  makeBlock('Oxford Painted Calf Med Brown Flannel Brown', '27 000', '/images/models/oxfords_9 3', 'oxfords' , '')
  makeBlock('Belgian Tassels Beige And Navy Kid Suede', '20 000', '/images/models/slippers_9 3', 'slippers' , '')
  makeBlock('Brogue Calf Cognac', '25 000', '/images/models/brogi_21 5', 'brogs' , '')
  makeBlock('Single Monk Painted Calf Navy Lux Suede', '27 000', '/images/models/single_9 3', 'single' , '')
  makeBlock('Double Monk Jeans and Painted Calf', '27 000', '/images/models/double_9 3', 'double' , '')
  makeBlock('Loafer Mask Med Brown Calf', '23 000', '/images/models/lofers_23 3', 'lofers' , '')
  //SECTOR 10
  makeBlock('Brogue Pebble Grain', '25 000', '/images/models/brogi_10 3', 'brogs' , '')
  makeBlock('Derby Ppunched Suede Green', '27 000', '/images/models/derbi_10 2', 'derbi' , '')
  makeBlock('Loafer Navy', '23 000', '/images/models/lofers_10 1', 'lofers' , '')
  makeBlock('Oxford Golf Three Tonen', '25 000', '/images/models/oxfords_10 3', 'oxfords' , '')
  makeBlock('Boat Classic Grey Linen', '20 000', '/images/models/slippers_10 3', 'slippers' , '')
  makeBlock('Brogue Box Calf Med Brown', '25 000', '/images/models/brogi_22 3', 'brogs' , '')
  makeBlock('Single Monk Painted Calf Brown', '27 000', '/images/models/single_10 3', 'single' , '')
  makeBlock('Double Monk Calf Black', '27 000', '/images/models/double_10 3', 'double' , '')
  makeBlock('Chukka Lux Suede Dark Brown', '20 000', '/images/models/slippers_19 3', 'slippers' , '')
  //SECTOR 11
  makeBlock('Brogue Calf Brown', '25 000', '/images/models/brogi_11 4', 'brogs' , '')
  makeBlock('Brogue Calf Cognac', '25 000', '/images/models/brogi_16 3', 'brogs' , '')
  makeBlock('Loafer Lux Suede Med Brown', '23 000', '/images/models/lofers_11 3', 'lofers' , '')
  makeBlock('Oxford Florantic Med Brown Lux Suede Dark Brown', '25 000', '/images/models/oxfords_11 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Tartan Navy Red', '20 000', '/images/models/slippers_11 3', 'slippers' , '')
  makeBlock('Brogue Box Calf Navy Lux Suede Grey', '27 000', '/images/models/brogi_23 3', 'brogs' , '')
  makeBlock('Single Monk Crust Patina Denim Regular Medium', '25 000', '/images/models/single_11 3', 'single' , '')
  makeBlock('Double Monk Suede Brown', '25 000', '/images/models/double_11 3', 'double' , '')
  makeBlock('Belgian Sneaker Grey Suede', '20 000', '/images/models/slippers_20 3', 'slippers' , '')
  //SECTOR 12
  makeBlock('Brogue Navy Beige', '27 000', '/images/models/brogi_12 3', 'brogs' , '')
  makeBlock('Brogue Suede Ivory Brown', '27 000', '/images/models/brogi_17 3', 'brogs' , '')
  makeBlock('Loafer Mask Croco Brown', '23 000', '/images/models/lofers_12 3', 'lofers' , '')
  makeBlock('Oxford Polished Calf Green', '25 000', '/images/models/oxfords_12 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Beige-Tan Kid Suede', '20 000', '/images/models/slippers_12 3', 'slippers' , '')
  makeBlock('Brogue Crust Patina Gray Regular Medium', '25 000', '/images/models/brogi_24 3', 'brogs' , '')
  makeBlock('Single Monk Painted Boxcalf Dark And Med', '25 000', '/images/models/single_12 2', 'single' , '')
  makeBlock('Double Monk Daux Croco Brown Crust Patina', '25 000', '/images/models/double_12 3', 'double' , '')
  makeBlock('Doublemonk Box Calf Med Brown', '25 000', '/images/models/double_18 3', 'double' , '')
  //SECTOR 13
  makeBlock('Brogue Golf Boxcalf', '27 000', '/images/models/brogi_13 3', 'brogs' , '')
  makeBlock('Brogue Brown Painted Calf', '25 000', '/images/models/brogi_18 3', 'brogs' , '')
  makeBlock('Loafer Tassels Oxblood', '23 000', '/images/models/lofers_13 3', 'lofers' , '')
  makeBlock('Oxford Lux Suede Camel', '27 000', '/images/models/oxfords_13 3', 'oxfords' , '')
  makeBlock('Belgian Slipper Black Velvet And Gold', '20 000', '/images/models/slippers_13 3', 'slippers' , '')
  makeBlock('Brogue Painted- Calf Cognac Croco Brown', '25 000', '/images/models/brogi_25 3', 'brogs' , '')
  makeBlock('Single Monk Florantic Green Camo', '27 000', '/images/models/single_13 3', 'single' , '')
  makeBlock('Double Monk Cognac Painted Calf', '25 000', '/images/models/double_13 3', 'double' , '')
  makeBlock('Chukka Navy Calf Suede Crepe', '20 000', '/images/models/slippers_21 3', 'slippers' , '')
  //SECTOR 14
  makeBlock('Brogue Florantic+ Lux Suede', '27 000', '/images/models/brogi_14 3', 'brogs' , '')
  makeBlock('Brogue Suede Brown', '27 000', '/images/models/brogi_19 3', 'brogs' , '')
  makeBlock('Loafer Tan Leather Tassels Brown Suede', '23 000', '/images/models/lofers_14 3', 'lofers' , '')
  makeBlock('Loafer Dark Brown Puma Leather', '23 000', '/images/models/lofers_16 3', 'lofers' , '')
  makeBlock('Boat Classic Khaki Linen Laces Navy', '20 000', '/images/models/slippers_14 3', 'slippers' , '')
  makeBlock('Brogue Lux Suede Dark Brown', '27 000', '/images/models/brogi_26 3', 'brogs' , '')
  makeBlock('Single Monk Painted Calf And Lux Luede', '25 000', '/images/models/single_14 3', 'single' , '')
  makeBlock('Double Monk Cognac Patina', '25 000', '/images/models/double_14 3', 'double' , '')
  makeBlock('Belgian Slipper Navy Pebble Grain', '20 000', '/images/models/slippers_22 3', 'slippers' , '')
  //SECTOR 15
  makeBlock('Brogue Suede Navy Brown', '27 000', '/images/models/brogi_15 3', 'brogs' , '')
  makeBlock('Brogue Pebblegrain', '25 000', '/images/models/brogi_20 3', 'brogs' , '')
  makeBlock('Loafer Painted Calf Burgundy', '23 000', '/images/models/lofers_15 3', 'lofers' , '')
  makeBlock('Loafer Kid Suede Brown Mask', '23 000', '/images/models/lofers_17 3', 'lofers' , '')
  makeBlock('Belgian Sneaker White Croco And Houndstood', '20 000', '/images/models/slippers_15 3', 'slippers' , '')
  makeBlock('Brogue Running Sole', '25 000', '/images/models/brogi_27 3', 'brogs' , '')
  makeBlock('Double Monk Patina Cognac Monti', '25 000', '/images/models/double_15 3', 'double' , '')
  makeBlock('Double Monk Suede Running Sole', '25 000', '/images/models/double_16 3', 'double' , '')
  makeBlock('Double Monk Florantic Green', '25 000', '/images/models/double_19 3', 'double' , '')
})();

(()=>{
  const block = document.querySelector('.jobs__blocks');
  const templates = [...document.querySelector('.jobs__blocks_template').children];
  const button = document.querySelector('.jobs__button');
  let filtered = [...templates];
  const addNine = () => {
    filtered.splice(0, 9).forEach(el => block.appendChild(el));
    [...document.querySelectorAll('.jobs__blocks .jobs__image.lg')].forEach(block => {
      const images = [...block.querySelectorAll('img')];
      images.forEach(img => img.setAttribute('src', img.dataset.src));
    });
  }
  button.onclick = addNine;
  addNine();

  const sortJobs = function(){
    const groups = document.querySelectorAll('.jobs__group')
    groups.forEach( button => button.onclick = e => {
      groups.forEach(e=> e.classList.remove('jobs__group_active'))
      e.target.classList.add('jobs__group_active')
      const blocks = document.querySelectorAll('.jobs__block');
      block.innerHTML = '';
      if (e.target.dataset.category == 'all') return (filtered = [...templates], addNine());
      filtered = templates.filter(b => b.dataset.category == e.target.dataset.category);
      addNine()
    })
  }
  sortJobs()

  const sortJobsOpt = function(){
    const select = document.querySelector('.jobs__oselect').onchange = e => {
      const blocks = document.querySelectorAll('.jobs__block');
      const value = e.target.selectedOptions[0].value;
      const text = e.target.selectedOptions[0].textContent;
      document.querySelector('.jobs__select').childNodes[0].textContent = text;
      block.innerHTML = '';
      if (value == 'all') return (filtered = [...templates], addNine());
      filtered = templates.filter(b => b.dataset.category == value);
      addNine()
    }
  }
  sortJobsOpt()
})();
