import { main, body } from "../main.js";

const headerInfo = [
	{ stepNumberDecimal: 1, stepNumberText: "Step 1", text: "YOUR INFO" },
	{ stepNumberDecimal: 2, stepNumberText: "Step 2", text: "SELECT PLAN" },
	{ stepNumberDecimal: 3, stepNumberText: "Step 3", text: "ADD-ONS" },
	{ stepNumberDecimal: 4, stepNumberText: "Step 4", text: "SELECT PLAN" },
];

const firstView = {
	heading: "Personal info",
	provide: "Please provide your name, email adress, and phone number.",
};

const createHeader = function () {
	const header = document.createElement("header");
	header.className = "header steps";

	return header;
};

const createStepsBox = function () {
	const stepsBox = document.createElement("div");
	stepsBox.classList.add("steps-box");

	return stepsBox;
};

const createStep = function () {
	const steps = [];

	headerInfo.forEach((info) => {
		const stepBox = document.createElement("div");
		stepBox.classList.add("step-box");

		const step = document.createElement("div");
		step.classList.add("step");
		const stepNumber = document.createElement("div");
		stepNumber.classList.add("step__number");

		const stepNumberSpan = document.createElement("span");
		stepNumberSpan.classList.add("step__number-span");
		stepNumberSpan.innerText = info.stepNumberDecimal;

		const stepBoxNext = document.createElement("div");
		stepBoxNext.classList.add("step-box-next");

		const stepDigit = document.createElement("p");
		stepDigit.classList.add("step__digit");
		stepDigit.innerText = info.stepNumberText;

		const stepName = document.createElement("p");
		stepName.classList.add("step__name");
		stepName.innerText = info.text;

		stepNumber.appendChild(stepNumberSpan);

		stepBoxNext.append(stepDigit, stepName);

		step.append(stepNumber);

		stepBox.append(step, stepBoxNext);

		steps.push(stepBox);
	});

	addActiveToCurrentView(steps);

	return steps;
};

export const addActiveToCurrentView = function (steps) {
	const currentView = Number(main.dataset.currentview);
	console.log(steps);

	steps.forEach((step) => {
		step.children[0].classList.remove("step-active");
	});

	steps[currentView].children[0].classList.add("step-active");
	console.log(currentView);
};

export const mergeHeader = function () {
	const header = createHeader();
	const stepsBox = createStepsBox();
	const steps = createStep();

	main.append(header);
	header.append(stepsBox);

	steps.forEach((step) => {
		stepsBox.append(step);
	});
};

const createInfoBoxSection = function () {
	const infoBoxSection = document.createElement("section");
	infoBoxSection.classList.add("info-box");

	return infoBoxSection;
};

const createInfo = function (view) {
	const info = document.createElement("div");
	info.classList.add("info");

	const infoHeading = document.createElement("p");
	infoHeading.classList.add("info__heading");
	infoHeading.innerText = view.heading;

	const infoProvide = document.createElement("span");
	infoProvide.classList.add("info__provide");
	infoProvide.innerText = view.provide;

	info.append(infoHeading, infoProvide);

	return info;
};

const createForm = function () {
	const form = document.createElement("form");
	form.classList.add("form");
	form.setAttribute("method", "get");
	form.innerHTML = `
	<form class="form" method="get">
	<div class="form-input-upper">
	  <label class="form__label" for="name">Name</label>
	  <span class="form__error form__error-name">This field is required!</span>
	</div>
	<input aria-label="Enter your name" id="name" class="form__input form__input--name error-input" type="text"
	  placeholder="e.g Stephen King">

	<div class="form-input-upper">
	  <label class="form__label" for="mail">Email Adress</label>
	  <span class="form__error form__error-email">This field is required!</span>
	</div>
	<input aria-label="Enter your email" id="mail" class="form__input form__input--mail" type="email"
	  placeholder="e.g. stephenking@lorem.com">

	<div class="form-input-upper">
	  <label class="form__label" for="number">Phone Number</label>
	  <span class="form__error form__error-phone">This field is required!</span>
	</div>
	<input aria-label="Enter your number" id="number" class="form__input form__input--number" type="tel"
	  placeholder="e.g. +1234 567 890">
  </form>
	`;

	return form;
};

const createButtons = function (device) {
	const buttonsMobileDiv = document.createElement("div");
	buttonsMobileDiv.className = `buttons ${device}`;

	return buttonsMobileDiv;
};

const createButton = function (type, text) {
	const button = document.createElement("button");
	button.setAttribute("aria-label", `${type} step`);
	button.classList.add(`btn-${type}`);
	button.setAttribute("role", "button");
	button.innerText = text;
	return button;
};

export const mergeInfoBoxSection = function () {
	const infoBoxSection = createInfoBoxSection();
	const info = createInfo(firstView);
	const form = createForm();
	const buttonsDesktop = createButtons("mobile");
	const buttonsMobile = createButtons("desktop");
	const buttonBackDesktop = createButton("back", "Go back");
	const buttonNextDesktop = createButton("next", "Next step");
	const buttonBackMobile = createButton("back", "Go back");
	const buttonNextMobile = createButton("next", "Next step");

	if (main.dataset.currentview == 0) {
		buttonBackDesktop.style.visibility = "hidden";
		buttonBackMobile.style.visibility = "hidden";
	}

	main.append(infoBoxSection);
	buttonsDesktop.append(buttonBackDesktop, buttonNextDesktop);
	infoBoxSection.append(info, form, buttonsDesktop);
	buttonsMobile.append(buttonBackMobile, buttonNextMobile);
	body.append(buttonsMobile);
};
