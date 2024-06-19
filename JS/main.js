const mainContainer = document.getElementById("main");

const listContainer = document.createElement("ul")
listContainer.id = "listContainer"

const openBtn = document.createElement("button")
mainContainer.appendChild(openBtn)
openBtn.innerText = "Open List Items"
openBtn.id = "openBtn"

openBtn.addEventListener("click", addItem)

let checkboxIdCounter = 0
let labelIdCounter = 0
let temporaryTextValue

function addItem() {

    hideButton()
    mainContainer.appendChild(listContainer)
    addNewList()
}

function hideButton() {

    openBtn.style.display = "none"
    mainContainer.style.justifyContent = "flex-end"
}

function addNewList() {

    const addForm = document.createElement("form")
    mainContainer.appendChild(addForm)
    addForm.addEventListener("submit", submit)
    addForm.id = "addForm"

    const addInputTypeBox = document.createElement("input")
    addForm.appendChild(addInputTypeBox)
    addInputTypeBox.id = "addInputTypeBox"
    addInputTypeBox.placeholder = "Enter new list"
    addInputTypeBox.autocomplete = "off"
    addInputTypeBox.focus();

    const submitBtn = document.createElement("button")
    addForm.appendChild(submitBtn)
    submitBtn.innerText = "Add"
    submitBtn.type = "submit"
    submitBtn.id = "submitBtn"

}

function submit(event) {

    event.preventDefault()
    const addInputTypeBox = document.getElementById("addInputTypeBox")
    const addInputValue = addInputTypeBox.value.trim()

    if (addInputValue) {
        createNewList(addInputValue)
        addInputTypeBox.value = ''
    }
}

function createNewList(addInputValue) {

    const newList = document.createElement("li")
    listContainer.appendChild(newList)
    newList.classList.add("fadeIn");

    const listInputCheckbox = document.createElement("input")
    newList.appendChild(listInputCheckbox)
    listInputCheckbox.type = "checkbox"
    const listInputCheckboxId = "id" + checkboxIdCounter++
    listInputCheckbox.id = listInputCheckboxId


    const listLabel = document.createElement("label")
    newList.appendChild(listLabel)
    listLabel.innerText = addInputValue
    listLabel.setAttribute("for", listInputCheckboxId)
    const listLabelId = "label" + labelIdCounter++
    listLabel.id = listLabelId

    listLabel.addEventListener("mouseover", () => listLabel.classList.add("listHover"))
    listLabel.addEventListener("mouseleave", () => listLabel.classList.remove("listHover"))

    const editBtn = document.createElement("button")
    newList.appendChild(editBtn)
    editBtn.classList.add("fas", "fa-pencil-alt")

    editBtn.addEventListener("click", editButton)

    function editButton() {
        const editForm = document.createElement("form")
        editForm.addEventListener("submit", submitEditedContent)
        newList.appendChild(editForm)
        const editInput = document.createElement("input")
        editInput.id = "listInputType"
        editForm.appendChild(editInput)
        editInput.focus()

        temporaryTextValue ? editInput.value = temporaryTextValue : editInput.value = addInputValue

        editBtn.setAttribute("class", "hidden")
        listLabel.setAttribute("class", "hidden")

        function submitEditedContent(event) {
            event.preventDefault()
            const selectEditIput = event.target.querySelector("input")
            const editedValue = selectEditIput.value
            temporaryTextValue = editedValue

            listLabel.textContent = editedValue

            const newValue = document.getElementById(listLabelId).textContent
            temporaryTextValue = ""

            removeEditSection()
        }

        function removeEditSection() {
            editBtn.removeAttribute("class", "hidden")
            listLabel.removeAttribute("class", "hidden")
            editBtn.classList.add("fas", "fa-pencil-alt")
            editForm.remove()
        }
    }



    const deleteBtn = document.createElement("button")
    newList.appendChild(deleteBtn)
    deleteBtn.classList.add("fas", 'fa-trash')

    deleteBtn.addEventListener("click", () => {
        newList.classList.add("listFade")
        setTimeout(() => { deleteButton(newList) }, 300)
    })

}

function deleteButton(newList) {
    newList.remove()
}


document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openBtn");
    openBtn.addEventListener("click", addItemOnMobile);
});

function addItemOnMobile() {
    hideButton();
}