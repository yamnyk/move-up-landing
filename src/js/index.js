var mySwiper = new Swiper ('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	
	
	// Navigation arrows
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	},
	
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	slidesPerView: 5,
	spaceBetween: -74
})

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