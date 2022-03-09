///////////////////////////////////////
/* Общие функции */
///////////////////////////////////////
// Функция определения ширины экрана пользователя
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

// Работа с cookie файлами.
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Функция определения браузера
function userAgent(){
  var ua = detect.parse(navigator.userAgent);
  $('body').addClass(ua.browser.family);
}

// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
  nStr = String(nStr)
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.loading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
	//console.log('preloaded')
}

// Наверх
function toTop() {
  $("#toTop").hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('.toTop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  //LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel
  //LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Показать пароль
function showPass() {
  $('.showPassBlock').on('click', function(event){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    ChangePasswordFieldType(this, $('.sites_client_pass'));
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
    return false;
  });
}

// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}


///////////////////////////////////////
/* Валидаторы */
///////////////////////////////////////
// Валидаторы для Имени
function validName(id){
  var name = $(id).find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
		setTimeout(function () {
			name.addClass('error');
			name.parent().addClass('error');
			name.attr('placeholder','Вы не ввели Имя');
		}, 2000);
    return false;
  }
}

// Валидаторы для телефона
function validPhone(id){
  var phone = $(id).find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(phone.val());
  if(check == true && check != ''){
    phone.removeClass('error');
    phone.parent().removeClass('error');
    phone.attr('placeholder','Введите номер');
    return true;
  }
  else{
		setTimeout(function () {
			phone.addClass('error');
			phone.parent().addClass('error');
			phone.attr('placeholder','Вы не ввели номер');
		}, 2000);
		return false;
  }
}

// Валидаторы для почты
function validEmail(id){
  var email = $(id).find('.form__email');
  var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
  if(check == true && check != ''){
    email.removeClass('error');
    email.parent().removeClass('error');
    email.attr('placeholder','Введите Email');
    return true;
  }else{
		setTimeout(function () {
			email.addClass('error');
			email.parent().addClass('error');
			email.val('');
			email.attr('placeholder','Вы ввели неверный Email');
		}, 2000);
		return false;
  }
}


///////////////////////////////////////
/* Аякс Отправка формы без обновления страницы */
///////////////////////////////////////
function ajaxForms(id,flag,successMessage,errorMessage){
  var flag = false;
  // console.log('ajaxForms loaded ', id)
  var form = $(id).find('.form__callback');
  form.on('submit',function(event){
    event.preventDefault();
    if(!flag){
      t = $(this);
      var url = t.prop('action');
      var formData = t.serializeArray();
      formData.push({name: 'ajax_q', value: 1});
      formData.push({name: 'only_body', value: 1});
      $.ajax({
        method: 'POST',
        cache: false,
        url: url,
        data: formData,
        success: function(d){
          var serverCall = JSON.parse(d).status;
          if(serverCall == "ok"){
						setTimeout(function () {
							$.fancybox.close();
						},2000);
            t.hide();
            t.find('.form__input').val(' ');
            t.parent().append('<div class="form__text">'+ successMessage +'</div>');
						setTimeout(function () {
							t.parent().find('.form__text').remove();
							t.parent().append('<div class="form__text">'+ errorMessage +'</div>');
						},4000);
            // new Noty({
            //   text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">' + successMessage + '</div></div>',
            //   layout:"bottomRight",
            //   type:"success",
            //   easing:"swing",
            //   animation: {
            //     open: 'animated fadeInUp',
            //     close: 'animated fadeOutDown',
            //     easing: 'swing',
            //     speed: 400
            //   },
            //   timeout:"4000",
            //   progressBar:true
            // }).show();
            flag = true;
          }
        }
      });
    }else{
      function callBackError(type) {
        t.find('.form__input').val(' ');
        t.parent().find('.form__text').hide();
        new Noty({
          text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">' + errorMessage + '</div></div>',
          layout:"bottomRight",
          type:"warning",
          easing:"swing",
          animation: {
            open: 'animated fadeInUp',
            close: 'animated fadeOutDown',
            easing: 'swing',
            speed: 400
          },
          timeout:"4000",
          progressBar:true
        }).show();
      }
      callBackError();
    }
  });

  // Валидация при клике
  form.on('submit',function(event){
		validName(form);
		validPhone(form);
		validEmail(form);
  });
}

// "Обратный звонок".
ajaxForms('#viewed-callback','callbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратный звонок" в модальном окне.
ajaxForms('#fancybox__callback','fancyCallbackFlag','Запрос обратного звонка успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')
// "Обратная связь" в модальном окне.
ajaxForms('#fancybox__feedback','fancyFeedbackFlag','Запрос обратной связи успешно отправлен администрации магазина','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Обратная связь".
ajaxForms('.form__feedback','feedbackFlag','Спасибо за обращение! Мы свяжемся с вами в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Подписаться".
ajaxForms('#subscribe','subscribeFlag','Спасибо за обращение! Вы подписались на наши уведомления','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Уведомить" в модальном окне.
ajaxForms('#fancybox__notify','notifyFlag','Вы будете уведомлены о поступлении товара','Вы уже отправляли запрос. Пожалуйста ожидайте.')
// "Обратный звонок".
ajaxForms('.page-сallback','pageCallbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.')


///////////////////////////////////////
/* Действия удаления из ... */
///////////////////////////////////////
// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из Избранного?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.count-favorites').attr('data-count');
    var goodsModId = e.attr('data-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.count-favorites').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__favorites .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.favorites').removeClass("has-items");
          $('.count-favorites').attr('data-count', '0').text('0');
        }
        var obj = $('.add-favorites[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Избранного без обновлении страницы
function removeFromFavoritesAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить Избранное?')){
    // Предзагрузчик анимации
    $('.addto__favorites').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.favorites').removeClass("has-items");
        $('.count-favorites').attr('data-count', '0').text("0");
        $('.addto__favorites .addto__item').remove();
        $('.addto__favorites .preloader').hide();
        $('.add-favorites').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var oldCount = $('.count-compare').attr('data-count');
    var goodsModId = e.attr('data-id');
    $.ajax({
      cache : false,
      url		: href,
      success: function(d){
        var newCount = oldCount - 1;
        $('.count-compare').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__compare .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.compare').removeClass("has-items");
          $('.count-compare').attr('data-count', '0').text('0');
        }
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить сравнение?')){
    // Предзагрузчик анимации
    $('.addto__compare').prepend('<div class="preloader small"><div class="loading"></div></div>');
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.compare').removeClass("has-items");
        $('.count-compare').attr('data-count', '0').text("0");
        $('.addto__compare .addto__item').remove();
        $('.addto__compare .preloader').hide();
        $('.add-compare').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из корзины?')){
    e.parent().parent().parent().fadeOut().remove();
    var href = e.attr('href');
    var qty = e.data('qty');
    var oldCount = $('.count-cart').attr('data-count');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        var newCount = oldCount - qty;
        $('.count-cart').attr('data-count', newCount).text(newCount);
        $('.cartSumNow').html($(d).find('.cartSumNow').html());
        $('.cart__word').html($(d).find('.cart__word').html());
        var flag = 0;
        if(newCount != 0){
          $('.cart .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          })
        }else{
          $('.cart').removeClass("has-items");
          $('.count-cart').attr('data-count', '0').text("0");
          $('.cart .addto__item').remove();
        }
      }
    });
  }
}
// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
    // Предзагрузчик анимации
    $('.cart').prepend('<div class="preloader small"><div class="loading"></div></div>');
    e.parent().fadeOut().remove();
    var href = e.attr('href');
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(d){
        $('.totalSum').html($(d).find('.totalSum').html());
        $('.cart').removeClass("has-items");
        $('.count-cart').attr('data-count', '0').text("0");
        $('.cart .addto__item').remove();
        $('.cart .preloader').hide();
      }
    });
  }
}


///////////////////////////////////////
// Закрытие, Открытие элементов
///////////////////////////////////////
// Функция удаления классов всех активных элементов
// Функция удаления классов всех активных элементов
function closeAll() {
	$('div, a, form, span, nav, ul').removeClass('opened');
	$('.overflowMenu').removeClass('active');
	$('#overlay').click();
	setTimeout(function () {
		$('#overlay').removeClass('transparent');
		$('#overlay').click();
	},100)
}

// Закрытие всего при нажатии на темную часть
$('#overlay').on('click', function(event){
	event.preventDefault();
	if($(this).hasClass('opened')){
		closeAll();
	}
});

// Открытие Контактов, Меню, Сравнения, Избранного
function openMenu() {
  // Открытие элементов
  $('.dropdown__open[data-open]').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    var value = $(this).data('open');
    if ($('.dropdown__content[data-content="'+ value +'"]').hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().removeClass('opened');
      $('.sidebar__links').removeClass('opened');
      $('#overlay').removeClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').removeClass('opened');
    }else{
      $(this).addClass('opened');
      $(this).parent().addClass('opened');
      $('.sidebar__links').addClass('opened');
      $('#overlay').addClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').addClass('opened');
    }
  });

  // Открытие каталога с сохранением вложенности
  $('.catalog__item .open').on('click', function(event){
    event.preventDefault();
    var parent = $(this).closest('.parent');
    var sub = $(this).parent().next('.sub');
    var open = $(this).closest('.open');
    if (parent.hasClass('opened')) {
      sub.slideUp(600);
      parent.removeClass('opened');
      open.removeClass('opened');
    } else {
      sub.slideDown(600);
      parent.addClass('opened');
      open.addClass('opened');
    }
  });

  // Открытие Каталог
  $('.catalog__icon').on('click', function (event){
    event.preventDefault();
		if(getClientWidth() > 639){
			$(this).toggleClass('opened');
			$(this).next().toggleClass('opened');
			$('#overlay').addClass('opened transparent')			
		}else{
			$('.menu__icon').click();
		}
  });

	// Открытие Меню
  $('.menu__icon').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('opened');
		$('.menu__dropdown').toggleClass('opened');
		$('#overlay').toggleClass('opened transparent')
  });

  // Открытие Поиск
  $('.search__icon').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('opened');
		$(this).parent().toggleClass('opened');
		$(this).parent().find('.header__block-hidden').toggleClass('opened');
		$('#overlay').addClass('opened')
		$('.menu__icon').removeClass('opened');
		$('.menu').removeClass('opened');
		$('.menu').find('.header__block-hidden').removeClass('opened');
  });

	$('.footer__menu-icon').on('click', function(){
		$(this).toggleClass('active')
		$('.footer__menu-content').slideToggle();
		$('html, body').animate({scrollTop : jQuery('.footer__menu').offset().top}, 500);
	});

  // Имитация клика по каталогу в меню
  // $('.mainnav__catalog').on('click', function (event){
  //   event.preventDefault();
  //   $('.catalog__icon').click();
  // });
}

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnav(id,rows,media){
	if(getClientWidth() > media){
		var mainnav = $(id);
		var overMenuExist = mainnav.find('.overflowMenu li').length;
		if(overMenuExist){
			mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
			mainnav.find('.mainnav__more').remove();
			mainnav.find('.overflowMenu li').each(function(){
				mainnav.find('.mainnav__list').append($(this));
			});
		}
		var menuHeight = rows;
		var menuWidth = mainnav.width() * menuHeight;
		var menuCount = mainnav.find('.mainnav__list li').length + 1;
		var nextCheck = 0;
		for(var i=1; i < menuCount;  i++){
			var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width()));
			nextCheck += currentWidth;
			if(nextCheck > menuWidth){
				var a = i;
				for(a;a < menuCount;a++){
					mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
				}
				mainnav.find('.mainnav__replaced').each(function(){
					mainnav.find('.overflowMenu').append($(this));
				});
				mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__list-link"><span>Ещё</span><i class="icon-arrow_down"></i></a></li>');
				mainnav.find('.mainnav__more').on('click',function(){
					if (mainnav.hasClass('opened')){
						mainnav.removeClass('opened')
						mainnav.find('.overflowMenu').removeClass('opened')
						$('.overlay-top').css('overflow', 'hidden')
						$('#overlay').removeClass('opened')
					}else{
						mainnav.addClass('opened');
						mainnav.find('.overflowMenu').addClass('opened');
						$('.overlay-top').css('overflow', 'visible')
						$('#overlay').addClass('opened')
					}
					// Определение положения кнопки еще
					var morePos = mainnav.find('.mainnav__more').position().left;
					var contentPos = parseInt(morePos) - 100;
					mainnav.find('.overflowMenu').css({'left' : contentPos})
				});
				// $(function($){
				// 	$(document).mouseup(function (e){
				// 		var div =  mainnav.find('.overflowMenu.opened');
				// 		var btn =  mainnav.find('.mainnav__more');
				// 		if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
				// 			div.removeClass('opened');
				// 			mainnav.removeClass('opened');
				// 			$('.overlay-top').css('overflow', 'hidden');
				// 		}
				// 	});
				// });
				return false;
			}
		}
	}
}


///////////////////////////////////////
// Функция + - для товара
///////////////////////////////////////
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').on('click', function(){
		//console.log('qty__plus')
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty__minus').off('click').on('click', function(){
		//console.log('qty__minus')
    var quantity = $(this).parent().find('.quantity, .cartqty');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
}


///////////////////////////////////////
// Уведомления
///////////////////////////////////////
function notyStart(text, type) {
  new Noty({
    text: text,
    layout: "bottomCenter",
    type: type,
    theme: "",
    textAlign: "center",
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: "2000",
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}


///////////////////////////////////////
/* Скрипты для главной */
///////////////////////////////////////
// Отсчет даты до окончания акции
function counterDate() {
	// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
	var end = $('.counter').attr('end');
	var countDownDate = new Date(end).getTime();
	// Обновление счетчика каждую секунду
	var x = setInterval(function() {
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// Вывод
		$('.counter .days span').text(days);
		$('.counter .hours span').text(hours);
		$('.counter .minutes span').text(minutes);
		$('.counter .seconds span').text(seconds);
		// Счетчик завершен
		if (distance < 0) {
			clearInterval(x);
			$('.counter').hide();
		}
		// Запуск Функции анимации
		counterAnimate('.product__counter > div')
	}, 1000);

	// Добавляем контент анимации
	function counterAnimate(obj){
		$(obj).each(function(){
			var end = $('.counter').attr('end');
			var countDownDate = new Date(end).getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var current = parseFloat(days/30 * 100)
			var cur = parseInt(100 - current);
			$('.counter__animate-line-progress').css({width: cur + '%'})
		})
	}
	
	// Функция анимации счетчика
	function counterAnimate22(obj){		
		$(obj).each(function(){
			var end = $('.counter').attr('end');
			var endTime = new Date(end).getTime();//150
			var nowTime = new Date().getTime();//40
			var distance = (endTime - nowTime);//150-40=110  110/150*100
		})
	}
}

// Функция показать все для "Товары на главной"
function pdtSale() {
	var id = $('#pdt__sale');
	var btn = id.find('.showAll');
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find(id)
		var btnText = t.find('span')
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать еще')
			parents.find('.product__item').removeClass('show')
			parents.css({height: ''})
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
			parents.css({height: '100%'})
		}
	});
	// Функция отображения кнопки Показать все, если много товаров
	function visibility() {
		var items = id.find('.product__item').length;
		var visible = id.find('.product__item:visible').length;
		var buttons = id.find('.products__buttons');
		items > visible ? buttons.show() : buttons.hide()
	}
	// Запуск функции
	visibility();
	// Запуск функции при изменении экрана
	$(window).resize(function(){
		visibility();
	});
}

// Функция слайдера для "Хиты продаж" на главной странице
function pdtBest() {
	var id = $('#pdt__best');
	var btn = id.find('.showAll');
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find(id)
		var btnText = t.find('span')
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать еще')
			parents.find('.product__item').removeClass('show')
			parents.css({height: ''})
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
			parents.css({height: '100%'})
		}
	});
	// Функция отображения кнопки Показать все, если много товаров
	function visibility() {
		var items = id.find('.product__item').length;
		var visible = id.find('.product__item:visible').length;
		var buttons = id.find('.products__buttons');
		items > visible ? buttons.show() : buttons.hide()
	}
	// Запуск функции
	visibility();
	// Запуск функции при изменении экрана
	$(window).resize(function(){
		visibility();
	});
}

// Функция слайдера для "Новинки" на главной странице
function pdtNew(){
	var id = $('#pdt__new');
	var btn = id.find('.showAll');
	btn.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var parents = t.parents().find(id)
		var btnText = t.find('span')
		if(t.hasClass('active')){
			t.removeClass('active')
			parents.removeClass('active')
			btnText.text('Показать еще')
			parents.find('.product__item').removeClass('show')
			parents.css({height: ''})
		}else{
			t.addClass('active')
			parents.addClass('active')
			btnText.text('Скрыть')
			parents.find('.product__item').addClass('show')
			parents.css({height: '100%'})
		}
	});
	// Функция отображения кнопки Показать все, если много товаров
	function visibility() {
		var items = id.find('.product__item').length;
		var visible = id.find('.product__item:visible').length;
		var buttons = id.find('.products__buttons');
		items > visible ? buttons.show() : buttons.hide()
	}
	// Запуск функции
	visibility();
	// Запуск функции при изменении экрана
	$(window).resize(function(){
		visibility();
	});
}

// Функция слайдера для "Акции" на главной странице
function pdtSales(){
	var owlS = $('#pdt__sales .owl-carousel');
  owlS.owlCarousel({
    items: 1,
    margin: 0,
    loop: false,
    rewind: false,
    lazyLoad: true,
    nav: true,
    navContainer: '',
    navText: [ , ],
    dots: false,
		autoWidth: false,
    autoHeight: true,
    autoHeightClass: 'owl-height',
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100
  });
}

// Функция Слайдер категорий Каталога на всех страницах.
function pdtCatalog() {
	var owlC = $('#pdt__catalog .owl-carousel');
  owlC.owlCarousel({
    items: 6,
    margin: 20,
    loop: false,
    rewind: false,
    lazyLoad: true,
    nav: true,
    navContainer: '',
    navText: [ , ],
    dots: false,
		autoWidth: false,
    autoHeight: false,
    autoHeightClass: 'owl-height',
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:2, autoHeight: true},
			480:{items:3},
			640:{items:3},
			768:{items:4},
			992:{items:5},
			1200:{items:6}
		}
  });
}

// Слайдер для главной страницы
function slideShow() {
	// Слайдер на главной
	var owlS = $('#slideshow .owl-carousel');
	owlS.owlCarousel({
		items: 1,
		loop: true,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navText: [ , ],
		navContainer: '',
		dots: true,
		dotsContainer: '',
		dotsData: false,
		dotsSpeed: 400,
		dotsEach: true,
		smartSpeed: 500,
		URLhashListener: true,
		autoplay: true,
    autoplayTimeout: '3000',
		autoplayHoverPause: true,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		animateOut: 'fadeOut',
    animateIn: 'fadeIn'
	});
}

// Слайдер для главной страницы
function promoSlider() {
	// Слайдер на главной
	var owlS = $('#promo .owl-carousel');
	owlS.owlCarousel({
		items: 1,
		loop: true,
		rewind: true,
		lazyLoad: true,
		nav: false,
		navText: [ , ],
		navContainer: '',
		dots: true,
		dotsContainer: '',
		dotsData: false,
		dotsSpeed: 400,
		dotsEach: true,
		smartSpeed: 500,
		URLhashListener: true,
		autoplay: true,
    autoplayTimeout: '3000',
		autoplayHoverPause: true,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		animateOut: 'fadeOut',
    animateIn: 'fadeIn'
	});
}

// Новости
function newsCarousel() {
	var id = $('#news');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.products__buttons');
	var dots = id.find('.owl-dots');
	// Функция слайдера для Новостей
	carousel.owlCarousel({
		items: 3,
		margin: 20,
		slideBy: 1,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
		navText: [ , ],
		dots: false,
		dotsContainer: dots,
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: true,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:1, autoHeight: true},
			480:{items:2},
			640:{items:2},
			768:{items:2},
			992:{items:3},
			1200:{items:3}
		}
	});
}

// Функция слайдер для "Вы смотрели"
function viewed() {
	$('#viewed .owl-carousel').owlCarousel({
		items: 6,
		margin: 20,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: true,
		navContainer: '',
		navText: [ , ],
		dots: false,
		dotsContainer: '',
		autoHeight: false,
		autoHeightClass: 'owl-height',
		autoplay: true,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:2, margin: 16},
			480:{items:2},
			640:{items:3},
			768:{items:4},
			992:{items:5},
			1200:{items:6}
		}
	});
}

// Функция слайдера для "Новинки" на главной странице
function pdtCart(){
	var id = $('#pdt__cart');
	var carousel = id.find('.owl-carousel');
	var buttons = id.find('.products__buttons');
	var dots = id.find('.owl-dots');
	carousel.owlCarousel({
		items: 5,
		margin: 20,
		loop: false,
		rewind: true,
		lazyLoad: true,
		nav: false,
		navContainer: '',
		navText: [ , ],
		dots: true,
		dotsContainer: dots,
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: true,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:1, autoHeight: true},
			320:{items:1, autoHeight: true},
			480:{items:2},
			640:{items:2},
			768:{items:3},
			992:{items:4},
			1200:{items:5}
		},
		onInitialized: number,
		onChanged: number,
		onResize: number,
		onResized: number
	});

	// Нумерация страниц
	function number() {
		dots.find('.owl-dot').each(function(i){
			$(this).find('span').text(i+1)
		});
		// Скрываем кнопки навигации
		dots.hasClass('disabled') ? buttons.hide() : buttons.show();
		// Скрываем не активные элементы навигации
		var dotActiveIndex = dots.find('.owl-dot.active').index();
		var dotVisibleStep = 2;
		var dotPrevActiveIndex = dotActiveIndex - dotVisibleStep;
		var dotNextActiveIndex = dotActiveIndex + dotVisibleStep;

		dots.find('.owl-dot')
			.hide()
			.filter(function(index, item){
				if(index >= dotPrevActiveIndex &&  index <= dotNextActiveIndex){
					return true;
				}
				return false;
			})
			.show()
			.addClass('show')
	}

	// Навигация при клике НАЗАД
	buttons.find('.prev').on('click', function () {
		carousel.trigger('prev.owl.carousel');
	});

	// Навигация при клике ВПЕРЕД
	buttons.find('.next').on('click', function () {
		carousel.trigger('next.owl.carousel');
	});
}



///////////////////////////////////////
// Функция выбора модификаций
///////////////////////////////////////
function quickViewMod() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
			});
			block.find('.productView__image img').attr('src', block.find('.productView__image img').data('src'))
			block.find('.thumblist__items img').each(function(){
				$(this).attr('src', $(this).data('src'))
			})
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item.has-mod').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('.add-mod');
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$('.add-mod').on('click', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShowMod(href);
			$(function(){
				var observer = lozad(); // lazy loads elements with default selector as '.lozad'
				observer.observe();
			});
			preload();
			$('.productViewBlock').removeClass('productViewQuick');
			$('.productViewBlock').addClass('productViewMod');
			return false;
		});
	});
}

// Быстрый просмотр модификаций
function quickViewShowMod(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					// TODO сделать вывод красивой таблички
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShowMod("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			$.fancybox.open(document.quickviewPreload[href]);
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			prodQty();
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			$.fancybox.open($(content).getColumnContent());
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			prodQty();
		});
	}
}

///////////////////////////////////////
// Функция выбора модификаций
///////////////////////////////////////
function quickView() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
			});
			block.find('.productView__image img').attr('src', block.find('.productView__image img').data('src'))
			block.find('.thumblist__items img').each(function(){
				$(this).attr('src', $(this).data('src'))
			})
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('.quickview');
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$('.quickview').on('click', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShow(href);
			$(function(){
				var observer = lozad(); // lazy loads elements with default selector as '.lozad'
				observer.observe();
			});
			preload();
			$('.productViewBlock').removeClass('productViewMod');
			$('.productViewBlock').addClass('productViewQuick');
			return false;
		});
	});
}

// Быстрый просмотр модификаций
function quickViewShow(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					// TODO сделать вывод красивой таблички
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShow("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			$.fancybox.open(document.quickviewPreload[href]);
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			prodQty();
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			$.fancybox.open($(content).getColumnContent());
			addCart();
			addTo();
			goodsModification();
			newModification();
			quantity();
			prodQty();
		});
	}
}


///////////////////////////////////////
/* Скрипты для товаров */
///////////////////////////////////////
// Разница цены в процентах %
function priceDiff() {
	var old = parseFloat($('.productView .price__old .num').text().replace(' ',''));
	var now = parseFloat($('.productView .price__now .num').text().replace(' ',''));
	var diff = 0;
	if(old > now){
		diff = (((old - now)/old)*100).toFixed();
		$('.productView .ico__sales').text('-' + diff + '%');
	}else{
		$('.productView .ico__sales').hide();
	}

	$('.product__item').each(function(){
		var old = parseFloat($(this).find('.price__old .num').text().replace(' ',''));
		var now = parseFloat($(this).find('.price__now .num').text().replace(' ',''));
		var diff = 0;
		if(old > now){
			diff = (((old - now)/old)*100).toFixed();
			$(this).find('.ico__sales').text('-' + diff + '%');
		}else{
			$(this).find('.ico__sales').hide();
		}
	});
}

// Много и Мало вместо точного количества
function goodsModRest() {
	$('.goodsModRestValue').each(function(){
		var value = $(this).data('value');
		if (value > 0 && value < 10) {
			$(this).text('В наличии мало');
			$(this).css('opacity', '1');
			$(this).parent().addClass('few');
		}else if (value > 10) {
			$(this).text('В наличии много');
			$(this).css('opacity', '1');
			$(this).parent().addClass('alot');
		}else if (value == 0) {
			$(this).text('нет в наличии');
			$(this).css('opacity', '1');
			$(this).parent().addClass('empty');
		}
	});
}

// Добавление товара в корзину
function addCart() {
	$('.productView__form, .goodsListForm').off('submit').submit(function() {
		// Быстрый заказ
		if ($(this).attr('rel') === 'quick') {
			quickOrder(this);
			$('.cart').addClass("has-items");
			return (false);
		}
		$('.cart').addClass("has-items");
		$('.count-cart').animate({opacity: 0,display: "none"},500);
		$('.count-cart').animate({display: "inline",opacity: 1},500);
		// Находим форму, которую отправляем на сервер, для добавления товара в корзину
		var formBlock = $($(this).get(0));
		var addressCart = '/cart';
		// Проверка на существование формы отправки запроса на добавление товара в корзину
		if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
			alert('Не удалось найти форму добавления товара в корзину');
			return false;
		}
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = formBlock.serializeArray();
		var t = $(this);
		var id = t.find('input[name="form[goods_id]"]').val()
		// Сообщаем серверу, что мы пришли через ajax запрос
		formData.push({name: 'ajax_q', value: 1});
		// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
		//formData.push({name: 'fast_order', value: 1});
		// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
		$.ajax({
			type: "POST",
			cache: false,
			url: formBlock.attr('action'),
			data: formData,
			success: function(data) {
				//$.fancybox.open(data);
				// Анализ системного сообщения в коризне
				var str = $(data).html();
				// Проверяем текст сообщения на наличие ошибки
				if (str.indexOf("Не удалось") != -1) {
					// Сообщение с ошибкой
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">'+ str + '</div></div>',
							layout:"bottomRight",
							type:"warning",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
				} else {
					// Сообщение с успешным добавлением
					if(typeof(Noty) == "function") {
						new Noty({
							text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-check"></i></div><div class="noty__message">'+ str + '</div></div>',
							layout:"bottomRight",
							type:"success",
							theme:"",
							closeWith: ['click'],
							textAlign:"center",
							easing:"swing",
							animation: {
								open: 'animated fadeInUp',
								close: 'animated fadeOutDown',
								easing: 'swing',
								speed: 400
							},
							timeout:"2000",
							progressBar:true,
							closable:true,
							closeOnSelfClick:true,
							modal:false,
							dismissQueue:false,
							onClose:true,
							killer:false
						}).show();
					}
					// Добавляем активный класс если товар успешно добавился в корзину
					t.addClass("inCart");
					$('.product__item[data-id="' + id + '"]').each(function(){
						$(this).addClass("inCart");
					});
					// Закрытие модального окна
					setTimeout(function () {
						$.fancybox.close();
					},2000)
				}
				// Скрытое обновление корзины
				$('.hiddenUpdate').html(data);
			}
		});
		return false;
	});
}

// Добавление в сравнение и Сохраненное
function addTo() {
// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-compare').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__compare .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__compare .addto__items').prepend('' +
              '<div class="addto__item flex" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image flex-center"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__content flex">' +
									'<div class="addto__info">' +
										'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
										'<div class="addto__price  '+ pDataChar +'">' +
											'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
										'</div>' +
									'</div>' +
									'<div class="addto__actions flex">' +
              			'<a href="'+ delUrl +'?id='+ pDataMod +'" data-id="'+ pDataMod +'" class="addto__remove remove flex-center" title="Убрать товар из списка сравнения" onclick="removeFromCompare($(this))"><i class="icon-close"></i></a>' +
              		'</div>' +
              	'</div>' +
              '</div>' +
						'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
							var textLabel = 'Добавлено в сравнение'
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
							var textLabel = 'Удалено из сравнения'
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.compare_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-compare');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.compare_goods_count);
								$('.count-compare').attr('data-count', data.compare_goods_count);
								if(data.compare_goods_count > 0){
									$('.compare').addClass("has-items");
								}else{
									$('.compare').removeClass("has-items");
									$('.count-compare').attr('data-count', '0').text("0");
									$('.add-compare').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}

						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-check"></i></div><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});

  // Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-favorites').off('click').click(function(){
		// Объект ссылки, по которой кликнули
		var
				a = $(this)
				isAdd = a.attr('data-action-is-add'),
				addUrl = a.attr('data-action-add-url'),
				delUrl = a.attr('data-action-delete-url'),
				addTitle = a.attr('data-action-add-title'),
				delTitle = a.attr('data-action-delete-title'),
				pageUrl = a.attr('data-action-url'),
				pName = a.attr('data-prodname'),
				pUrl = a.attr('data-produrl'),
				pImg = a.attr('data-prodimg'),
				pDataid = a.attr('data-id'),
				pDataPrice = a.attr('data-mod-price'),
				pDataChar = a.attr('data-char-code'),
				pDataMod = a.attr('data-mod-id'),
				aText = a.parent().find('.add-compare'),
				addTooltip = a.attr('data-action-text-add'),
				delTooltip = a.attr('data-action-text-del'),
				requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__favorites .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__favorites .addto__items').prepend('' +
              '<div class="addto__item flex" data-id="'+ pDataid +'">' +
								'<a href="'+ pUrl +'" title="'+ pName +'" class="addto__image flex-center"><img src="'+ pImg +'" class="goods-image-icon" /></a>' +
								'<div class="addto__content flex">' +
									'<div class="addto__info">' +
										'<a href="'+ pUrl +'" class="addto__name" title="'+ pName +'"><span>'+ pName +'</span></a>' +
										'<div class="addto__price  '+ pDataChar +'">' +
											'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
										'</div>' +
									'</div>' +
									'<div class="addto__actions flex">' +
              			'<a href="'+ delUrl +'?id='+ pDataMod +'" data-id="'+ pDataMod +'" class="addto__remove remove flex-center" title="Убрать товар из списка избранного" onclick="removeFromFavorites($(this))"><i class="icon-close"></i></a>' +
              		'</div>' +
              	'</div>' +
              '</div>' +
						'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
									from = addUrl
									,to = delUrl
									,newIsAddStatus = 0
									,newTitle = delTitle ? delTitle : ''
									,newTooltip = delTooltip ? delTooltip : ''
							;
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
							var textLabel = 'Добавлено в избранное'
						} else {
							var
									from = delUrl
									,to = addUrl
									,newIsAddStatus = 1
									,newTitle = addTitle ? addTitle : ''
									,newTooltip = addTooltip ? addTooltip : ''
							;
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
							var textLabel = 'Удалено из избранного'
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.favorites_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-favorites');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.favorites_goods_count);
								$('.count-favorites').attr('data-count', data.favorites_goods_count);
								if(data.favorites_goods_count > 0){
									$('.favorites').addClass("has-items");
								}else{
									$('.favorites').removeClass("has-items");
									$('.count-favorites').attr('data-count', '0').text("0");
									$('.add-favorites').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
								.attr('title', newTitle)
								.attr('data-tooltipOFF', newTooltip)
								.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						//if(aText.length) {
						//  aText.text(aText.attr(isAdd == 1 ? 'data-action-text-del' : 'data-action-text-add'));
						//}

						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-check"></i></div><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">'+ data.message + '</div></div>',
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								textAlign:"center",
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
}

// Загрузка основных функций шаблона Товаров
$(document).ready(function(){
	quickViewMod();
	quickView();
	goodsModRest();
	priceDiff();
	addCart();
	addTo();
	// Добавление товара в корзину
	$('.add-cart').on('click', function() {
		var form = $(this).closest('form');
		if ($(this).hasClass('quick')) {
			form.attr('rel', 'quick');
		} else {
			var rel = form.attr('rel');
			if (rel) {
				form.attr('rel', rel.replace('quick', ''));
			}
		}
		form.trigger('submit');
		return (false);
	});

	// Уведомить при отсутствии товара
	$('.add-notify').on('click', function(){
		var formBlock = $(this).closest('.goodsListForm');
    var goodsMod = formBlock.find('[name="form[goods_mod_id]"]').val();
    $('#fancy-notify-goods-mod').val(goodsMod)
	});
});


///////////////////////////////////////
/* Скрипты для оформления заказов */
///////////////////////////////////////
// Быстрый заказ
function quickOrder(formSelector) {
	// Находим форму, которую отправляем на сервер, для добавления товара в корзину
	var formBlock = $($(formSelector).get(0));
	// Проверка на существование формы отправки запроса на добавление товара в корзину
	if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
		alert('Не удалось найти форму добавления товара в корзину');
		return false;
	}
	// Получаем данные формы, которые будем отправлять на сервер
	var formData = formBlock.serializeArray();
	// Сообщаем серверу, что мы пришли через ajax запрос
	formData.push({name: 'ajax_q', value: 1});
	// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
	formData.push({name: 'fast_order', value: 1});
	// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
	$.ajax({
		type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox.open(data, {
				keyboard: false,
				baseClass: "fastOrder",
				afterShow: function(){
          showPass();
          orderScripts();
          orderScriptsSelect();
          coupons();
          preload();
					validCart();
          $('.fastOrder__form').validate({
            errorPlacement: function(error, element) { }
          });
				}
			})

		}
	});
	return false;
}

// Регистрация и выбор доставки
function orderScripts() {
	// маска телефона
	$("#sites_client_phone").mask("+7 (999) 999-9999");
	// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	// $("#deliveryConvenientDate").datepicker({
	// 	// Если true, то при активации даты, календарь закроется.
	// 	autoClose: true,
	// 	// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
	// 	minDate: new Date()
	// });

	// Выбор времени
	$('select.quickform-select-convenient').on('change', function(){
		var convenientArr = $(this).val().split('-')
		if(convenientArr.length){
			$('input[name="form[delivery][convenient_time_from]"]').val(convenientArr[0])
			$('input[name="form[delivery][convenient_time_to]"]').val(convenientArr[1])
		}
	})
	// Выбор даты доставки
	// Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	var TIME_ZONE = 0; // Учёт временной зоны магазина: 0 - выключен, 1 - включен
	$("#deliveryConvenientDate").datepicker({
		// Если true, то при активации даты, календарь закроется.
		autoClose: true,
		// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
		minDate: new Date(),
		onSelect: function (date) {
			var d = new Date();
			var nowDate = d.toLocaleDateString();
			var utcOffset = 3; // Москва
			var offsetTime = 0; // Дополнительный отступ по времени
			var hours = d.getUTCHours() + utcOffset + offsetTime;
			if (hours > 23) {
				hours = (d.getUTCHours() - 24) + utcOffset + offsetTime;
			}

			var $selectTime = $("#selectTime");
			var template = $('<div>').html(
				'<option value="9-10">09:00 - 10:00</option>' +
				'<option value="11-12">11:00 - 12:00</option>' +
				'<option value="12-13">12:00 - 13:00</option>' +
				'<option value="13-14">13:00 - 14:00</option>' +
				'<option value="14-15">14:00 - 15:00</option>' +
				'<option value="15-16">15:00 - 16:00</option>' +
				'<option value="16-17">16:00 - 17:00</option>' +
				'<option value="17-18">17:00 - 18:00</option>' +
				'<option value="18-19">18:00 - 19:00</option>' +
				'<option value="19-20">19:00 - 20:00</option>' +
				'<option value="20-21">20:00 - 21:00</option>' +
				'<option value="21-22">21:00 - 22:00</option>'
			)
			var $options = template.children();

			$selectTime.removeAttr("disabled");

			if (date == nowDate && TIME_ZONE) {
				var $filterdOptions = $options.filter(function () {
					var value = $(this).val();
					var timeOption = parseInt(value.split('-'));

					return (hours < timeOption)
				})

				if ($filterdOptions.length) {
					$selectTime
						.html('')
						.append($options.first())
						.append($filterdOptions)
				} else {
					$selectTime.html('<option value="0-0">На сегодня доставок нет</option>');
					$selectTime.attr('disabled', 'disabled');
					$selectTime.trigger('change')
				}
			} else {
				$selectTime.html(template.html())
			}
			$('input[name="form[delivery][convenient_time_from]"]').val(0)
			$('input[name="form[delivery][convenient_time_to]"]').val(0)
			$('#quickform .quickform-select-convenient').trigger('refresh')
		}
	})

	// При оформлении заказа дадим возможность зарегистрироваться пользователю
	$('#form__registration').click(function(){
		if($(this).prop("checked")) {
			$('.form__pass').show();
			$('#sites_client_email').addClass('required');
			$('#sites_client_email').attr("required", true);
			$(this).parent().addClass('active');
			$(this).attr("checked", true);
			$('.form__fields.email label').addClass('required');
		} else {
			$('.form__pass').hide();
			$('#sites_client_email').removeClass('required');
			$('#sites_client_email').attr("required", false);
			$(this).parent().removeClass('active');
			$(this).attr("checked", false);
			$('.form__fields.email label').removeClass('required');
		}
	});
	// Отображение вариантов оплаты
	var ID = $('input[name="form[delivery][id]"]:checked').val();
	$('.order__payment').hide();
	$('.order__payment[rel="' + ID + '"]').show();
	$('.order__payment[rel="' + ID + '"]').find('input:first').click();
	// Действия при выборе варианта доставки на этапе оформления заказа
	$('.delivery__radio').click(function(d){
		// Отображение вариантов оплаты при выборе доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		$('.zone__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		var val = $(this).val();
		var fz = $($('.zone__radio[deliveryid='+val+']')[0]);
		$(this).prop('checked',true);
		fz.prop('checked',true);
		$(this).parent().addClass('active');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены при наличии зоны
		var cartSumTotal = $('.cartSumTotal').data('value');
		var zonePrice =  $('.zone__radio:checked').attr('price');
		if(zonePrice > 0){
			priceBlock.text(addSpaces(zonePrice));
			$('.cartSumDelivery .num').text(addSpaces(zonePrice));
		}else{
			priceBlock.text(price);
			$('.cartSumDelivery .num').text(addSpaces(price));
		}
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		// Скрытие необязательных полей при выборе самовывоза
		if($(this).data('name') == 'Самовывоз'){
			$('.fastOrder__form').addClass('pickup');
			$('.address input, .address textarea').val('Самовывоз');
			$('#deliveryConvenientDate').val('01.01.2220');
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
		}else{
			$('.fastOrder__form').removeClass('pickup');
			$('.address input, .address textarea').val('');
			$('#deliveryConvenientDate').val('');
		}
	});
	// Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
	$('.zone__radio').click(function(){
		var val = $(this).attr('deliveryid');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены
		priceBlock.text(addSpaces(price));
		//
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			if($(this).val() == val){
				$(this).prop('checked',true);
			}else{
				$(this).prop('checked',false);
			}
		});
		// Выбор варианта оплаты при выборе зоны доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumTotalHide:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		$('.cartSumDelivery .num').text(addSpaces(price));
	});
}

// Выбор доставки и оплаты
function orderScriptsSelect() {
	// Выбор доставки
	$('.delivery__select select').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html()
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.delivery__desc').html()
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Обновление цены и описания при выборе доставки
	$('.delivery__select select').each(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html();
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').each(function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').on('change', function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(WithZone));
	});

	// Выбор оплаты
	$('.paymentSelect').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('value');
		$('.hiddenRadio .paymentRadio[value="'+selectedDelId+'"]').click();
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор оплаты
	$('.payment__option input').on('click', function (){
		var t = $(this).parent()
		$('.payment__option').removeClass('active')
		t.addClass('active')
	});
	// Проверяем выбранную оплату
	$('.payment__option input').each(function (){
		var t = $(this).parent()
		if($(this).attr('checked')){
			t.addClass('active')
		}
	});
}

// Отправка купона при оформлении заказа
function coupons() {
	var submitBtn = $('.coupon__button');
	var couponInput = $('.coupon__code');
	var resetBtn = $('.coupon__reset');
	submitBtn.on('click', function(){
		var url = '/order/stage/confirm';
		var val = couponInput.val();
		// Получаем данные формы, которые будем отправлять на сервер
		var formData = $('#myform').serializeArray();
		formData.push({name: 'ajax_q', value: 1});
		formData.push({name: 'only_body', value: 1});
		formData.push({name: 'form[coupon_code]', value: val});
		$.ajax({
			type: "POST",
			cache: false,
			url: url,
			data: formData,
			success: function(data) {
				var cartSumTotal = $('.cartSumTotal:eq(0) .num').text().toString().replace(/\s/g, '')
				// Получаем блок скидки
				var discountBlock = $(data).closest('#myform').find('.discount');
				var discountName = discountBlock.find('.name').text();
				var discountPrice = discountBlock.find('.percent .num').text();
				var discountPercent = discountBlock.find('.percent').text();
				if (discountPrice.length) {
					discountPrice = discountPrice
				}else{
					discountPrice = discountPercent
				}
				// Получаем новую итоговую стоимость заказа
				var totalBlock = $(data).closest('#myform').find('.total');
				var totalSum = parseInt(totalBlock.find('.total-sum').data('total-sum'));
				var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
				var newTotalSum = totalSum + deliveryPrice;
				// Записываем название и размер скидки по купону
				if (discountName.length) {
					$('.total__coupons .total__label span').html(discountName);
					$('.total__coupons .cartSumCoupons').html(discountPrice);
					$('.cartSumCouponsDiscount').html(discountPrice);
					$('.total__discount').hide();
					$('.total__coupons').show();
				}
				if (newTotalSum > cartSumTotal) {
					couponInput.parent().addClass('error');
					couponInput.parent().removeClass('active');
					couponInput.val("").attr("placeholder", "Купон неверен");
					$('.total__coupons').hide();
					$('.total__discount').show();
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
					$('.cartSumCouponsDiscount').html('0 руб.');
				} else if (newTotalSum == cartSumTotal) {
					couponInput.parent().removeClass('error');
					couponInput.parent().addClass('active');
				} else {
					couponInput.parent().removeClass('error');
					couponInput.parent().addClass('active');
					$('.total__coupons').show();
					// Обновляем значение итоговой стоимости
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
					$('.cartSumTotal').attr('data-value', newTotalSum);
					$('.cartSumCoupons').attr('data-value', newTotalSum);
					$('.cartSumTotalHide').attr('data-value', newTotalSum);
					$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
					$('.cartSumDiscount .num').text(addSpaces(totalSum));
				}
			},
			error: function(data){
				console.log("Возникла ошибка: Невозможно отправить форму купона.");
			}
		});
	});
	// Сброс
	resetBtn.on('click', function(){
		$('.coupon__code').val('').trigger('input');
		$('.fake__input').val('').trigger('input');
		setTimeout(function(){
			$('.total__coupons').hide();
			$('.total__discount').show();
			var cartSum = parseInt($('.cartSumDiscount').data('value'));
			var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
			var newTotalSum = cartSum + deliveryPrice;
			$('.cartSumTotal .num').text(addSpaces(newTotalSum));
			$('.cartSumTotal').attr('data-value', newTotalSum);
			$('.cartSumCoupons').attr('data-value', newTotalSum);
			$('.cartSumTotalHide').attr('data-value', newTotalSum);
			$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
			$('.cartSumCouponsDiscount').html('0 руб.');
			couponInput.parent().removeClass('error');
			couponInput.parent().removeClass('active');
			couponInput.val("").attr("placeholder", "Введите купон");
		}, 500);
	});
	// Отображение кнопки Сброс
	couponInput.on('input',function(){
		if($(this).val()) {
			$(this).parent().find('.coupon__reset').addClass('active')
		} else {
			$(this).parent().find('.coupon__reset').removeClass('active')
		}
	});
	// Фальшивая кнопка купона
	$('.fake__button').on('click', function(event){
		event.preventDefault();
		var fakeValue = $('.fake__input').val();
		if(fakeValue == ''){
			$('.fake__input').addClass('error')
		}else{
			$('.fake__input').removeClass('error')
			couponInput.val(fakeValue);
			submitBtn.click();
		}
	});
	// Отображение фальшивой кнопки Сброс
	$('.fake__input').on('input',function(){
		$(this).val() ? resetBtn.addClass('active') : resetBtn.removeClass('active')
	});
}

// Экономия в корзине
function economy() {
	var cartSumOldWithDelivery = parseInt($('.cartSumOldWithDelivery .num').text().toString().replace(/\s/g, ''))
	var cartSumTotal =  parseInt($('.cartSumTotal .num').text().toString().replace(/\s/g, ''))
	if (cartSumOldWithDelivery > 0) {
		$('.cartSumWithDelivery .num').text(addSpaces(cartSumOldWithDelivery - cartSumTotal));	
		$('.total__economy').css({'display' : 'flex'})
	}else{
		$('.total__economy').css({'display' : 'none'})
	}
}

///////////////////////////////////////
/* Скрипты для Товары, Категории */
///////////////////////////////////////
function catalog() {
	// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
	$('.filter__item input').on('click', function(){
		$(this)[0].form.submit();
	});

	$('.filtersActive input').on('click', function(){
		$(this)[0].form.submit();
	});

	// Боковое меню сохранение открытой вложенности
	// $('.collapsible:not(".active")').find('.collapsible__content').css('display', 'none');
	// $('.collapsible.active').find('.collapsible__content').css('display', 'block');
	$('.collapsible__click').on('click', function(event){
		event.preventDefault();
		if ($(this).closest('.collapsible').hasClass('active')) {
			$(this).parent().parent().find('.collapsible__content').slideUp(600);
			$(this).closest('.collapsible').removeClass('active');
		} else {
			$('.collapsible').removeClass('active');
			$('.collapsible__content').slideUp(600);
			$(this).parent().parent().find('.collapsible__content').slideDown(600);
			$(this).closest('.collapsible').addClass('active');
		}
	});

	// Активные фильтры число.
	$('.filter__values').each(function(){
		var len = $(this).find('span').length - 1;
		var newLen = len - 1;
		if(len > 1){
			$(this).append('<span class="filter__values-more">и еще ' + newLen + '</span>')
		}
	});

	// Сборосить категорию фильтра
	$('.filter__clear').on('click', function(event){
		event.preventDefault();
		var $parent = $(this).closest('.filter__list');
		var $checkboxes = $parent.find('[type="checkbox"]')
		$checkboxes.prop('checked', false).attr('checked', false);
		$('.form__filters')[0].submit();
	});

	// Показать Еще для фильтров
	$('.form__filters').each(function(){
		// Добавляем кнопку Еще если много фильтров
		var len = $(this).find('.filter__list').length
		var vis = $(this).find('.filter__list:visible').length
		if(len > vis){
			$(this).append('<div class="filter__list filter__list-more"><span class="filter__name">Еще</span></div>')
		}

		// Открытие доп фильтров
		$('.filter__list-more').on('click', function(){
			$(this).toggleClass('active')
			$(this).parent().find('.filter__list').toggleClass('show')
			$(this).hasClass('active') ? $(this).find('span').text('Скрыть') : $(this).find('span').text('Еще');
		})

	})

}

// Фильтр по ценам
function priceFilter() {
	var
		priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text()),  // Минимальное значение цены для фильтра
		priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text()),  // Максимальное значение цены для фильтра
		priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
		priceInputMin = $("#goods-filter-min-price"), // Поле ввода текущего значения цены "От"
		priceInputMax = $("#goods-filter-max-price"), // Поле ввода текущего значения цены "До"
		priceSubmitButtonBlock = $(".goodsFilterPriceSubmit");  // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.

	// Слайдер, который используется для удобства выбора цены
	priceSliderBlock.slider({
		range: true,
		min: priceFilterMinAvailable,
		max: priceFilterMaxAvailable,
		values: [
			parseInt($('#goods-filter-min-price').val())
			,parseInt($('#goods-filter-max-price').val())
		],
		slide: function( event, ui ) {
			priceInputMin.val(ui.values[0]);
			priceInputMax.val(ui.values[1]);
			priceSubmitButtonBlock.css('display', 'flex');
			priceSubmitButtonBlock.parent().addClass('active')
			$('.goods-filter-min-price').text(ui.values[0])
			$('.goods-filter-max-price').text(ui.values[1])
			$('.goods-filter-price').css('display', 'flex');
			$('.filters-price .filter__empty').hide();
		}
	});
	// При изменении минимального значения цены
	priceInputMin.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal < priceFilterMinAvailable) {
			newVal = priceFilterMinAvailable;
		}
		priceSliderBlock.slider("values", 0, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceSubmitButtonBlock.parent().addClass('active')
		$('.goods-filter-price').css('display', 'flex');
		$('.goods-filter-min-price').text(newVal);
		$('.filters-price .filter__empty').hide();
	});
	// При изменении максимального значения цены
	priceInputMax.keyup(function(){
		var newVal = parseInt($(this).val());
		if(newVal > priceFilterMaxAvailable) {
			newVal = priceFilterMaxAvailable;
		}
		priceSliderBlock.slider("values", 1, newVal);
		priceSubmitButtonBlock.css('display', 'flex');
		priceSubmitButtonBlock.parent().addClass('active')
		$('.goods-filter-price').css('display', 'flex');
		$('.goods-filter-max-price').text(newVal);
		$('.filters-price .filter__empty').hide();
	});

	// Активный фильтр цены
	if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
		$('.filters-price').addClass('has-filters');
		$('.toolbar').addClass('has-filters');
		$('#filters').addClass('has-filters');
		$('.goods-filter-min-price').text(priceInputMin.val())
		$('.goods-filter-max-price').text(priceInputMax.val())
		$('.goods-filter-price').css('display', 'flex');
		$('.filters-price .filter__empty').hide();
	}else{
		$('.filters-price').removeClass('has-filters');
		$('.toolbar').removeClass('has-filters');
		$('#filters').removeClass('has-filters');
		$('.goods-filter-price').css('display', 'none');
		$('.filters-price .filter__empty').show();
	}
	
	// Фильтры открыть
	$('.filters__icon').on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('#filters').toggleClass('opened');
		$('.filters__content').slideToggle();
		if($(this).hasClass('active')){
			$(this).find('.filters__label').text('Скрыть фильтры')
			$(this).find('i').attr('class', 'icon-minus')
		}else{
			$(this).find('.filters__label').text('Выбрать фильтры')
			$(this).find('i').attr('class', 'icon-plus')
		}
	});

	// Счетчик фильтров
	$('.filters__count').text($('.filter__value').length);

	// Фильтры поиск
	$('.filter__search').on('input', function () {
		var $items = $(this).next('.filter__items').children()
		var $checkboxes = $items.find('label');
		var itemsArray = $checkboxes.map(function () {return $(this).data('name').toLowerCase()}).toArray();
		var str = $(this).val();

		var resultArray = itemsArray.map((item, i) => item.indexOf(str) >= 0 ? i : -1).filter(item => item >= 0);
		$items.hide().filter(function () {        
			return resultArray.some(el => el === $(this).index())
		}).show();
	})
	
	$('.filter__list').each(function(){
		var item = $(this).find('.filter__item').length;
		var search = $(this).find('.filter__search');
		item < 4 ? search.hide() : search.show()
	});

}



///////////////////////////////////////
/* Скрипты для Товар */
///////////////////////////////////////
// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
	if(cnt>13) { return false; }
	$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
	num = (num==6)?0:num;
	setTimeout(function () {
		RefreshImageAction(img, num+1, cnt+1)
	}, 50);
}

// Товар. Карточка товара
function pageGoods() {
	// Слайдер доп. изображений
	$('.thumblist .owl-carousel').owlCarousel({
		items: 3,
		margin: 20,
		loop: false,
		rewind: true,
		lazyLoad: true,
		dots: false,
		nav: true,
		navText: [ , ],
		autoplay: true,
		autoplayHoverPause: true,
		autoHeight: true,
		smartSpeed: 500,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			480:{items:3},
			641:{items:3},
			768:{items:2},
			992:{items:3},
			1200:{items:3}
		}
	});

	// Функция Сопутствующие товары Слайдер
	function relatedGoods(){
		var id = $('.related__goods');
		var carousel = id.find('.owl-carousel');
		var buttons = id.find('.products__buttons');
		var dots = id.find('.owl-dots');
		carousel.owlCarousel({
			items: 4,
			margin: 20,
			slideBy: 1,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '',
			navText: [ , ],
			dots: false,
			dotsContainer: dots,
			autoHeight: false,
			autoHeightClass: 'owl-height',
			autoplay: true,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1, autoHeight: true},
				320:{items:1, autoHeight: true},
				480:{items:2},
				640:{items:2},
				768:{items:2},
				992:{items:3},
				1200:{items:4}
			}
		});
	}
	// Сопутствующие товары Запуск Слайдера
	relatedGoods();

	// Функция Сопутствующие товары Слайдер
	function relatedViews(){
		var id = $('.related__views');
		var carousel = id.find('.owl-carousel');
		var dots = id.find('.owl-dots');
		carousel.owlCarousel({
			items: 4,
			margin: 20,
			slideBy: 1,
			loop: false,
			rewind: true,
			lazyLoad: true,
			nav: true,
			navContainer: '',
			navText: [ , ],
			dots: false,
			dotsContainer: dots,
			autoHeight: false,
			autoHeightClass: 'owl-height',
			autoplay: true,
			autoplayHoverPause: true,
			smartSpeed: 500,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			responsiveClass: true,
			responsiveRefreshRate: 100,
			responsive: {
				0:{items:1, autoHeight: true},
				320:{items:1, autoHeight: true},
				480:{items:2},
				640:{items:2},
				768:{items:2},
				992:{items:3},
				1200:{items:4}
			}
		});
	}
	// Сопутствующие товары Запуск Слайдера
	relatedViews();

	// Функция показать больше для Отзывов
	var opinionContent = $('.opinion__content');
	var opinionCount = opinionContent.find('.opinion__item').length;
	if(opinionCount<=3){ opinionContent.find('.opinion__buttons').hide(); }
	opinionContent.find('.opinion__buttons .showAll').on('click',function(event){
		event.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('span').text("Показать все");
			opinionContent.find('.opinion__item').removeClass('show');
		}else{
			$(this).addClass('active').find('span').text("Скрыть все");
			opinionContent.find('.opinion__item').addClass('show');
		}
	});
	// Переключение для Положительный и Отрицательный отзыв
	$('.generally label').on('click', function(event){
		event.preventDefault();
		$('.generally label').removeClass('active');
		$('.generally input').attr('checked', false);
		$(this).addClass('active');
		$(this).next('input').attr('checked', true);
	});
	// Добавление отзыва о товаре. Рейтинг
	if($('.goodsOpinionRating').length){
		$('.goodsOpinionRating').rating();
	}
	// Ссылка на отображение формы для добавление отзыва о товаре
	$('.opinion__add').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).show();
			$('.opinion__addForm').slideUp(600);
		}else{
			$(this).addClass('active');
			$(this).hide();
			$('.opinion__addForm').slideDown(600);
			$('html, body').animate({scrollTop : jQuery('.opinion__addForm').offset().top}, 500);
		}
	});
	// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
	$(".opinion__form button").on('click', function(){
		var form = $(".opinion__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});
	// Иконка для обновления изображение капчи
	$('.captcha__refresh').click(function(){
		RefreshImageAction(this,1,1);
		$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));
		return false;
	});

	// Открытие зон доставки
	$('.zone__open').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.zone__list').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.zone__list').slideDown(600);
		}
	});

	// Открытие зон доставки
	$('.delivery__name').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().slideUp(600);
		}else{
			$(this).addClass('active');
			$(this).next().slideDown(600);
		}
	});

	// Свернуть и Развернуть дополнительное описание
	$('.opinion__more').on('click', function(event) {
		event.preventDefault();
		// Старый текст ссылки
		var txtOld = $(this).text();
		// Новый текст ссылки
		var txtNew = $(this).attr('rel');
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('mask').removeClass('active');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}else{
			$(this).addClass('active');
			$(this).parent().find('.opinion__text.comment').addClass('active').removeClass('mask');
			$(this).html(txtNew);
			$(this).attr('rel', txtOld);
		}
	});
	// Свернуть и Развернуть отображение кнопок
	$('.opinion__text.comment').each(function (){
		var contentHeight = $(this).height();
		if(contentHeight >= 90){
			$(this).parent().find('.opinion__more').show();
			$(this).parent().find('.opinion__text.comment').addClass('mask');
		}else{
			$(this).parent().find('.opinion__more').hide();
			$(this).parent().find('.opinion__text.comment').removeClass('mask');
		}
	});

	// Проверяем высоту описания товара
	$('.productView__description').each(function (){
		var contentHeight = $(this).find('.productView__content').height();
		if(contentHeight >= 120){
			$(this).parent().find('.productView__buttons').show();
			$(this).parent().find('.productView__content').addClass('mask');
		}else{
			$(this).parent().find('.productView__buttons').hide();
			$(this).parent().find('.productView__content').removeClass('mask');
		}
	});

	// Свернуть и Развернуть описание товара
	$('.productView__buttons-open').on('click', function (event){
		event.preventDefault();
		var t = $(this);
		if (t.hasClass('active')){
			t.removeClass('active')
			t.parents().find('.productView__content').removeClass('active');
			t.parents().find('.productView__content').addClass('mask');
			t.find('span').text('Посмотреть полное описание товара')
			$('html, body').animate({scrollTop : $('.productView__description').offset().top}, 500);
		}else{
			t.addClass('active')
			t.parents().find('.productView__content').addClass('active');
			t.parents().find('.productView__content').removeClass('mask');
			t.find('span').text('Скрыть полное описание товара')
		}
	});

	// Проверяем отображаемые характеристики
	$('.features__items').each(function (){
		var f_item_length = $('.features__item').length;
		var f_item_visible = $('.features__item').filter(':visible').length;
		if (f_item_length > f_item_visible){
			$('.features__buttons').show();
		}else{		
			$('.features__buttons').hide();
		}
	});

	// Свернуть и Развернуть характеристики
	$('.features__buttons-open').on('click', function(event){
		event.preventDefault();
		var t = $(this);
		if (t.hasClass('active')){
			t.removeClass('active')
			t.parents().find('.features__item').removeClass('show');
			t.find('span').text('Посмотреть все характеристики товара')
		}else{
			t.addClass('active')
			t.parents().find('.features__item').addClass('show');
			t.find('span').text('Скрыть все характеристики товара')
		}
	});

	// Первая буква имени в аватаре
	$('.opinion__item').each(function(){
		var avatar = $(this).find('.opinion__avatar span');
		var name = $(this).find('.opinion__name').text()[0];
		avatar.text(name)
	})
}

// Инициализация табов на странице товара
function initTabs() {
	// Блок в котором находятся табы
	var tabs = $('.productView__tabs');
	if(!tabs.length) {
		return false;
	}
	// Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
	checkTabHash();
	// Если текущий адрес страницы предполагает добавление отзыва
	if('#goodsDataOpinionAdd' == document.location.hash) {
		$('#goodsDataOpinionAddBlock').show();
		$('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 160}, 400);
	}
	// Биндим изменение хэша - проверка какой таб нужно открыть.
	$(window).bind('hashchange', function() { checkTabHash(); });
}

// Переключение табов
function tabSwitch(nb) {
	var tabs = $('.productView__tabs');
	var tab = tabs.find('[data-tab="'+ nb +'"]');
	var content = tabs.find('[data-tab-content="'+ nb +'"]');
	tabs.find('[data-tab]').removeClass('active');
	tabs.find('[data-tab-content]').removeClass('active');
	tab.addClass('active');
	content.addClass('active');
	document.location.hash = "#tab_" + nb;
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {
	// Определяем текущий хэш страницы
	var hash = window.location.hash.substr(1);
	if(hash == 'goodsDataOpinionAdd') {
		hash = 'tab_4';
	}
	if(!hash.length || hash.indexOf('tab_') == -1) {
		return false;
	}
	// Открываем тот таб, который был указан в hash-е
	tabSwitch(hash.replace("tab_", ''))
}

// Изменение кол-ва в карточке
function prodQty(){
	$('.productView__qty .quantity').change(function(){
		var t = $(this);
		// Количество
		var val = parseInt(t.val());
		// Если вводят 0 то заменяем на 1
		if(val < 1){
			t.val(1);
			val = 1;
		}
		// Проверка максимальныго остатка
		var max = parseInt(t.attr('max'));
		if(val > max){
			t.val(max);
			val = max;
			new Noty({
				text: '<div class="noty__addto flex"><div class="noty__icon flex-center"><i class="icon-close"></i></div><div class="noty__message">Внимание! Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div></div>',
				layout:"bottomRight",
				type:"warning",
				easing:"swing",
				animation: {
					open: 'animated fadeInUp',
					close: 'animated fadeOutDown',
					easing: 'swing',
					speed: 400
				},
				timeout:"2000",
				progressBar:true
			}).show();
		}
		// Обновление кол-ва для функций "Добавить"
		$('.goodsDataMainModificationId').val($(this).val());
		// Цена товара без изменений
		var price = parseInt($('.productView__price .price__now').attr('content'));
		var newPrice = 0;
		// Проверяем наличие добавленных товаров вместе с основным
		if ($('.productView__form [class^="goodsID-"]').length) {
			$('.productView__form [class^="goodsID-"]').each(function(){
				// Сумма всех добавленных товаров
				newPrice += parseInt($(this).attr('data-price'))
			});
		}
		// Считаем новую сумму товара с учетом добавленных
		var multi = String(val * price + newPrice);
		// Обновляем новую сумму
		$('.productView__price .price__now').attr('data-price', multi);
		$('.productView__price .price__now').find('.num').text(addSpaces(multi));
	});
}

// Переименование названий Месяца
function monthNames() {
	if ($('.month').length){
		$('.month').each(function (){
			if ($(this).text() === 'Jan') {
				$(this).text('Янв')
			}else if ($(this).text() === 'Feb') {
				$(this).text('Фев')
			}else if ($(this).text() === 'Mar') {
				$(this).text('Мар')
			}else if ($(this).text() === 'Apr') {
				$(this).text('Апр')
			}else if ($(this).text() === 'May') {
				$(this).text('Мая')
			}else if ($(this).text() === 'Jun') {
				$(this).text('Июн')
			}else if ($(this).text() === 'Jul') {
				$(this).text('Июл')
			}else if ($(this).text() === 'Aug') {
				$(this).text('Авг')
			}else if ($(this).text() === 'Sep') {
				$(this).text('Сен')
			}else if ($(this).text() === 'Oct') {
				$(this).text('Окт')
			}else if ($(this).text() === 'Nov') {
				$(this).text('Ноя')
			}else if ($(this).text() === 'Dec') {
				$(this).text('Дек')
			}
		});
	}
	if ($('.month.full').length){
		$('.month.full').each(function (){
			if ($(this).text() === 'Jan') {
				$(this).text('Января')
			}else if ($(this).text() === 'Feb') {
				$(this).text('Февраля')
			}else if ($(this).text() === 'Mar') {
				$(this).text('Марта')
			}else if ($(this).text() === 'Apr') {
				$(this).text('Апреля')
			}else if ($(this).text() === 'May') {
				$(this).text('Мая')
			}else if ($(this).text() === 'Jun') {
				$(this).text('Июня')
			}else if ($(this).text() === 'Jul') {
				$(this).text('Июля')
			}else if ($(this).text() === 'Aug') {
				$(this).text('Августа')
			}else if ($(this).text() === 'Sep') {
				$(this).text('Сентября')
			}else if ($(this).text() === 'Oct') {
				$(this).text('Октября')
			}else if ($(this).text() === 'Nov') {
				$(this).text('Ноября')
			}else if ($(this).text() === 'Dec') {
				$(this).text('Декабря')
			}
		});
	}
}


// Радио кнопки для модификаций
function newModification() {
	$('.goodsModificationsProperty').each(function(){
		a = $(this).find('select option:selected').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ a +'"]').addClass('active');
		dis = $(this).find('select option:disabled').attr('value');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').removeClass('active');
		$(this).find('.goodsModificationsValue[data-value="'+ dis +'"]').addClass('disabled');
	});
	$('.goodsModificationsValue').on('click', function(){
		$(this).parent().find('.goodsModificationsValue').removeClass('active');
		$(this).addClass('active');
		a = $(this).data('value');
		$(this).parent().parent().find('select option[value="' + a + '"]').prop('selected',true);
		$(this).parent().parent().find('select').trigger('change');
	});
	$('.goodsModificationsValue.disabled').off('click');
}

// Модификации select
function goodsModification() {
	// Функция собирает свойства в строку, для определения модификации товара
	function getSlugFromGoodsDataFormModificationsProperties(obj) {
		var properties = new Array();
		$(obj).each(function(i){
			properties[i] = parseInt($(this).val());
		});
		return properties.sort(function(a,b){return a - b}).join('_');
	}

	var
			goodsDataProperties = $('.goodsModificationsProperty select[name="form[properties][]"]'),  // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
			goodsDataModifications = $('.goodsModificationsList'); // Запоминаем блоки с информацией по модификациям, для ускорения работы

	// Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
	function updateVisibility (y) {
		// Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
		goodsDataProperties.each(function(j){
			// Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
			if( j != y ) {
				// Проходим по всем значениям текущего свойства модификации товара
				$(this).find('option').each(function(){
					// Записываем временный массив свойств, которые будем использовать для проверки существования модификации
					var checkProperties = new Array();
					$(goodsDataProperties).each(function(i){
						checkProperties[i] = parseInt($(this).val());
					});
					// Пытаемся найти модификацию соответствующую выбранным значениям свойств
					checkProperties[j] = parseInt($(this).attr('value'));
					// Собираем хэш определяющий модификацию по свойствам
					slug = checkProperties.sort(function(a,b){return a - b}).join('_');
					// Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
					if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
						$(this).attr('disabled', true);
						// Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
					} else {
						$(this).attr('disabled', false);
					}
				});
			}
		});
	}
	// Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
	// Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
	updateVisibility (0);
	// Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
	updateVisibility (1);

	// Изменение цены товара при изменении у товара свойства для модификации
	goodsDataProperties.each(function(y){
		$(this).change(function(){
			var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
					modificationBlock             = $('.goodsModificationsList[rel="'+slug+'"]'),
					modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
					modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
					modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
					modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
					modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
					modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
					modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
					modificationDescription       = modificationBlock.find('.description').html(),
					modificationIsInCompareList   = modificationBlock.find('[name="is_has_in_compare_list"]').val(), // Отследить что делает
					modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
					goodsModView                  = $('.productView'),
					goodsModificationId           = $('.goodsModificationId'),
					goodsPriceNow                 = $('.productView .price__now'),
					goodsPriceOld                 = $('.productView .price__old'),
					goodsAvailableQty             = $('.productView__qty'),
					goodsAvailable                = goodsModView.find('.productView__available'),
					goodsAvailableTrue            = goodsAvailable.find('.available__true'),
					goodsAvailableFalse           = goodsAvailable.find('.available__false'),
					goodsArtNumberBlock           = $('.productView__articles'),
					goodsArtNumber                = goodsArtNumberBlock.find('.goodsModArtNumber'),
					goodsModDescriptionBlock      = $('.goodsModDescription'),
					goodsModRestValue             = goodsModView.find('.goodsModRestValue');

			// Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
			if(modificationBlock.length) {
				// Цена товара
				goodsPriceNow.html(modificationPriceNowFormated);
				goodsPriceNow.attr('data-price', modificationPriceNow);
				goodsPriceNow.attr('content', modificationPriceNow);
				$('.related .checkbox__input').each(function(i, checkbox){
					var $checkbox = $(checkbox);
					var checkboxActive = $checkbox.prop('checked');
					if(checkboxActive) {
						changePrice($checkbox, checkboxActive);
					}
				});
				// Старая цена товара
				if(modificationPriceOld>modificationPriceNow) {
					goodsPriceOld.html(modificationPriceOldFormated);
				} else {
					goodsPriceOld.html('');
					goodsPriceOld.hide();
				}
				// Есть ли товар есть в наличии
				if(modificationRestValue>0) {
					goodsModView.removeClass('empty');
					goodsModRestValue.html('В наличии');
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
					// Если товара нет в наличии
				} else {
					goodsModView.addClass('empty');
					goodsAvailable.find('i').attr('class', 'icon-close');
					goodsModRestValue.html(modificationRestValue);
					goodsModRestValue.attr('data-value', modificationRestValue);
					goodsAvailableQty.find('.quantity').attr('max', modificationRestValue);
					goodsAvailableQty.find('.quantity').val("1");
				}
				// Много Мало
				if(modificationRestValue>10) {
					goodsModRestValue.html('В наличии Много');
					goodsAvailable.find('i').attr('class', 'icon-alot');
					goodsAvailable.attr('class', 'productView__available productView__icon alot')
				} else if(modificationRestValue == 0) {
					goodsModRestValue.html('Нет в наличии');
					goodsAvailable.find('i').attr('class', 'icon-close');
					goodsAvailable.attr('class', 'productView__available productView__icon empty')
				} else {
					goodsModRestValue.html('В наличии Мало');
					goodsAvailable.find('i').attr('class', 'icon-few');
					goodsAvailable.attr('class', 'productView__available productView__icon few')
				}

				// Покажем артикул модификации товара, если он указан
				if(modificationArtNumber.length>0) {
					goodsArtNumberBlock.show();
					goodsArtNumber.html(modificationArtNumber);
					// Скроем артикул модификации товара, если он не указан
				} else {
					goodsArtNumberBlock.hide();
					goodsArtNumber.html('');
				}
				// Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
				if(modificationDescription.length > 0) {
					goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
				} else {
					goodsModDescriptionBlock.hide().html();
				}
				// Идентификатор товарной модификации
				goodsModificationId.val(modificationId);
				$('.goodsDataMainModificationId').attr('name','form[goods_mod_id][' + modificationId + ']');
				var goodsDataMainImage = $('.goodsDataMainImage').attr('data-src');
				// Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
				function changePrimaryGoodsImage(goods_mod_image_id) {
					// Если не указан идентификатор модификации товара, значит ничего менять не нужно.
					if(1 > goods_mod_image_id) {
						return true;
					}
					var
							// Блок с изображением выбранной модификации товара
							goodsModImageBlock = $('.productView__imageBox [data-id="' + parseInt(goods_mod_image_id) + '"'),
							// Блок, в котором находится главное изображение товара
							MainImageBlock = $('.productView__image'),
							// Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
							MediumImageUrl = goodsModImageBlock.attr('data-href'),
							// Главное изображение, в которое будем вставлять новое изображение
							MainImage = MainImageBlock.find('img')
					;
					// Если изображение модификации товара найдено - изменяем главное изображение
					MainImage.attr('src', MediumImageUrl).parent().attr('href', MediumImageUrl);
					// Изменяем идентификатор главного изображения
					MainImageBlock.attr("data-id", parseInt(goods_mod_image_id));
					return true;
				}
				// Обновляем изображние модификации товара, если оно указано
				changePrimaryGoodsImage(modificationGoodsModImageId);
			} else {
				// Отправим запись об ошибке на сервер
				sendError('no modification by slug '+slug);
				alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
			}
			// Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
			updateVisibility(y);
		});
	});

	function changePrice(currentCheckbox, checkboxActive){
		var $checkbox = currentCheckbox;
		var checkboxPrice = $checkbox.data('mod-price');
		var $priceNowBlock = $('.productView__price .price__now');
		var nowPrice = $priceNowBlock.attr('data-price');
		var newPrice = 0;
		if (checkboxActive) {
			newPrice = String(parseInt(nowPrice) + parseInt(checkboxPrice));
			$priceNowBlock.attr('data-price', parseInt(nowPrice) + parseInt(checkboxPrice))
		} else {
			newPrice = String(nowPrice - checkboxPrice);
			$priceNowBlock.attr('data-price', parseInt(nowPrice)  - parseInt(checkboxPrice))
		}
		$priceNowBlock.find('.num').text(addSpaces(newPrice))
	}
}


///////////////////////////////////////
// Сравнение товаров
///////////////////////////////////////
function compare() {
	var owlCompare = $('.CompareGoodsTableTbody .owl-carousel');
	owlCompare.owlCarousel({
		items: 4,
		margin: 30,
		loop: false,
		rewind: false,
		lazyLoad: true,
		dots: false,
		nav: false,
		navContainer: '',
		navText: [ , ],
		autoHeight: true,
		autoHeightClass: 'owl-height',
		autoplay: false,
		autoplayHoverPause: false,
		smartSpeed: 500,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		responsiveClass: true,
		responsiveRefreshRate: 100,
		responsive: {
			0:{items:2},
			320:{items:2},
			481:{items:2},
			641:{items:3},
			768:{items:3},
			992:{items:4},
			1200:{items:4}
		},
		onInitialized: carouselInitialized,
		onChanged: carouselInitialized
	});
	function carouselInitialized(event){
		if (event.item.count > event.page.size) {
			$('.CompareGoods__nav .owl-nav').css('display', 'block');
		}else{
			$('.CompareGoods__nav .owl-nav').css('display', 'none');
		}
	}
	$('.CompareGoods__nav .owl-nav .owl-prev').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('prev.owl.carousel');
	});
	$('.CompareGoods__nav .owl-nav .owl-next').click(function(event) {
		$('.CompareGoodsTableTbody .owl-carousel').trigger('next.owl.carousel');
	});
	// Сравнение товаров. Фильтр в верхней навигации. Отображение всех и различающихся характеристик товара
	$('.CompareGoods__switch').on('click', function(){
		$(this).toggleClass('switch-on');
		if ($(this).hasClass('switch-on')) {
			$(this).trigger('on.switch');
			$('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
			$('.CompareGoodsTableTbodyComparisonLine.same').hide();
		} else {
			$(this).trigger('off.switch');
			$('.CompareGoodsTableTbodyComparisonLine:hidden').show();
		}
	});
}


///////////////////////////////////////
// Корзина
///////////////////////////////////////
function cartQuantity(){
	$('.cartqty').change($.debounce(300, function(){
		var quantity = $(this);
		var qVal = $(this).val();
		if(qVal >= '1'){
			var id = $(this).closest('.cart__item').data('id');
			var qty = $(this).val();
			var data = $('.cartForm').serializeArray();
			data.push({name: 'only_body', value: 1});
			$.ajax({
				data: data,
				cache:false,
				success:function(d){
					quantity.val($(d).find('.cart__item[data-id="' + id + '"] .cartqty').val());
					item = $('.cart__item[data-id="' + id + '"]');
					item.find('.cartPriceTotal span').html($(d).find('.cart__item[data-id="' + id + '"] .cartPriceTotal span').html());
					$('.cartTotal').html($(d).find('.cartTotal').html());
					c = $(d).find('.cart__item[data-id="' + id + '"] .cartqty').val();
					// Вызов функции быстрого заказа в корзине
					$('#startOrder').on('click', function() {
						startOrder();
						return false;
					});
					economy();
					if(qty > c){
						$('.cart__error').remove();
						$('.cartTable').before('<div class="cart__error warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
						$('.cart__error').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
						$('.cartqty').removeAttr('readonly');
					}
				}
			});
		}else{
			$(this).val('1');
			$(this).trigger('change');
		}
	}));
	quantity();
}

// Удаление товара из корзины
function cartDelete(s){
	var yep = confirm('Вы точно хотите удалить товар из корзины?');
	if(yep == true){
		s.closest('.cart__item').fadeOut();
		url = s.data('href');
		$.ajax({
			url:url,
			cache:false,
			success:function(d){
				$('.page-cartTable').html($(d).find('.page-cartTable').html());
				cartQuantity();
				economy();
				$('#startOrder').on('click', function() {
					startOrder();
					return false;
				});
			}
		});
	}else{
		return false;
	}
}

// Функция быстрого оформления заказа в корзине
function startOrder(){
	var globalOrder = $('#globalOrder');
	var cartTable = $('.cartTable');
	var closeOrder = $('#closeOrder');
	var startOrder = $('#startOrder');
	//объект блока куда будет выводиться форма быстрого заказа
	var OrderAjaxBlock = $('#OrderAjaxBlock');
	var urlQuickForm = '/cart/add'; // адрес страницы с формой
	// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
	var quickFormData = [
		{name: 'ajax_q', value: 1},
		{name: 'fast_order', value: 1}
	];
	cartTable.addClass('disable');
	globalOrder.show('slow');
	closeOrder.addClass('show');
	$('.cart__clear').hide();
	startOrder.hide();
	$('.cartForm').hide();
	$('.cartTotal__change').show();
	$('.page-cartTable').addClass('start-order')
	$('#pdt__cart').hide();
	$.ajax({
		type: "POST",
		cache: false,
		url: urlQuickForm,
		data: quickFormData,
		success: function(data) {
			OrderAjaxBlock.html($(data).find('.fastOrderContent').wrap('<div></div>').html());
			OrderAjaxBlock.show('slow');
			$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
			showPass();
			orderScripts();
			orderScriptsSelect();
			coupons();
			// Стили для новых селектов
			$(".form__phone").mask("+7 (999) 999-9999");
			$("#sites_client_phone").mask("+7 (999) 999-9999");
			$('.second-stage .cartNav__icon').addClass('active');
			$('.second-stage').next().addClass('active');
			$('#closeOrder, .closeOrder').on('click', function() {
				cartTable.removeClass('disable');
				globalOrder.hide();
				closeOrder.removeClass('show');
				startOrder.show();
				$('.cartForm').show();
				$('.cartTotal__change').hide();
				$('.page-cartTable').removeClass('start-order')
				$('#pdt__cart').show();
				$('.second-stage .cartNav__icon').removeClass('active');
				$('.second-stage').next().removeClass('active');
				$('.cart__clear').show();
				$('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top}, 800);
				return false;
			});
			// Функция валидации полей в быстром заказе
			validCart();
		}
	});
	return false;
}


///////////////////////////////////////
// Функция валидации полей в быстром заказе
///////////////////////////////////////
function validCart(){	
	// Валидация формы на странице оформления заказа
	$(".total__buttons button, #makeOrder").on('click', function(){
		var form = $(".fastOrder__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});
	// Выключение кнопки оформления заказа если не все поля заполнены
	$(".fastOrder__form [required]").blur(function(){
		if($('.fastOrder__form').valid()) {
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
			$("#makeOrder").removeClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
		} else {
			$(".total__buttons button").addClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Заполните все поля');
			$("#makeOrder").addClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Заполните все поля');
		}
	});
	// Выключение кнопки оформления заказа если не все поля заполнены
	$(function(){
		if($('.fastOrder__form').valid()) {
			$(".total__buttons button").removeClass('disabled');
			$(".total__buttons button").attr('data-tooltip', 'Оформить заказ');
			$("#makeOrder").removeClass('disabled');
			$("#makeOrder").attr('data-tooltip', 'Оформить заказ');
		}else{
			$(".fastOrder__form input, .fastOrder__form textarea, .fastOrder__form select").removeClass('error');
		}
	});
	//
	$('#quickDeliveryComment').blur(function(){
		var val = $(this).val();
		$('.quickDeliveryComment').val(val)
	})
}


///////////////////////////////////////
// Функция скрывания категорий и меню в подвале, если больше 5 пунктов.
///////////////////////////////////////
function footerLinksMore(){
	$('.footer__links').each(function(){
		var t = $(this);
		// Добавляем кнопку Еще если больше 5 пунктов
		if(t.find('li').length > 5) {
			t.append('<li class="show"><a class="footer__links-open" href="javascript:;"><span>Ещё</span><i class="icon-tick_down"></i></a></li>');
		}
		// Действия при нажатии на кнопку Еще
		t.find('.footer__links-open').on('click', function(){
			if($(this).hasClass('opened')){
				$(this).removeClass('opened')
				t.find('li').removeClass('show')
				$(this).parent().addClass('show')
				$(this).find('span').text('Еще')
			}else{
				$(this).addClass('opened')
				t.find('li').addClass('show')
				$(this).find('span').text('Скрыть')
			}
		});
	});	
}

///////////////////////////////////////
// Загрузка основных функций шаблона
///////////////////////////////////////
$(document).ready(function(){
  userAgent();
  openMenu();
  showPass();
  mainnav('#menu .mainnav', '1', 767);
	mainnav('#footer .footer__menu', '1', 639);
  toTop();
	viewed();
	footerLinksMore();
	openCatalog();
  // Ленивая загрузка
  $(function(){
    var observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  });
  
  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  // Маска ввода телефона
  $(".form__phone").mask("+7 (999) 999-9999");

  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);

	$('.loading').addClass('loaded');
	$('section, div').removeClass('loading');
});

// Запуск основных функций для разных разрешений экрана
$(document).ready(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
});

// Запуск функций при изменении экрана
$(window).resize(function(){
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
  mainnav('#menu .mainnav', '1', 767);
	mainnav('#footer .footer__menu', '1', 640);
});


/*
//Функции для удобства
function addActive(obj){obj.addClass('active');}
function removeActive(obj){obj.removeClass('active')}
//if (addOpened(t));
function addOpened(obj){obj.hasClass('opened') ? obj.removeClass('opened') : obj.addClass('opened')}*/

function addActive(obj){obj.hasClass('active') ? obj.removeClass('active') : obj.addClass('active')}


$(document).ready(function(){
});

// Указать имя для обратной связи
function modalNameOpen(){
	$('.form__fields-open').on('click', function(event){
		event.preventDefault();
    $(this).toggleClass('opened');
		if ($(this).hasClass('opened')){
			$('.form__fields-hidden').slideDown('slow');
			$('.form__fields-hidden input').val('').change();
			$(this).text('Не указывать имя');
		}else{
			$('.form__fields-hidden').slideUp('slow');
			$(this).text('Указать свое имя');			
			setTimeout(function () {
				$('.form__fields-hidden input').val('Имя не указано').change();
			}, 600);
		}
	})
}

// Функция Открытия категорий при наведении
function hoverCatalog(){
	// Добавление класса hover для отображения подкатегорий
  $('#menu .catalog__item[data-level="0"]').hover(function() {
    var obj = $(this);
    setTimeout(function() {
      $('#menu .catalog__item[data-level="0"]').removeClass('hover');
      obj.addClass('hover');
      var mainCatHeight = $('#menu .catalog__items').innerHeight();
      var subCatHeight = obj.find('.sub[data-level="1"]').innerHeight();
      // Выравнивание блоков по размерам
      if (subCatHeight > mainCatHeight) {
        $('#menu .catalog__items .catalog__item[data-level="0"].parent.hover .sub[data-level="1"]').css('border-bottom','1px solid #ececef');
        $('#menu .catalog__items').css('height', subCatHeight)
      }else {
        $('#menu .catalog__items').css('height', 'auto')
      }
    },500);
  });
}

// Функция Открытия каталога
function openCatalog(){
	var subs = 3;
	var length = $('#menu .catalog__content .catalog__items .catalog__item').length;
	// Сортируем подкатегории по уровням
	$('#menu .catalog__content .catalog__items .catalog__item').each(function(){
		var level = $(this).data('level')
		for (var i = 0; i < subs; i++){
			if (level == i) {
				$(this).addClass('level-'+ i +'');
				$('.catalog__sub-level-'+ i +' .catalog__sub-items').append($(this))
			}
			level == '0' ? $(this).addClass('show') : $(this).removeClass('show')
			if (level == '2') {
				$('.catalog__sub .catalog__item[data-id="'+ $(this).data('parent') +'"]').append($(this))
			}
		}
	});

	// Отображаем подкатегории при наведении
	$('.catalog__sub .catalog__item').mouseover(function(){
		$('.catalog__sub .catalog__item').removeClass('hover')
		$(this).addClass('hover')
		var id = $(this).data('id');
		var level = $(this).data('level')
		var next = level + 1;
		var next2 = level + 2;
		var prev = next - 1;
		$('.catalog__sub-level-'+ next +' .catalog__item').each(function(){
			$('.catalog__sub-level-'+ next +' .catalog__item').removeClass('show')
			$('.catalog__sub-level-'+ next +' .catalog__item').parent().parent().removeClass('show')
			$('.catalog__sub-level-'+ next2 +' .catalog__item').removeClass('show')
			$('.catalog__sub-level-'+ next2 +' .catalog__item').parent().parent().removeClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item').removeClass('hovered')
			$('.catalog__sub-level-'+ next +' .catalog__item[data-parent="'+ id +'"]').addClass('show')
			$('.catalog__sub-level-'+ next +' .catalog__item[data-parent="'+ id +'"]').parent().parent().addClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"]').parent().parent().addClass('show')
			$('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"]').addClass('hovered')
			var txt = $('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"] .catalog__name').text();
			var img = $('.catalog__sub-level-'+ prev +' .catalog__item[data-id="'+ id +'"].parent .catalog__image').html();
			$('.catalog__sub-level-1 .catalog__sub-label').text(txt);
			$('.catalog__sub-image').html(img);
		});
	});

	// Проверяем категории
	$('#menu .catalog__item[data-level="1"]').each(function (event){
		// Добавляем порядок главных категорий
		var count = event + 1;
		var t = $(this);
		var tLen = $('#menu .catalog__item[data-level="1"]').length;
		var itemLen = t.find('.catalog__item[data-level="2"]').length;
		t.css('order', count)
		// Если в категории нет подкатегорий, переносим ее в конец
		if(itemLen == 0) {
			t.css('order', tLen)
		}
	});
}
