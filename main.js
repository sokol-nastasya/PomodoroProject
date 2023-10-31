let timer;
let timeRemaining = (24*60) + 59;

const toDoInput = document.getElementById('todo_input');
const listContainer = document.getElementById('list-container');

function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        document.getElementById('minutes').innerHTML = `${minutes}`;
        document.getElementById('seconds').innerHTML = `${seconds}`;

        if (timeRemaining === 0){
            clearInterval(timer);
            alert('Time finished!');

        } else {
            timeRemaining--;
        }
    }, 1000);
};

function resetTimer() {
    clearInterval(timer);
    timeRemaining = (24*60) + 59;
    document.getElementById('minutes').innerHTML = '25';
    document.getElementById('seconds').innerHTML = '00';
};


function addTask() {
    const taskText = toDoInput.value.trim();

    if (taskText !== '') {
        let li = document.createElement('li');

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'checkbox';

        const span = document.createElement('span');
        span.textContent = taskText;

        const dele = document.createElement('span');
        dele.className = 'delete';
        dele.innerHTML = '\u00D7';

        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(dele);


        listContainer.appendChild(li);
          
    }

    toDoInput.value = '';
    storeData();

};


listContainer.addEventListener('click', function(e){
    if(e.target.className === 'delete') {
        e.target.parentElement.remove();
        storeData();
    }
}, false);



function storeData() {
    localStorage.setItem('data', listContainer.innerHTML);

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkboxStates = [];

    checkboxes.forEach(function(checkbox) {
        checkboxStates.push(checkbox.checked);
    })

    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
};

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    let savedCheckedboxStates = JSON.parse(localStorage.getItem('checkboxStates'));

    if (savedCheckedboxStates) {
        checkboxes.forEach(function(checkbox, index){
            checkbox.checked = savedCheckedboxStates[index];
        });
    };
};

document.addEventListener('DOMContentLoaded', function() {
    showTask();
  });


