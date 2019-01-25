/* = = = = = = = = = = = = = = = = = = = = = = = =  */
/* V E R S I O N   4                                */
/* Add button functionality to jump to pages        */
/* = = = = = = = = = = = = = = = = = = = = = = = =  */
/* G L O B A L   V A R I A B L E S                  */
/* = = = = = = = = = = = = = = = = = = = = = = = =  */

var appTitle, pageTitle, pageStory, pagePicture, pageButtons, pageNumber;

var thisPage;

var bookPages = [];

var pagePrototype = {
    title : "",
    picture : "",
    story : "",
    button : [],
    number : ""
};

window.onload = init;

/* = = = = = = = = = = = = = = = = = = = = = = = = */
/* F U N C T I O N S */
/* = = = = = = = = = = = = = = = = = = = = = = = = */

function init() {
    appTitle = document.getElementById("appTitle");
    pageTitle = document.getElementById("pageTitle");
    pagePicture = document.getElementById("pagePicture");
    pageStory = document.getElementById("pageStory");
    pageButtons = document.getElementById("pageButtons");
    pageNumber = document.getElementById("pageNumber");
    
    createPages();
    
    
}

function createPages() {
    
 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            bookPages = JSON.parse(this.responseText);
            loadPage("Page 1");
            renderPage();
            console.log(bookPages);
        }
    };
    xmlhttp.open("GET", "cyoa01.json", true);
    xmlhttp.send();

}

function renderPage() {
    pageTitle.innerHTML = thisPage.title;
    pagePicture.src = thisPage.picture;
    pageStory.innerHTML = thisPage.story;
    pageNumber.innerHTML = thisPage.number;
    
    pageButtons.innerHTML = "";
    /* loop through all the buttons in thisPage button array */
    for (var i = 0; i < thisPage.button.length; i++) {
        var thisButton = document.createElement("button");
        thisButton.innerHTML = thisPage.button[i].text;
        var tempStr = "loadPage('" + thisPage.button[i].pageNumber + "')";
        thisButton.setAttribute("onclick", tempStr);
        pageButtons.appendChild(thisButton);
    }
}

function loadPage(pageNumber) {
    for (var i = 0; i < bookPages.length; i++) {
        if (bookPages[i].number == pageNumber) {
            thisPage = bookPages[i];
            renderPage();
            return;
        }    
    }
    console.log("The page : " + pageNumber + " : was not found!");
}