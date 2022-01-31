const createRangeGroup = (range) => {
	const arr = []
	min = parseInt(range.split('-')[0])
	max = parseInt(range.split('-')[1])
	for (let i = min; i <= max; i++) {
		arr.push(i)
	}
	return arr
}

const createChoseArr = (list) => {
	const choseArr = []
	const listItems = list.querySelectorAll('.choose__item')
	listItems.forEach(item => {
		const btn = item.querySelector('.far.fa-square')

		item.addEventListener("click", () => {
			const itemText = item.textContent.trim() || false
			if (!chooseJumpEnableBtn.checked) {
				if (btn.classList.contains("fa-square")) {
					btn.className = "fas fa-check-square"
					choseArr.push(itemText)
				} else {
					btn.className = "far fa-square"
					choseArr.splice(choseArr.indexOf(itemText), 1)
				}
			} else {
				if (btn.classList.contains("fa-square")) {
					choseArr.splice(0, choseArr.length)
					// ` Optimization
					listItems.forEach(i => {
						const checkedBtn = i.querySelector('.fas.fa-check-square')
						if (checkedBtn) {
							checkedBtn.className = 'far fa-square'
						}
					})

					btn.className = "fas fa-check-square"
					choseArr.push(itemText)
				} else {
					choseArr.splice(0, choseArr.length)
					btn.className = "far fa-square"
				}
			}
		})
	})
	return choseArr
}

const insertGroups = (groups, list) => {
	let chooseElems = testElems.e
	if (chooseJumpEnableBtn.checked) chooseElems = testElems.j
	groups.forEach((obj) => {
		let groupItems = ''
		let range
		const groupName = Object.keys(obj)[0]

		for (const name in obj) {
			const group = obj[name];
			range = createRangeGroup(group[0])
		}

		range.forEach((i) => {
			groupItems += `
		<li class="choose__item">
			${chooseElems[i]}
			<i class="far fa-square"></i>
		</li>
		`
		})

		list.innerHTML += `
		<details class="choose__sublist-wrapper">
			<summary>${groupName}</summary>
			<ol class="choose__sublist">
				${groupItems}
			</ol>
		</details>
	`
	})
}

const searchInList = (input, sublists, list, choseArr) => {
	let searchText = input.value.toLowerCase().trim()
	console.log(choseArr)
	if (input.value.length) {
		sublists.forEach(list => {
			list.closest(".choose__sublist-wrapper").open = true

			let items = list.querySelectorAll(".choose__item")
			items.forEach(item => {
				const btn = item.querySelector('i')
				// console.log(btn)
				let text = item.textContent.toLowerCase().trim()
				if (!text.startsWith(searchText)) {
					btn.className = "far fa-square"
					if (choseArr.indexOf(text) >= 0) {
						choseArr.splice(choseArr.indexOf(text), 1)
					}
					item.style.display = "none"
				} else {
					item.style = ""
				}
			})
		})
	} else {
		const items = list.querySelectorAll(".choose__item")
		items.forEach(item => {
			item.style = ""
		})
		sublists.forEach(list => {
			list.closest(".choose__sublist-wrapper").open = false
		})
	}
}

const createChooseList = (groups, duration) => {
	const wrapper = document.createElement('div')
	wrapper.classList.add('choose__wrapper')
	wrapper.innerHTML = `
	<div class="choose__inner">
		<input type="search" name="search" id="search" placeholder="Пошук...">
		<ol class="choose__list list">
		</ol>
	</div>
	`
	document.body.append(wrapper)

	const list = wrapper.querySelector('.choose__list')

	insertGroups(groups, list)

	const choseArr = createChoseArr(list)

	const sublists = list.querySelectorAll(".choose__sublist")
	const searchInput = wrapper.querySelector('#search')
	searchInput.addEventListener("input", () => {
		searchInList(searchInput, sublists, list, choseArr)
		// console.log(choseArr)
	})

	setTimeout(() => wrapper.style.opacity = "1", duration)
	return {
		wrapper,
		choseArr
	}
}

const closeChooseWindow = () => {
	const bg = document.querySelector(".dark-bg"),
		wrapper = document.querySelector(".choose__wrapper"),
		closeBtn = document.querySelector(".choose__btn-close"),
		doneBtn = document.querySelector(".choose__btn-apply")
	if (bg) bg.remove()
	if (wrapper) wrapper.remove()
	if (closeBtn) closeBtn.remove()
	if (doneBtn) doneBtn.remove()
}

const checkResponsefromChoose = (text) => {
	return new Promise(resolve => {
		const modal = createPrompt(text, 200, false)

		const checkClickforChoose = (e) => {
			modal.confirmBtn.removeEventListener("click", checkClickforChoose)
			resolve(true)
		}

		const checkEnterDownforChoose = (e) => {
			window.removeEventListener("keydown", checkEnterDownforChoose)
			if (e.key === "Enter" || e.keyCode === 13) resolve(true)
		}

		modal.confirmBtn.addEventListener("click", checkClickforChoose)
		window.addEventListener("keydown", checkEnterDownforChoose)

		modal.rejectBtn.addEventListener("click", () => {
			clearStyle(false)
			resolve(false)
		})
	})
}

async function insertItemsInList(choseArr) {
	console.log(choseArr)
	let lastElem = elementsList.lastChild
	let isLastElemJump = false
	let lastElemText
	if (lastElem) {
		lastElemText = lastElem.querySelector(".elements__item-text")
		isLastElemJump = !!dataElems.j.find(i => i === lastElemText.textContent.trim())
	}

	let response = true
	let popupText = "Успішно додано!"

	if (!choseArr.length) {
		createTitle("Нічого не вибрано", 200, 2000);
		return
	}
	if (isLastElemJump && chooseJumpEnableBtn.checked) {
		// console.log(isLastElemJump)
		await checkResponsefromChoose("Ви готові здійснити заміну?")
			.then(r => {
				response = r
			})
			.catch(e => console.error(e))

		if (response) {
			lastElemText.textContent = choseArr[0]
			popupText = "Успішно замінено!"
		}
	} else {
		choseArr.forEach(i => {
			createLi(i, isLastElemJump)
		})
	}


	if (response) closeChooseWindow()

	localStorage.setItem("elems", JSON.stringify(elems))
	if (response) createTitle(popupText, 200, 2000);
}

const addCloseBtn = (duration) => {
	const btn = document.createElement('i')
	btn.className = 'fas fa-times choose__btn-close'
	document.body.append(btn)

	setTimeout(() => btn.style.opacity = "1", duration)
	btn.addEventListener('click', closeChooseWindow);
}

const addDoneBtn = (choseArr, duration) => {
	const btn = document.createElement('button')
	btn.className = 'btn choose__btn-apply'
	btn.textContent = 'Apply'
	document.body.append(btn)

	setTimeout(() => btn.style.opacity = "1", duration)
	btn.addEventListener('click', () => insertItemsInList(choseArr));
}

const openChooseWindow = (duration = 0) => {
	let groups = dataElems.groups.e
	if (chooseJumpEnableBtn.checked) groups = dataElems.groups.j

	const bg = addDarkenedBg(duration)
	bg.style.zIndex = "11"
	const {
		wrapper,
		choseArr
	} = createChooseList(groups, duration)
	addCloseBtn(duration)
	addDoneBtn(choseArr, duration)
}