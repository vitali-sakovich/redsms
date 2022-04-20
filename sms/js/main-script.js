// прелоадер
(() => {
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 300);
  });
})();

(() => {
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  if (!content.hasAttribute('data-content')) {
    return;
  }
  header.classList.add('header_' + content.dataset.content);
})();

$(document).ready(function () {
  // табы
  $('.tabs__btn').on('click', 'div:not(.active)', function () {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .closest('div.tabs')
      .find('div.tab-content')
      .removeClass('active')
      .eq($(this).index())
      .addClass('active');
  });

  // маска телефона
  jQuery(function ($) {
    $.mask.definitions['~'] = '[1,2,3,4,5,6,8,9]';
    $('.phone_validate').mask('+7 (~99) 999-99-99');
  });

  // input phone
  $(document).on('keypress', function (evt) {
    if (evt.isDefaultPrevented()) {
      // Assume that's because of maskedInput
      // See https://github.com/guillaumepotier/Parsley.js/issues/1076
      $(evt.target).trigger('input');
    }
  });

  //   placeholder
  $('.input, .textarea').on('focusin', function () {
    $(this).addClass('is-active');
  });
  $('.input, .textarea').on('focusout', function () {
    if (!$(this).val()) {
      $(this).removeClass('is-active');
    }
  });

  // изменение картинок на списке услуг
  (() => {
    const services = document.querySelector('.services__list');
    const servicesImg = document.querySelector('.services__bg-phone img');
    let selectedTd;

    if (!services) return;

    services.addEventListener('mouseover', (event) => {
      let target = event.target;

      while (target != this) {
        if (target.classList.contains('service__item')) {
          addClass(target);
          return;
        }
        target = target.parentNode;
      }
    });

    function addClass(node) {
      if (selectedTd) {
        selectedTd.classList.remove('active');
      }
      selectedTd = node;
      selectedTd.classList.add('active');
      servicesImg.src = selectedTd.dataset.src;
    }
  })();

  // спойлер
  (() => {
    const spoiler = document.querySelector('.js-spoiler');
    const textHidden = document.querySelector('.desc-text_hidden');
    if (!spoiler) return;
    spoiler.addEventListener('click', () => {
      textHidden.style.display = 'block';
      spoiler.remove();
    });
  })();

  // Кнопка «Наверх»
  (() => {
    const btnUp = document.querySelector('.btn-up');

    btnUp.addEventListener('click', backToTop);

    function backToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
      }
    }
  })();

  // меню
  (() => {
    const menu = document.querySelector('.menu');
    const header = document.querySelector('.header');
    const content = document.querySelector('.content');
    const dropdownBtn = document.querySelectorAll('.js-dropdown-btn');
    let itemMenu;

    menu.addEventListener('mouseover', (event) => {
      let target = event.target;

      while (target != this) {
        if (target.classList.contains('js-dropdown-btn')) {
          addClass(target);
          return;
        }
        target = target.parentNode;
      }
    });

    function addClass(node) {
      if (itemMenu) {
        itemMenu.classList.remove('active');
      }
      itemMenu = node;
      itemMenu.classList.add('active');
      if (header.classList.contains('header_home') && window.innerWidth > 900) {
        header.classList.remove('header_home');
      }
    }

    content.addEventListener('mouseover', () => {
      dropdownBtn.forEach((dropdownBtnItem) => {
        if (dropdownBtnItem.classList.contains('active')) {
          dropdownBtnItem.classList.remove('active');
        }
        if (content.classList.contains('content_home')) {
          header.classList.add('header_home');
        }
      });
    });
  })();

  // очистка форм
  (() => {
    // очистка инпута
    function clearInput(clearInput) {
      const input = clearInput.querySelector('.input');
      const textarea = clearInput.querySelector('.textarea');
      const clearBtn = clearInput.querySelector('.clear-input');

      if (!clearBtn) {
        return;
      }

      clearBtn.addEventListener('click', function (e) {
        if (input) {
          input.value = '';
        }
        if (textarea) {
          textarea.value = '';
        }
      });
    }
    const label = document.querySelectorAll('.label');
    label.forEach(clearInput);
  })();

  // Закратие модалок на Esc
  (() => {
    document.addEventListener('keydown', ESCclose);
    function ESCclose(evt) {
      if (evt.keyCode == 27) {
        //window.close();
        const modalEsc = document.querySelectorAll('.modal');
        modalEsc.forEach(function (modalEscIttem) {
          modalEscIttem.classList.remove('open');
          document.body.classList.remove('hidden');
          window.setTimeout(function () {
            modalEscIttem.style.display = 'none';
          }, 300);
        });
      }
    }
  })();

  // закрытие модалок
  function modal(modal) {
    const overlay = modal.querySelector('.overlay');
    const closeModal = modal.querySelector('.close-modal');

    if (!overlay) {
      return;
    }
    closeModal.addEventListener('click', modalHidden);
    overlay.addEventListener('click', modalHidden);

    function modalHidden() {
      modal.classList.remove('open');
      document.body.classList.remove('hidden');
      window.setTimeout(function () {
        modal.style.display = 'none';
      }, 300);
    }
  }
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal);

  // фокусировка табом
  function formTab() {
    const formModal = document.querySelectorAll('.modal form');
    formModal.forEach(function (formModalItem) {
      let lastElem = formModalItem.querySelector('.last-elem');
      let firstElem = formModalItem.querySelector('.first-elem');

      if (!lastElem || !firstElem) {
        return;
      }

      lastElem.onkeydown = function (e) {
        if (e.key == 'Tab' && !e.shiftKey) {
          firstElem.focus();
          return false;
        }
      };

      firstElem.onkeydown = function (e) {
        if (e.key == 'Tab' && e.shiftKey) {
          lastElem.focus();
          return false;
        }
      };
      firstElem.focus();
    });
  }

  // открытие модалок
  function openModal(modal) {
    modal.style.display = 'block';
    formTab();
    document.body.classList.add('hidden');
    modal.classList.add('open');
  }

  // global click events
  const globalClickHandlers = {
    'js-open-modal': (node) =>
      openModal(document.querySelector(node.dataset.openModal)),
  };
  document.addEventListener('click', function (e) {
    var foundNodes = [];
    var checkRecursive = (target) => {
      if (target === document || target == undefined) {
        return false;
      }
      var cl = target.classList;

      if (cl === undefined) {
        return false;
      }
      var contains = false;
      for (var c of Object.keys(globalClickHandlers)) {
        if (cl.contains(c)) {
          contains = true;
          break;
        }
      }
      if (contains) {
        foundNodes.push(target);
      }

      return checkRecursive(target.parentElement);
    };
    checkRecursive(e.target);

    var handlers = Object.entries(globalClickHandlers);
    foundNodes.map((node) => {
      handlers.map(([className, callback]) => {
        if (node.classList.contains(className)) {
          callback(node);
        }
      });
    });
  });

  $(document).ready(() => {
    [...document.querySelectorAll('input')]
      .filter((i) => i.value.trim().length > 0)
      .map((i) => i.classList.add('is-active'));
  });

  // just an end of a file

  (() => {
    const header = document.querySelector('.header');
    const menuMobile = document.querySelector('.header__block');
    const burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
      if (header.classList.contains('active')) {
        header.classList.remove('active');
        document.body.classList.remove('hidden');
        window.setTimeout(function () {
          menuMobile.style.display = 'none';
        }, 300);
      } else {
        menuMobile.style.display = 'flex';
        header.classList.add('active');
        document.body.classList.add('hidden');
      }
    });
  })();

  // Слайдер
  $('.licenses-slider__track').slick({
    dots: false,
    infinite: true,
    arrows: true,
    variableWidth: true,
    prevArrow: $('.licenses-slider__prev'),
    nextArrow: $('.licenses-slider__arrow__next'),
  });

  // скролл к блоку и открывание подменю на странице HTTPS
  (() => {
    const httpsNav = document.querySelector('.https-nav');
    if (!httpsNav) return;
    let selectedBtn;

    httpsNav.addEventListener('click', (event) => {
      let btn = event.target.closest('.https-nav__btn');
      if (!btn) return;
      if (!httpsNav.contains(btn)) return;
      handleButtonClick(btn);
      openSubMenu(btn);
    });

    // скролл к блоку
    function handleButtonClick(btn) {
      if (!btn.hasAttribute('data-id')) return;
      const hiddenElement = document.querySelector('#' + btn.dataset.id);
      if (!hiddenElement) return;
      hiddenElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    // открывание подменю на странице HTTPS
    function openSubMenu(btn) {
      if (btn.hasAttribute('data-id')) return;
      if (selectedBtn) {
        selectedBtn.classList.remove('active');
      }
      selectedBtn = btn;
      selectedBtn.classList.add('active');
    }
  })();

  $(document).ready(function () {
    $('.select-sort').niceSelect();
  });

  (() => {
    const accordionBtn = document.querySelectorAll('.accordion-btn');

    accordionBtn.forEach(function (accordionBtnItem) {
      accordionBtnItem.addEventListener('click', function () {
        accordionBtnItem.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.classList.remove('active');
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          panel.classList.add('active');
        }
      });
    });
  })();

  // parallax
  (() => {
    const boxercontainer = document.querySelector('.first-screen-home__bg');
    if (!boxercontainer) return;
    const planes = boxercontainer.querySelector(
      '.first-screen-home__bg-planes'
    );
    const boxer = boxercontainer.querySelector(
        '.first-screen-home__bg-networks'
      ),
      maxMove = boxercontainer.offsetWidth,
      boxerCenterX = boxer.offsetLeft + boxer.offsetWidth / 2,
      planesCenterX = planes.offsetLeft + planes.offsetWidth / 2,
      fluidboxer = window.matchMedia('(min-width: 1150px)');

    function getMousePos(xRef) {
      let panelRect = boxercontainer.getBoundingClientRect();
      return {
        x:
          (Math.floor(xRef - panelRect.left) /
            (panelRect.right - panelRect.left)) *
          boxercontainer.offsetWidth,
      };
    }

    document.body.addEventListener('mousemove', function (e) {
      let mousePos = getMousePos(e.clientX),
        distX = mousePos.x - boxerCenterX;
      distX2 = mousePos.x - planesCenterX;
      if (fluidboxer.matches) {
        boxer.style.transform =
          'translate(' + (-1 * distX) / 60 + 'px,' + 0 + 'px)';
        planes.style.transform =
          'translate(' + (-1 * distX2) / 12 + 'px,' + 0 + 'px)';
      }
    });
  })();
});

addEventListener('load', () => {
  const nameType = document.querySelectorAll('.name-type .list .option');
  const smsTableFree = document.querySelector('.sms-table-free__wrapper');
  if (!smsTableFree) return;
  const smsTablePaid = document.querySelector('.sms-table-paid__wrapper');
  const tariffsSortLinks = document.querySelector('.tariffs-sort__links');
  const trafficVolume = document.querySelector('.traffic-volume');

  nameType[1].addEventListener('click', () => {
    smsTableFree.style.display = 'none';
    smsTablePaid.style.display = 'block';
    tariffsSortLinks.style.display = 'none';
    trafficVolume.style.display = 'flex';
  });
  nameType[0].addEventListener('click', () => {
    smsTableFree.style.display = 'block';
    smsTablePaid.style.display = 'none';
    tariffsSortLinks.style.display = 'block';
    trafficVolume.style.display = 'none';
  });
});
