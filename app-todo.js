// ✅ 로컬 스토리지에서 TODO 불러오기
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = createTodoElement(todo, index);
        todoList.appendChild(li);
    });
}

// ✅ Todo 추가
addBtn.addEventListener("click", () => {
    console.log('test')
    const text = todoInput.value.trim();
    if (text) {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push({ text, completed: false });
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
        todoInput.value = "";
    }
});

// ✅ Todo 요소 생성
function createTodoElement(todo, index) {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos[index].completed = !todos[index].completed;
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    });

    li.appendChild(deleteBtn);
    return li;
}

loadTodos(); // 페이지 로드 시 TODO 불러오기

// ✅ 녹음 기능 추가
let mediaRecorder;
let audioChunks = [];

document.getElementById("record-btn").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById("audio-playback").src = audioUrl;
        audioChunks = [];
    };

    mediaRecorder.start();
    document.getElementById("stop-btn").disabled = false;
});

document.getElementById("stop-btn").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("stop-btn").disabled = true;
});
