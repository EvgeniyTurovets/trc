(function() {
    // сладер на главной
    const swiper = new Swiper('.first-sec-slider', {
        navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        },

        on: {
          init: function (event) {
           this.$el[0].querySelector('.swiper-count').querySelector('.max').textContent = event.slides.length
          },
        },
    });
    swiper.on('slideChange', function (event) {
      this.$el[0].querySelector('.swiper-count').querySelector('.now').textContent = event.realIndex + 1
    });
    
    // меню 
    let headerNav = document.getElementById('headerNav')
    let headerTop =  document.getElementById('headerTop') 
    let headerBot =  document.getElementById('headerBot') 
    let mobNav = document.getElementById('mob-nav')
    let headerBotRight = document.querySelector('.header__bot__right')

    function navRefresh(){
      if(window.innerWidth < 992){
        mobNav.appendChild(headerNav)
        mobNav.appendChild(headerTop)
      }else{
        headerBotRight.appendChild(headerNav)
        document.getElementById('header-wrap').insertBefore(headerTop, headerBot)
      }
    }

    window.addEventListener('resize', () => {
      navRefresh()
    })

    navRefresh()


    // меню кнопка
    let menuBtn = document.getElementById('menuBtn')

    menuBtn.addEventListener('click', () =>{
        menuBtn.classList.toggle('active')
        mobNav.classList.toggle('active')
    })
   
    



    let sliderCount = document.querySelectorAll('.swiper-section')
    let options = {
        init: false,
        navigation: {
              nextEl: '.swiper-button-next2',
              prevEl: '.swiper-button-prev2',
        },
        spaceBetween: 23,
        lazy: true,
        slidesPerView: 1,
        breakpoints: {
            // when window width is >= 320px
            560: {
                slidesPerView: 2,
                spaceBetween: 23
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 23
            },
            
        },
        on: {
            init: function (event) {
             this.$el[0].querySelector('.swiper-count').querySelector('.max').textContent = event.slides.length
            },
        },
    }
    for(let i = 0; i < sliderCount.length; i++){
        mySwiper = new Swiper(sliderCount[i], options);
        mySwiper.init();

        mySwiper.on('slideChange', function (event) {
            this.$el[0].querySelector('.swiper-count').querySelector('.now').textContent = event.realIndex + 1
        });
    }
    // табы на главной всегда нужно после слайдеров запускать а то ломаются
    let tabsNavs = document.querySelectorAll('.tabs-nav')
    tabsNavs.forEach(function(el,index){
        el.setAttribute('data-index', index)
    })

    let tabsItems = document.querySelectorAll('.tabs-item')
    tabsItems.forEach(function(el,index){
        el.style.display = 'none';
    })

    tabsNavs.forEach(nav => nav.addEventListener('click', () =>{
        if(!nav.classList.contains('active')){
            thisTabsNav = nav.closest('.tabs').querySelectorAll('.tabs-nav')
            thisTabsNav.forEach(function(el, index) {
                el.classList.remove('active')
            });

            nav.classList.add('active')

            let thisTabsItem = nav.closest('.tabs').querySelectorAll('.tabs-item')
            thisTabsItem.forEach(function(el,index){
                el.classList.remove('active')
            })

            thisAttr = nav.getAttribute('data-index')
            tabsItems[thisAttr].classList.add('active')
        }
    }))
})();