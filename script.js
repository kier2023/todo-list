/**
 * The elements we want to manipulate when interacting with the app
 * are fetched by the getElementById function.
 */
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const emptyMessage = document.getElementById('empty-message');

/**
 * The 'addTask function is invoked when a the user clicks the 'add' buttons
 * or presses the enter key after providing a text input value into the text bar.
 * This function performs several key actions.
 */
function addTask(){

    /**
     * This check validates the user input to ensure that it is not empty. If the input is empty,
     * it alerts the user to write something.
     */
    if (inputBox.value === ''){
        alert('You must write something!');
    } else {
        /**
         * If the the input is not empty, it will create a new list item ('<li>') and sets its inner html to the value entered
         * by the user in the input box.
         */
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;

        /**
         * Appends the new list item to the 'listContainer' element, which holds all
         * the to-do list items created by the user.
         */
        listContainer.appendChild(li);

        /**
         * Creates a '<span>' element to hold the delete icon, then creates an '<img>'
         * element for the delete icon with its source set to .images/delete.png' and
         * appropriate attributes for accessibility and styling.
         */
        let span = document.createElement('span');
        let img = document.createElement('img');
        img.src = 'images/delete.png';
        img.alt = 'Delete';
        img.className = 'delete-item';

        /**
         * Appends the delete icon to the span, and then appends the span to the new list item.
         */
        span.appendChild(img);
        li.appendChild(span);

        /**
         * Adds a listening event to the delete icon that removes the corresponfing list item
         * from the DOM and updates the local storage whenever the delete icon is clicked.
         */
        span.addEventListener('click', function() {
            li.remove();
            saveData();
            checkEmptyMessage();
        });
        
        /**
         * Clears the input box to allow the user to enter a new task.
         * Saves the updated to-do list to local web storage by calling the 'saveData function.
         * Calls the 'checkEmptyMessage' function to update the UI based on whether the list is 
         * empty or not.
         */
        inputBox.value = '';
        saveData();
        checkEmptyMessage();
    }
}

/**
 * Allows the user to create a new list item by 
 * pressing the 'Enter' key.
 */
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

/**
 * Allows the user to mark a list item as complete
 * by clicking on the list item. Clicking on the list
 * item again will also reverse this.
 */
listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
}, false);

/**
 * Uses localStorage to store the state of your to-do list
 * so that you can come back to the to-do list after closing
 * the browser, or refreshing the browser.
 */
function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
};

/**
 * Fetches all data from local storage and displays them all where necessary 
 * when reloading/opening a new browser.
 */
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data') || '';
    checkEmptyMessage();
}

/**
 * Checks for and empty to do list and styles 
 * ths emptyMessage into the to-do list if there is
 * nothing to display.
 */
function checkEmptyMessage(){
    if (listContainer.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

showTask();
