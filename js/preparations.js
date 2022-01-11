if (elems.a) {
	elems = elems.a
	localStorage.setItem("saveElems", JSON.stringify(elems))
}
elems ? elems.forEach(elem => createLi(elem)) : false

if (optionsInRandom) {
	enableOptionsBtn.checked = optionsInRandom.enableOptions
	countEnableBtn.value = optionsInRandom.count
	jumpEnableBtn.checked = optionsInRandom.jumpEnable
	changeJumpEnableBtn.checked = optionsInRandom.changeJumpEnable
	repeatElemBtn.checked = optionsInRandom.repeatEnable
}

if (MOBILE_DEVICE.test(navigator.userAgent)) {
	btnEventStyle = ".btn:active {background-color: transparent;}"
} else {
	btnEventStyle = ".btn:hover {background-color: transparent;}"
}
document.styleSheets[1].insertRule(btnEventStyle, 7);

let sortable = new Sortable.default(document.querySelector('ol.elements__list'), sortableOptions).on('drag:stopped', clearAndSaveElems);

if (elementsList.childNodes[1]) {
	elemWidth = elementsList.childNodes[1].offsetWidth
}

const smoothDisabled = () => {
	setTimeout(() => {
		document.querySelector(".draggable-source--placed").classList.remove("active")
	}, 0)
}

const smoothEnabled = () => {
	const mirror = document.querySelector(".draggable-mirror")
	const dragSource = document.querySelector(".draggable-source--is-dragging")
	mirror.style.width = elemWidth + "px"
	setTimeout(() => {
		if (mirror) mirror.classList.add("active")
		if (dragSource) dragSource.classList.remove("active")
	}, 200)
}
sortable.on('sortable:sort', smoothEnabled);
sortable.on('drag:stopped', smoothDisabled);

const checkingOptions = (once = true) => {
	// console.log("once: " + once)
	enableOptions = enableOptionsBtn.checked
	if (!enableOptions) {
		countEnableBtn.disabled = true
		jumpEnableBtn.disabled = true
		changeJumpEnableBtn.disabled = true
		repeatElemBtn.disabled = true
		if (once) {
			repeatElemBtn.addEventListener('click', popupCheckRepeations)
		}
	} else {
		countEnableBtn.disabled = false
		jumpEnableBtn.disabled = false
		changeJumpEnableBtn.disabled = false
		repeatElemBtn.disabled = false
		// console.log(repeatElemBtn.checked)
		if (repeatElemBtn.checked && once) {
			popupCheckRepeations()
		}
		if (once) {
			repeatElemBtn.addEventListener('click', popupCheckRepeations)
		}
	}
	optionsInRandom.enableOptions = enableOptions
	localStorage.setItem("optionsInRandom", JSON.stringify(optionsInRandom))
}
checkingOptions(false)