const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');
let buttonOfuP = document.getElementById('buttonOfuP')
let date = document.getElementById('date')



hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});


window.addEventListener("DOMContentLoaded",
	function () {
		document.addEventListener('scroll', () => {
			if (window.scrollY == 0)
				buttonOfuP.classList.add("hideButtonOfuP")
			else
				buttonOfuP.classList.remove("hideButtonOfuP")
		})
		buttonOfuP.addEventListener('click', () => {
			window.scroll(0, 0)
		})
	});


window.addEventListener('DOMContentLoaded', () => {
	newDate = new Date
	date.innerText = newDate.getFullYear() 
})

