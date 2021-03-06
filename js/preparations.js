if (options) {
	countAddRandomElem.value = options.count
	randomJumpEnableBtn.checked = options.randomJumpEnable
	changeJumpEnableBtn.checked = options.changeJumpEnable
	repeatElemBtn.checked = options.repeatEnable
	chooseJumpEnableBtn.checked = options.chooseJumpEnable
	uniqueEnableBtn.checked = options.uniqueEnable
}

const updateListOnMove = (e) => {
	const name = e.dragEvent.data.originalSource.querySelector('.elements__item-text').textContent.trim()
	let oldIndex = e.data.oldIndex
	let newIndex = e.data.newIndex
	elems.forEach((i, n) => {
		if (oldIndex === n) elems.splice(n, 1)
	})
	elems.splice(newIndex, 0, name)
	localStorage.setItem("elems", JSON.stringify(elems))
}

let sortable = new Sortable.default(document.querySelector('ol.elements__list'), sortableOptions).on('sortable:stop', updateListOnMove);


if (elementsList.children[0]) {
	elemWidth = elementsList.children[0].offsetWidth
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

const hideContextMenuOnDrag = (e) => {
	const contextMenu = e.data.originalSource.querySelector('.context-menu')
	if (contextMenu) contextMenu.classList.add('hide')
}

sortable.on('drag:start', hideContextMenuOnDrag)
sortable.on('sortable:sort', smoothEnabled);
sortable.on('drag:stopped', smoothDisabled);
sortable.on('drag:stopped', () => addSelectorInListItem(saveList, null, "active"));