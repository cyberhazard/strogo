/**
 * Пост запрос формы обратной связи
 */
var sendMail = function sendMail(selector) {
  return fetch('/mail.php', {
    method: 'POST',
    body: new FormData(document.querySelector(selector))
  }).catch(function (error) {
    alertify.error("Ошибка. Повторите отправку позже");
  });
};




// SVG line width fix

[...document.querySelectorAll('.sketch__sketch svg')]
  .forEach(
    (svg, i) => [0,1].includes(i)
      ? [...svg.querySelectorAll('path')].forEach(path=>path.style.strokeWidth = 2)
      : i==6
        ? [...svg.querySelectorAll('path')].forEach(path=>path.style.strokeWidth = 2)
        :''
  );


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

[...document.querySelectorAll('.jobs__image.lg')].forEach(block => new lightGallery(block, { thumbnail: true, addClass: 'custom-gallery' }));


(()=>{
  const block = document.querySelector('.jobs__blocks');
  const templates = [...document.querySelector('.jobs__blocks_template').children];
  const button = document.querySelector('.jobs__button');
  let filtered = [...templates];
  const addNine = () => filtered.splice(0, 9).forEach(el => block.appendChild(el))
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

(()=>{
  const block = document.querySelector('.works__images');
  const templates = [...document.querySelector('.works__images_template').children];
  const button = document.querySelector('#more-works');
  const addNine = () => (templates.splice(0, 9).forEach(el => block.appendChild(el)),
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
      new Inputmask("+7 (999) 999-99-99").mask(el)
    )
  },
  cssClass: ['custom-class-1', 'custom-class-2']
});

/**
 * отправка модалки
 */

const callBackFormSend = () => {
  var submit = document.querySelector('#call-submit')
  var checkbox = document.querySelector('#modal-checkbox')
  var form = document.querySelector('.call__form');
  document.querySelector('.call__form').onsubmit = function(e){
    e.preventDefault();
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
const politic = `<div style="color: black; font-size: 2rem;">
<h1>Политика конфиденциальности</h1>
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
  const close = document.querySelector('.mob-menu__close');
  const menu = document.querySelector('.mob-menu');
  const items = [...document.querySelectorAll('.mob-menu__item')];
  items.forEach(el => el.onclick = () => menu.style.bottom = '');
  hamburger.onclick = () => menu.style.bottom = 0;
  close.onclick = () => menu.style.bottom = '';
}
mobileMenu();

// Input Masks
[...document.querySelectorAll('input[type="tel"]')].forEach(el =>
  new Inputmask("+7 (999) 999-99-99").mask(el)
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
    if(!checkbox.checked){
      alertify.error("Вы не приняли соглашение об обработке персональных данных");
    } else {
      sendMail("#footerform").then(_ => (alertify.success("Ваша заявка отправленна"), document.getElementById('footerform').reset()))
    }
  }
}
footerForm();

