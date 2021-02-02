'use strict'
function Slider(selector) {
  const slider = document.querySelector(selector)
  const items = document.querySelectorAll(`${selector}__item` || `${selector} li`)
  const prev = document.querySelector(`${selector}__prev`)
  const next = document.querySelector(`${selector}__next`)
  let scroll = slider.scrollWidth / items.length
  let viewSlide = 0

  function nextSlide() {
    next.addEventListener('click', () => {
      if (viewSlide < items.length - 1) {
        viewSlide++
      } else {
        viewSlide = 0
      }
      slider.style.transform = `translateX(-${viewSlide * scroll}px)`
    })
  }
  nextSlide()

  function prevSlide() {
    prev.addEventListener('click', () => {
      if (viewSlide > 0) {
        viewSlide--
      } else {
        viewSlide = items.length - 1
      }
      slider.style.transform = `translateX(-${viewSlide * scroll}px)`
    })
  }
	prevSlide()
	
  window.addEventListener('resize', () => {
		scroll = slider.scrollWidth / items.length
		slider.style.transform = `translateX(-${viewSlide * scroll}px)`
		
  })
};

const slider = new Slider('.slider');
