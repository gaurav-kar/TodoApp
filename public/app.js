const inputEl = document.querySelector(".input-item");
const addNewTodos = document.querySelector(".add");
const removeTodos = document.querySelector(".remove");
const outputEl = document.querySelector(".output");

const renderElements = () => {
    outputEl.innerHTML = null;
    inputEl.value = "";
    fetch("/todos")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parentDiv = document.createElement("div");
                parentDiv.classList.add("output-items");
                const spanEl = document.createElement("span");
                spanEl.innerHTML = "&#128073;";
                parentDiv.appendChild(spanEl);

                const pElDiv = document.createElement("div");
                pElDiv.classList.add("output-item-container");
                const pEl = document.createElement("p");
                pEl.classList.add("output-item");
                pEl.textContent = `${item.data}`;

                pElDiv.appendChild(pEl);
                parentDiv.appendChild(pElDiv);

                const divEl = document.createElement("div");
                divEl.classList.add("remove-icon");

                const iEl = document.createElement("i");
                iEl.classList.add("fas", "fa-times", "fa-sm", "remove");
                iEl.setAttribute("data-id", `${item._id}`);
                divEl.appendChild(iEl);

                parentDiv.appendChild(divEl);
                outputEl.appendChild(parentDiv);
            });
        });
};

renderElements();

addNewTodos.addEventListener("click", (e) => {
    const inputElValue = inputEl.value;
    fetch("/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ item: inputElValue }),
    }).then(() => {
        renderElements();
    });
});

outputEl.addEventListener("click", (e) => {
    if (e.target.tagName == "I"); {
        e.target.parentElement.parentElement.style.opacity = 0.7;
        e.target.parentElement.previousElementSibling.firstElementChild.classList.add("active");

        setTimeout(() => {
            const identifyItemToDelete = e.target.dataset.id;
            fetch("/todo", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: identifyItemToDelete }),
            }).then(renderElements());
        }, 1000);
    }
});