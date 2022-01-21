const isRepeat = () => {
	let repeatNum = 0
	let elem = elementsList.childNodes
	const repeatElems = []
	const ignoreList = []

	for (let n = 0; n < elem.length; n++) {
		let addFirstElem = true;
		const isWas = ignoreList.indexOf(elem[n].textContent.trim())
		if (!ignoreList[isWas]) {
			elem.forEach((i, nI) => {
				if (elem[n].textContent.trim() && elem[nI].textContent.trim()) {
					if (n < nI) {
						if (elem[n].textContent.trim() === elem[nI].textContent.trim()) {
							let ignoreListNotRepeat = true
							ignoreList.forEach(ignoreItem => {
								if (ignoreItem === elem[n].textContent.trim()) {
									ignoreListNotRepeat = false
								}
							})
							if (ignoreListNotRepeat) {
								ignoreList.push(elem[n].textContent.trim())
							}
							repeatNum++
							if (addFirstElem) {
								repeatElems.push(elem[n])
								addFirstElem = false;
							}
							repeatElems.push(elem[nI])
						}
					}
				}
			});
		}
	}

	return {
		repeatElems,
		repeatNum,
		isRepeatBool: !!repeatNum
	}
}

const createElemNums = (arr) => {
	elemNums = [];
	arr.forEach((_, n) => elemNums.push(n))
	arr.forEach((i, n) => {
		let repeat = -1
		elementsList.childNodes.forEach((i2) => {
			if (i2.textContent.trim() === i) {
				repeat++
				if (!repeat > 0) {
					elemNums.splice(elemNums.indexOf(n), 1)
				}
			}
		});
	})
	return elemNums
}

const checkRepetition = (numIterate, changingElem, checkElems) => {
	return new Promise(resolve => {
		let repeat = 0
		let elem = elementsList.childNodes
		if (changingElem) {
			iterate(numIterate, changingElem, newDataElemsE, checkElems, false, false).then(only => {
				elem.forEach((i) => {
					if (i.textContent.trim()) {
						if (only === i.textContent.trim()) {
							repeat++
						}
					}
				});
				resolve(repeat)
			})
		}
	}).then((repeat) => {
		if (repeat > 1) {
			createNewDataElems(32, changingElem, checkElems)
		} else clearAndSave()
	})
}

const createNewDataElems = (numIterate = 1, changingElem, checkElems = dataElems.e) => {
	return new Promise(resolve => {
		if (changingElem.textContent.trim()) {
			changingElem = changingElem.querySelector(".elements__item-text") || changingElem
		}
		createElemNums(checkElems)
		newDataElemsE = [];

		if (elemNums.length || (checkElems.length == elementsList.children.length)) {
			elemNums.forEach(i => newDataElemsE.push(checkElems[i]))
			checkRepetition(numIterate, changingElem, checkElems).then(resolve)
			return
		}
		createTitle("Неможливо замінити на унікальний елемент!", 200, 3000)
		setTimeout(resolve, 3000);
	})
}

const iterate = (i, elem, array, iterableArr = array, change = false, save = true, duration = 30, only) => {
	return new Promise((resolve) => {
		if (!i || !elem.textContent.trim() || !array) return
		elem = elem.querySelector(".elements__item-text") || elem
		const interval = setInterval(() => {
			if (i === 1 || i === 32) {
				only = random(array);
			}
			i++;

			elem.textContent = random(iterableArr)
			sortable.destroy()

			if (i > 10) {
				clearInterval(interval);

				const isJump = !!dataElems.j.find(i => i === elem.textContent.trim())
				if (isJump) {
					elem.closest(".elements__item").classList.add("jump")
				}

				if (!change) {
					elem.textContent = only
					elems.push(elem.textContent)
				} else {
					const findText = elem.textContent
					for (const key in elementsList.children) {
						const elem = elementsList.children[key];
						if (typeof elem === "object") {
							if (elem.textContent.trim() === findText) {
								elems.splice(key, 1, findText)
							}
						}
					}
				}

				sortable = new Sortable.default(document.querySelector('ol.elements__list'), sortableOptions).on('drag:stopped', clearAndSave);
				sortable.on('sortable:sort', smoothEnabled);
				sortable.on('drag:stopped', smoothDisabled);
				if (save) {
					localStorage.setItem('elems', JSON.stringify(elems))
				}

				resolve(only);
			}
		}, duration);
	});
}

const addRandomElem = (dataElems) => {
	const elemsLength = elementsList.children.length
	const sumElem = elemsLength + parseInt(countEnableBtn.value)
	let repeatEnable = repeatElemBtn.checked
	let countValue = parseInt(countEnableBtn.value)
	let jumpEnable = jumpEnableBtn.checked
	addSelectorInListItem(saveList, null, "active")

	if (!repeatEnable) {
		if (elemsLength >= 99) {
			createTitle('Ви досягли ліміту елементів (99)', 200, 3000)
		} else {
			if (countEnableBtn.value > 99 || sumElem > 99) {
				createTitle('Дія неможлива, ліміт елементів (99)', 200, 3000)
			}
		}
		if (elemsLength >= 99 || countEnableBtn.value > 99 || sumElem > 99) {
			countEnableBtn.value = (99 - elemsLength) || 1
			return
		}
	}

	let arr = dataElems.e
	let potentialItemCount = elemsLength + countValue
	let arrLength = arr.length

	createElemNums(arr)
	if (repeatEnable) {
		if (jumpEnable) {
			arrLength = arr.length + 1
		}
		if (potentialItemCount > arr.length && !elemNums.length) {
			countEnableBtn.value = (arr.length - elemsLength) <= 0 ? 1 : arrLength - elemsLength
		}
	}

	const lastItem = elementsList.querySelector(".elements__item:last-child .elements__item-text")
	const isLastJump = !!dataElems.j.find(i => lastItem ? i === lastItem.textContent : false)

	for (let i = 0; i < countValue; i++) {
		if (jumpEnable && !isLastJump) {
			if (i === (countValue - 1)) {
				arr = dataElems.j
			}
		}
		arrLength = arr.length
		if (jumpEnable) {
			arrLength = arrLength + 1
		}

		createElemNums(arr)
		if (repeatEnable) {
			if (potentialItemCount > arrLength) {
				createTitle("Неможливо створити таку кількість унікальних елементів!", 200, 3000)
				i = countValue
			} else {
				createNewDataElems(1, createLi('', isLastJump, lastItem), arr)
			}
		} else {
			iterate(1, createLi('', isLastJump, lastItem), arr)
		}
	}

	elementsList.scrollTo({
		behavior: "smooth",
		left: 0,
		top: elementsList.scrollHeight
	})
	optionsInRandom.count = countEnableBtn.value
	localStorage.setItem("optionsInRandom", JSON.stringify(optionsInRandom))
}

const preCheckRepetions = () => {
	let repeatEnable = repeatElemBtn.checked
	if (repeatEnable) {
		if (createElemNums(dataElems.e).length || (dataElems.e.length == elementsList.children.length)) {
			popupCheckRepeations()
			return
		}

		createTitle("Неможливо замінити на унікальний елемент!", 200, 3000)
		setTimeout(clearStyle, 3000)
	}
}