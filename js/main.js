import {
	mergeHeader,
	mergeInfoBoxSection,
	addActiveToCurrentView,
} from "./config/dom-elements.js";

export const main = document.querySelector(".main");
export const body = document.querySelector("body");

const renderApp = function () {
	mergeHeader();
	mergeInfoBoxSection();
};

renderApp();

const checkMailValid = function () {
	const formError = document.querySelector(".form__error-email");
	const mailInput = document.querySelector("#mail");
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (regex.test(mailInput.value)) {
		formError.classList.remove("form__error-active");
		mailInput.classList.remove("form__input-error");
		return true;
	} else if (mailInput.value.length === 0) {
		mailInput.classList.add("form__input-error");
		formError.classList.add("form__error-active");
		return false;
	} else {
		formError.classList.add("form__error-active");
		formError.innerText = "Wrong syntax, please try again!";
		mailInput.classList.add("form__input-error");
		return false;
	}
};

const checkNameValid = function () {
	const formError = document.querySelector(".form__error-name");
	const nameInput = document.querySelector("#name");
	const regex = /^[\s\p{L}]+$/u;

	if (regex.test(nameInput.value)) {
		formError.classList.remove("form__error-active");
		nameInput.classList.remove("form__input-error");
		return true;
	} else if (nameInput.value.length == 0) {
		nameInput.classList.add("form__input-error");
		formError.classList.add("form__error-active");
		return false;
	} else {
		nameInput.classList.add("form__input-error");
		formError.classList.add("form__error-active");
		formError.innerText = "You have to start your name with letter!";
		return false;
	}
};

const checkPhoneValid = function () {
	const formError = document.querySelector(".form__error-phone");
	const numberInput = document.querySelector("#number");
	const regex = /^\d+$/;

	if (regex.test(numberInput.value)) {
		formError.classList.remove("form__error-active");
		numberInput.classList.remove("form__input-error");
		return true;
	} else if (numberInput.value.length == 0) {
		numberInput.classList.add("form__input-error");
		formError.classList.add("form__error-active");
		return false;
	} else {
		numberInput.classList.add("form__input-error");
		formError.classList.add("form__error-active");
		formError.innerText = "You have to add only numbers!";
		return false;
	}
};

function checkValid() {
	if (checkNameValid() && checkMailValid() && checkPhoneValid()) {
		const stepBox = document.querySelectorAll(".step-box");
		main.dataset.currentview = 1;
		addActiveToCurrentView(stepBox);
	}
	checkNameValid();
	checkMailValid();
	checkPhoneValid();
}

body.addEventListener("click", (e) => {
	if (e.target.className === "btn-next") {
		checkValid();
	}
});
