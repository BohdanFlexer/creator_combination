const deleteAllList = (list, arr, arrName) => {
	clearStyle()
	addSelectorInListItem(saveList, null, "active")
	list.innerHTML = ''
	arr = []
	localStorage.setItem(arrName, JSON.stringify(arr))
	return arr
}

function checkResponsefromDelete(list, arr, arrName) {
	return new Promise((resolve, reject) => {
		if (list.childElementCount) {
			const modal = createPrompt("Готові здійснити видалення?", 200, false)

			const checkClickforDelete = (e) => {
				resolve(deleteAllList(list, arr, arrName))
			}
			const checkEnterDownforDelete = (e) => {
				if (e.key === "Enter" || e.keyCode === 13) {
					resolve(deleteAllList(list, arr, arrName))
				}
			}
			modal.rejectBtn.addEventListener("click", () => {
				reject(elems)
				clearStyle()
			})

			modal.confirmBtn.addEventListener("click", checkClickforDelete, {
				once: true
			})
			window.addEventListener("keydown", checkEnterDownforDelete, {
				once: true
			})
		} else {
			reject(elems)
			createPopup("Немає елементів", 0, 1000)
		}
	})

}

const changeAllList = () => {
	changeAllBtn.disabled = true
	changeAllBtn.textContent = "Disabled"
	addSelectorInListItem(saveList, null, "active")

	elems = []
	let jumpEnable = randomJumpEnableBtn.checked
	let repeatEnable = repeatElemBtn.checked

	let arr = dataElems.e
	elementsList.childNodes.forEach((item, num) => {
		if (jumpEnable) {
			if (num === elementsList.childNodes.length - 1) {
				arr = dataElems.j
			}
		}
		item = item.querySelector('.elements__item-text')
		if (repeatEnable) {

			createNewDataElems(1, item, arr).then(() => {
				changeAllBtn.disabled = false
				changeAllBtn.textContent = "Change all"
			})
		} else {
			iterate(1, item, arr).then(() => {
				changeAllBtn.disabled = false
				changeAllBtn.textContent = "Change all"
			})
		}
	})
	clearStyle()
}

const checkResponsefromChange = () => {
	if (elementsList.childElementCount) {
		const modal = createPrompt("Готові здійснити заміну?", 200, false)

		const checkClickforChange = (e) => {
			changeAllList(modal)
			modal.confirmBtn.removeEventListener("click", checkClickforChange)
		}
		const checkEnterDownforChange = (e) => {
			if (e.key === "Enter" || e.keyCode === 13) changeAllList(modal)
			window.removeEventListener("keydown", checkEnterDownforChange)
		}

		modal.confirmBtn.addEventListener("click", checkClickforChange)
		window.addEventListener("keydown", checkEnterDownforChange)

		modal.rejectBtn.addEventListener("click", clearStyle)

	} else createPopup("Немає елементів", 0, 1000)
}

const addEventForOptions = (btn, value, event = "click", func) => {
	btn.addEventListener(event, (e) => {
		typeof func === "function" ? func(e) : options[value] = btn.checked
		localStorage.setItem("options", JSON.stringify(options))
	})
}


const selectAndUnselect = (btn, action) => {
	btn.addEventListener("click", () => {
		elementsList.childNodes.forEach(i => {
			if (i.textContent.trim()) {
				if (i.classList.contains("active")) {
					i.classList[action]("check")
				}
			}
		})
		confirmToggleDisable()
	})
}

readTextFile("data.json", function (data) {
	dataElems = JSON.parse(data);
	testElems = JSON.parse(data)

	for (let i = 0; i < 11; i++) {
		dataElems.e.splice(i, 11)
	}

	elems ? elems.forEach(elem => createLi(elem)) : false
	saves ? saves.forEach(save => createSaveForList(save)) : false

	randomBtn.addEventListener('click', addRandomElem);
	chooseBtn.addEventListener('click', openChooseWindow);
	saveBtn.addEventListener('click', savingList);
	elementsDeleteAllBtn.addEventListener('click', (e) => {
		checkResponsefromDelete(elementsList, elems, "elems")
			.then(arr => elems = arr)
			.catch(e => console.error(e))
	});
	saveDeleteAllBtn.addEventListener('click', (e) => {
		checkResponsefromDelete(saveList, saves, "saves")
			.then(arr => saves = arr)
			.catch(e => console.error(e))
	});
	changeAllBtn.addEventListener('click', checkResponsefromChange)

	selectAndUnselect(selectAll, "add");
	selectAndUnselect(unselectAll, "remove")

	addEventForOptions(countAddRandomElem, "count", "input", (e) => {
		if (e.inputType === "insertText") {
			const allowedStr = /[0-9]/
			if (countAddRandomElem.value.length > 2 || !allowedStr.test(countAddRandomElem.value)) {
				countAddRandomElem.value = countAddRandomElem.value.replace(e.data, "")
			}
		}

		countAddRandomElem.value < 1 ? options.count = 1 : options.count = countAddRandomElem.value
	});
	addEventForOptions(countAddRandomElem, "count", "focusout", () => {
		if (countAddRandomElem.value < 1) countAddRandomElem.value = 1
	});
	addEventForOptions(randomJumpEnableBtn, "randomJumpEnable");
	addEventForOptions(changeJumpEnableBtn, "changeJumpEnable");
	addEventForOptions(repeatElemBtn, "repeatEnable");

	addEventForOptions(chooseJumpEnableBtn, "chooseJumpEnable");
	addEventForOptions(uniqueEnableBtn, "uniqueEnable");

	repeatElemBtn.addEventListener('click', preCheckRepetions);
	window.addEventListener("mousedown", closeContextMenu);
	window.addEventListener("touchstart", closeContextMenu);
	guideOpener.addEventListener("click", guideShow)
	changeModeBtn.forEach(btn => {
		btn.addEventListener("click", toggleMode)
	})
	hideSaveBtn.addEventListener("click", toggleHideSave)
});