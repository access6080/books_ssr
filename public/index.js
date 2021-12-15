let BOOKS;


const handleSubmit = async () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("desc").value;

    const data = {
        title: title,
        category: category,
        description: description,
        author: author
    }

    await axios.post("/books/", data);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";
    document.getElementById("desc").value = "";

    // location.replace('/library');
}

const openLibrary = async () => {
    const { data } = await axios.get("/data/")
    const content = document.getElementById("library");
    BOOKS = data;

    Object.entries(data).forEach((book, index) => {
        const [title, bookData] = book;

        // Column Container
        const col = document.createElement("div");
        const colClass = document.createAttribute("class");
        colClass.value = 'col';
        col.setAttributeNode(colClass);

        // Card Container
        const card = document.createElement("div");
        const cardClass = document.createAttribute("class");
        const cardStyle = document.createAttribute("style");
        const cardIndex = document.createAttribute("id");
        cardClass.value = `card m-4`;
        cardStyle.value = "width: 20rem; height: auto;"
        cardIndex.value = index;
        card.setAttributeNode(cardClass);
        card.setAttributeNode(cardStyle);
        card.setAttributeNode(cardIndex);

        // Image at the top of the card
        const bookImg = document.createElement("img");
        const bookImgClass = document.createAttribute("class");
        bookImgClass.value = "card-img-top";
        bookImg.setAttributeNode(bookImgClass);

        const bookImgSrc = document.createAttribute("src");
        bookImgSrc.value = book.Image || "logo.jpeg";
        bookImg.setAttributeNode(bookImgSrc);

        card.appendChild(bookImg);

        // Card Body
        const cardBody = document.createElement('div');
        const cardBodyClass = document.createAttribute("class");
        cardBodyClass.value = "card-body";
        cardBody.setAttributeNode(cardBodyClass);

        // Card Title
        const cardTitle = document.createElement("h5");
        const cardTitleClass = document.createAttribute("class");
        cardTitleClass.value = "card-title";
        cardTitle.setAttributeNode(cardTitleClass);
        cardTitle.innerHTML = title;
        cardBody.appendChild(cardTitle);

        // Card Subtitle
        const cardSub = document.createElement("h6");
        const cardSubClass = document.createAttribute("class");
        cardSubClass.value = "card-subtitle mb-2 text-muted";
        cardSub.setAttributeNode(cardSubClass);
        cardSub.innerHTML = `By: ${bookData.Author}`;
        cardBody.appendChild(cardSub);

        // Card Description
        const cardDesc = document.createElement("h6");
        const cardDescClass = document.createAttribute("class");
        cardDescClass.value = "card-text";
        cardDesc.setAttributeNode(cardDescClass);
        cardDesc.innerHTML = bookData.Description;
        cardBody.appendChild(cardDesc);

        // Card Footer
        const cardFooter = document.createElement("div");
        const cardFooterTag = document.createElement("small");
        const cardFooterClass = document.createAttribute("class");
        const cardFooterTagClass = document.createAttribute("class");
        cardFooterClass.value = "card-footer footer";
        cardFooterTagClass.value = "text-muted";
        cardFooter.setAttributeNode(cardFooterClass);
        cardFooterTag.setAttributeNode(cardFooterTagClass);
        cardFooterTag.innerHTML = `Category: ${bookData.Category}`;
        cardFooter.appendChild(cardFooterTag);

        // Delete Button
        const btn = document.createElement("button");
        const btnClass = document.createAttribute("class");
        btnClass.value = "btn";
        btn.setAttributeNode(btnClass);
        btn.innerHTML = deleteButton;
        btn.addEventListener("click", handleDelete);
        cardFooter.appendChild(btn);

        // Add Footer to card Body
        cardBody.appendChild(cardFooter);

        // Add Card Body to card container
        card.appendChild(cardBody);

        // Add Card to Library
        col.appendChild(card);
        content.appendChild(col);

    })

}

const deleteButton = '<img  style="width: 1em;" alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDIwLjUgNCBBIDEuNTAwMTUgMS41MDAxNSAwIDAgMCAxOS4wNjY0MDYgNiBMIDE0LjY0MDYyNSA2IEMgMTIuNzk2NjI1IDYgMTEuMDg2NDUzIDYuOTE2MjE4OCAxMC4wNjQ0NTMgOC40NDkyMTg4IEwgNy42OTcyNjU2IDEyIEwgNy41IDEyIEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDcuNSAxNSBMIDQwLjUgMTUgQSAxLjUwMDE1IDEuNTAwMTUgMCAxIDAgNDAuNSAxMiBMIDQwLjMwMjczNCAxMiBMIDM3LjkzNTU0NyA4LjQ0OTIxODggQyAzNi45MTM1NDcgNi45MTYyMTg3IDM1LjIwMjM3NSA2IDMzLjM1OTM3NSA2IEwgMjguOTMzNTk0IDYgQSAxLjUwMDE1IDEuNTAwMTUgMCAwIDAgMjcuNSA0IEwgMjAuNSA0IHogTSA4Ljk3MjY1NjIgMTggTCAxMS4xMjUgMzguMDg1OTM4IEMgMTEuNDI1IDQwLjg4NzkzNyAxMy43NzU3NSA0MyAxNi41OTM3NSA0MyBMIDMxLjQwNjI1IDQzIEMgMzQuMjIzMjUgNDMgMzYuNTc0IDQwLjg4NzkzOCAzNi44NzUgMzguMDg1OTM4IEwgMzkuMDI3MzQ0IDE4IEwgOC45NzI2NTYyIDE4IHoiPjwvcGF0aD48L3N2Zz4="/>';

const handleDelete = async (event) => {
    const cardId = event.path[4].id;

    const book = Object.entries(BOOKS)[cardId];
    const cardToDelete = document.getElementById(cardId);
    
    cardToDelete.remove();
    await axios.delete(`/books/${book[0]}`);

//   location.reload();
}

const handleSelect = () => {
    const selectedBook = document.getElementById("update");
    const content = document.getElementById("update_book");

    const selectedState = selectedBook.selectedIndex;

    if (selectedState === 1) {
        const cat = document.createElement("div");
        const catClass = document.createAttribute("class");
        catClass.value = "mb-3 form-floating";
        cat.setAttributeNode(catClass);
        cat.innerHTML = `<input type="text" class="form-control" id="up_category" placeholder="Book Category" required>
            <label for="floatingInput">Book Category</label>
            <button type="button" class="mt-3 btn btn-primary" onclick="handleUpdate()">Submit</button>`
        
        content.appendChild(cat);
    }

    if (selectedState === 2) {
        const cat = document.createElement("div");
        const catClass = document.createAttribute("class");
        catClass.value = "mb-3 form-floating";
        cat.setAttributeNode(catClass);
        cat.innerHTML = `<input type="text" class="form-control" id="up_author" placeholder="Book Author" required>
            <label for="floatingInput">Book Author</label>
            <button type="button" class="mt-3 btn btn-primary" onclick="handleUpdate()">Submit</button>`
        
        content.appendChild(cat);
    }

    if (selectedState === 3) {
        const cat = document.createElement("div");
        const catClass = document.createAttribute("class");
        catClass.value = "mb-3 form-floating";
        cat.setAttributeNode(catClass);
        cat.innerHTML = `<textarea class="form-control" placeholder="Write a description here" id="up_desc" required></textarea>
            <label for="floatingTextarea">Description</label>
            <button type="button" class="mt-3 btn btn-primary" onclick="handleUpdate()">Submit</button>`
        
        content.appendChild(cat);
    }
}

const handleUpdate = async () => {
    const selectedBook = document.getElementById("update");
    const selectedState = selectedBook.selectedIndex;
    const title = document.getElementById("up_title").value;
    let category;
    let author;
    let description;

    if (selectedState === 1) {
        category = document.getElementById("up_category").value
    }
    if (selectedState === 2) {
        author = document.getElementById("up_author").value;
    }
    if (selectedState === 3) {
        description = document.getElementById("up_desc").value;
    }

    const data = {
        Category: category,
        Description: description,
        Author: author 
    }

    await axios.patch(`/books/${title}`, data);

    // location.replace('/library');
}



