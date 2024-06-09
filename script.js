const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const emptyMessage = document.getElementById('empty-message');

function addTask(){
    if (inputBox.value === ''){
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement('span');
        let img = document.createElement('img');
        img.src = 'images/delete.png';
        img.alt = 'Delete';
        img.className = 'delete-item';
        span.appendChild(img);
        li.appendChild(span);

        span.addEventListener('click', function() {
            li.remove();
            saveData();
            checkEmptyMessage();
        });

        inputBox.value = '';
        saveData();
        checkEmptyMessage();
    }
}

inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
};

function showTask(){
    listContainer.innerHTML = localStorage.getItem('data') || '';
    checkEmptyMessage();
}

function checkEmptyMessage(){
    if (listContainer.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

showTask();
