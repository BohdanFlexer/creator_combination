const addDarkenedBg = (duration) = () => {

	if (document.querySelector(".dark-bg")) {
		document.querySelector(".dark-bg").remove();
		document.body.style = ''
	}

	let titleBg = document.createElement("div");
	titleBg.classList.add("dark-bg");
	document.body.appendChild(titleBg);
	document.body.style.overflow = 'hidden'

	setTimeout(() => titleBg.style.opacity = ".5", duration);
	return titleBg
}

const createTitle = (titleText, duration = 200, clearDuration = 2000, createBg) => {
	if (clearDuration) clearDuration += duration
	if (document.querySelector(".popup")) {
		document.querySelector(".popup").remove();
	}

	if (createBg) addDarkenedBg(duration)
	const titleWrapper = document.createElement("div");
	titleWrapper.classList.add("popup");
	titleWrapper.innerHTML = `<h1 class="popup__title">${titleText}</h1>`;

	document.body.appendChild(titleWrapper);

	setTimeout(() => {
		if (window.innerWidth <= 400) {
			titleWrapper.style.top = "5vw";
		} else {
			titleWrapper.style.top = "10px";
		}
	}, duration);
	if (clearDuration) {
		setTimeout(() => {
			titleWrapper.style.top = "-100px";
			setTimeout(() => titleWrapper.remove(), 200)
		}, duration + clearDuration);
	}

	return titleWrapper;
};

const createPrompt = (title, duration, clearDuration) => {
	const wrapper = createTitle(title, duration, clearDuration)
	wrapper.innerHTML += `
	<div class="popup__btns">
		<button class="popup__btn btn" id="prompt-confirm">ОК</button>
		<button class="popup__btn btn" id="prompt-reject">Скасувати</button>
	</div>`
	const confirmBtn = wrapper.querySelector('#prompt-confirm')
	const rejectBtn = wrapper.querySelector('#prompt-reject')
	return {
		confirmBtn,
		rejectBtn
	}
}

const clearStyle = (deleteBg = true) => {
	let titleWrapper = document.querySelector(".popup")
	let titleBg = document.querySelector(".dark-bg")

	if (titleWrapper) {
		titleWrapper.style.top = "-100px"
		if (titleBg && deleteBg) {
			titleBg.style.opacity = "0"
			document.body.style = ''
		}
		if (selectAll) selectAll.classList.add("hide")
		if (unselectAll) unselectAll.classList.add("hide")
		if (elementsList.classList.contains("elements__list-active")) elementsList.classList.remove("elements__list-active")
		setTimeout(() => {
			titleWrapper.remove()
			if (titleBg && deleteBg) titleBg.remove()
		}, 200)

		elementsList.childNodes.forEach((i) => {
			if (i.textContent.trim()) {
				if (i.classList.contains("active")) {
					i.classList.remove("active")
				}
				if (i.classList.contains("check")) {
					i.classList.remove("check")
				}
			}
		});
	}
}