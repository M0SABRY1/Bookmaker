var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");
var mainIndex = 0;



var nameRegex = /^[a-zA-Z_]+$/
function isNameValid(){
    return(nameRegex.test(siteName.value));
}

var urlRegex = /^(https?:\/\/)?(www\.)[a-zA-Z0-9-]+(\.com|\.net)(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/
function isUrlValid(){
    return(urlRegex.test(siteUrl.value));
}

function checkValidity() {
    if (isNameValid() && isUrlValid()) {
        addBtn.removeAttribute("disabled");
    } else {
        addBtn.setAttribute("disabled", "true");
    }
}

siteName.onkeyup = checkValidity;
siteUrl.onkeyup = checkValidity;


if (localStorage.getItem("bookmarks") == null) {
    var bookmarks = [];
}
else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark(bookmarks);
}

function addBookmark() {

    if (addBtn.innerHTML == "Update") {

        addBtn.innerHTML = "Submit";
        addBtn.classList.replace("btn-outline-warning", "btn-outline-primary");
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value
        }
        bookmarks.splice(mainIndex, 1, bookmark);

    }
    else {
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value
        }

        bookmarks.push(bookmark);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
    clearBookmark();

}

function clearBookmark() {
    siteName.value = "";
    siteUrl.value = "";
}

function displayBookmark(arr) {
    var mark = ``

    for (i = 0; i < arr.length; i++) {
        mark += ` <tr>
                <td>${i + 1}</td>
                <td>${arr[i].name}</td>
                <td><a href="https://${arr[i].url}" target="_blank"><button class="btn btn-outline-info">Visit</button></a></td>
                <td><button class="btn btn-outline-warning" onclick="updateBookmark(${i})">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteBookmark(${i})">Delete</button></td>
            </tr>`
    }
    tableBody.innerHTML = mark;
}


function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
}

function updateBookmark(index) {
    addBtn.innerHTML = "Update";
    addBtn.classList.replace("btn-outline-primary", "btn-outline-warning");
    siteName.value = bookmarks[index].name;
    siteUrl.value = bookmarks[index].url;
    mainIndex = index;
}

function searchForBookmark(term) {
    matchedBook=[];

    for (i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].name.toLowerCase().includes(term.toLowerCase())){
            matchedBook.push(bookmarks[i]);
        }
    }
    displayBookmark(matchedBook);
}