let date = new Date();
let todos = {};

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector(".year-month").textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate();
    const thisLastDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
    const nextDates = [];

    if(prevLastDay !== 6){
        for(let i = 0; i < prevLastDay + 1; i++){
            prevDates.unshift(prevLastDate - i);
        }
    }

    for(let i = 1; i < 7 - thisLastDay; i++){
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = prevDates.length;
    const lastDateIndex = firstDateIndex + thisDates.length - 1;

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i <= lastDateIndex ? 'this' : 'other';
        dates[i] = `<div class="date ${condition}" onclick="openModal(${viewYear}, ${viewMonth + 1}, ${date})"><span>${date}</span></div>`;
    });

    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();

    if(viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for(let date of document.querySelectorAll(".this span")) {
            if (+date.innerText === today.getDate()) {
                date.parentNode.classList.add('today');
                break;
            }
        }
    }
};

renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};

const openModal = (year, month, day) => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-date").innerText = `${year}년 ${month}월 ${day}일`;
    document.getElementById("todo-input").dataset.date = `${year}-${month}-${day}`;
    renderTodoList(`${year}-${month}-${day}`);
};

const closeModal = () => {
    document.getElementById("modal").style.display = "none";
};

const addTodo = () => {
    const date = document.getElementById("todo-input").dataset.date;
    const todo = document.getElementById("todo-input").value;
    if (!todos[date]) {
        todos[date] = [];
    }
    else{
        date.classList.add("has-todo")
    }
    todos[date].push(todo);
    document.getElementById("todo-input").value = "";
    renderTodoList(date);
};

const renderTodoList = (date) => {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    if (todos[date]) {
        todos[date].forEach((todo, index) => {
            const li = document.createElement("li");
            li.textContent = todo;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "삭제";
            deleteBtn.onclick = () => deleteTodo(date, index);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
};

const deleteTodo = (date, index) => {
    todos[date].splice(index, 1);
    renderTodoList(date);
};
