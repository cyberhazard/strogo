const sketchSlider = () => {
  const input = document.querySelector('.sketches__input');
  const circle = document.querySelector('.sketches__button_mini');
  const wrapper = document.querySelector('.sketches__blocks');
  const left = document.querySelector('.sketches__button.sketches__button_left');
  const right = document.querySelector('.sketches__button.sketches__button_right');
  const margin = parseInt(getComputedStyle(wrapper.children[0]).marginRight);
  const offset = wrapper.children[0].clientWidth + margin;
  const width = wrapper.scrollWidth - offset;
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


window.onresize = sketchSlider
sketchSlider();


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
