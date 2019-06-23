let mySwiper = new Swiper ('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	roundLengths: true,
	
	// Navigation arrows
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	},
	
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	
	slidesPerView: 6,
	spaceBetween: 30
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVudnJhZGl5IiwiYSI6ImNqeDM4OHJ2czBnNzg0OXB5dDV4bmlzbTgifQ.Mpyj8KRF_3BcYoRhTlH9yA';
if (!mapboxgl.supported()) {
	alert('Your browser does not support Mapbox GL');
} else {
	let map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [30.590726, 50.428568],
		zoom: 16
	});
}

$('#form__phone').mask('+38(999) 999-99-99');

$('#orderForm').validate({
	rules: {
		name: {
			required: true,
		},
		email: {
			required: true,
		},
		phone: {
			required: true
		}
	},
	messages: {
		name: {
			required: 'Name field is required.'
		},
		email: {
			required: 'Email field is required'
		},
		phone: {
			required: 'Phone number field is required.'
		}
	}
});

$(function () {
	$("#orderForm").submit(function (event) {
		const formName = $('#form__name').val();
		const formEmail = $('#form__email').val();
		const formPhone = $('#form__phone').val();
		event.preventDefault();
		if (formName && formEmail && formPhone) {
			let data = {
				message: `
	                Заказ индивидуальной консультации:
	                Имя - ${formName},
	                Email - ${formEmail},
	                Телефон - ${formPhone},
	                `,
			};
			$.ajax({
				type: "POST",
				url: "js/email.php",
				data: data,
				success: function () {
					alert(`Заявка принята`);
				}
			});
		} else {
			alert("Заполните пожалуйста форму!")
		}
		
		return false;
	});
});

const slowScroll = (id) => {
	$("".concat(id.split("")[0] === "." ? "" : "#").concat(id.toString())).on("click", function (event) {
		event.preventDefault();
		const scrollTo = $(this).attr('href'),
			top = $(scrollTo).offset().top ;
		$('body,html').animate({
			scrollTop: top
		}, 1000);
	});
};

slowScroll('companies-btn');
slowScroll('candidates-btn');
slowScroll('contacts-btn');
slowScroll('startups-btn');
slowScroll('.text-block__text-column__button');
slowScroll('.header__main-info__contact-button');
