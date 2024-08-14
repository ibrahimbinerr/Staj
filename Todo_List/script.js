// DOM Element Seçimi
// HTML içerisindeki form, input ve buton gibi elemanlar seçiliyor ve değişkenlere atanıyor.
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const categorySelect = document.querySelector("#categorySelect");
const prioritySelect = document.querySelector("#prioritySelect");
const todoList = document.querySelector("#todoList");
const filterInput = document.querySelector("#todoSearch");
const clearButton = document.querySelector("#clearButton");

let todos = []; // Yapılacaklar listesini tutmak için kullanılan dizi

runEvents(); // Olayların dinlenmesi için fonksiyon çağrılıyor

// Olayları dinleyecek fonksiyon
function runEvents() {
    // Form gönderildiğinde addTodo fonksiyonu çalıştırılır
    form.addEventListener("submit", addTodo);
    // Sayfa yüklendiğinde yapılacaklar listesinin yüklenmesi için pageLoaded fonksiyonu çalıştırılır
    document.addEventListener("DOMContentLoaded", pageLoaded);
    // Todo listesi üzerinde tıklama olayları toggleOrRemoveTodo fonksiyonuna yönlendirilir
    todoList.addEventListener("click", toggleOrRemoveTodo);
    // Tüm görevleri temizlemek için clearButton'a tıklama olayı atanır
    clearButton.addEventListener("click", clearTodos);
    // Arama kutusuna yazı yazıldığında filterTodos fonksiyonu çalışır
    filterInput.addEventListener("keyup", filterTodos);
}

//local storage de bilgiler tutuluyor, sayfayı incele->application-->storage-->local storage
// Sayfa yüklendiğinde çalışacak fonksiyon
function pageLoaded() {
    checkTodosFromStorage(); // LocalStorage'dan mevcut görevler kontrol edilir
    // Tüm görevler arayüze eklenir
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

// Yeni bir görevi arayüze ekleyen fonksiyon
function addTodoToUI(todo) {
    const li = document.createElement("li"); // Yeni bir liste öğesi oluşturuluyor
    li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.priority.toLowerCase()}`; // Dinamik olarak sınıf ekleniyor
    li.textContent = `${todo.text} [${todo.category}]`; // Görev ve kategori metin olarak ekleniyor

    // Eğer görev tamamlanmışsa, tamamlandı sınıfı ekleniyor
    if (todo.completed) {
        li.classList.add("completed");
    }

    const div = document.createElement("div"); // Butonları içerecek bir div oluşturuluyor

    // Tamamla butonu oluşturuluyor
    const completeBtn = document.createElement("button");
    completeBtn.className = "btn btn-success btn-sm mr-2";
    completeBtn.textContent = "Tamamla";

    // Sil butonu oluşturuluyor
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Sil";

    // Butonlar div'e ekleniyor
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);

    // Div, liste öğesine ekleniyor
    li.appendChild(div);
    // Liste öğesi, yapılacaklar listesine ekleniyor
    todoList.appendChild(li);
}

// Yeni bir görevi LocalStorage'a ekleyen fonksiyon
function addTodoToStorage(todo) {
    checkTodosFromStorage(); // Mevcut görevler kontrol ediliyor
    todos.push(todo); // Yeni görev diziye ekleniyor
    localStorage.setItem("todos", JSON.stringify(todos)); // LocalStorage'a kaydediliyor
}

// LocalStorage'daki görevleri kontrol eden ve yükleyen fonksiyon
function checkTodosFromStorage() {
    // Eğer LocalStorage'da görev yoksa boş bir dizi oluşturuluyor
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // Mevcut görevler JSON formatından diziye çevriliyor
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

// Yeni bir görev ekleyen fonksiyon
function addTodo(e) {
    e.preventDefault(); // Formun varsayılan davranışı engelleniyor
    const todoText = addInput.value.trim(); // Görev metni alınıyor
    const category = categorySelect.value; // Kategori alınıyor
    const priority = prioritySelect.value; // Öncelik alınıyor

    // Eğer herhangi bir alan boşsa kullanıcı uyarılıyor
    if (todoText === "" || category === "" || priority === "") {
        alert("Lütfen tüm alanları doldurun.");
    } else {
        // Yeni görev nesnesi oluşturuluyor
        const todo = {
            text: todoText,
            category: category,
            priority: priority,
            completed: false
        };

        // Yeni görev UI'ye ve LocalStorage'a ekleniyor
        addTodoToUI(todo);
        addTodoToStorage(todo);

        // Form temizleniyor
        addInput.value = "";
        categorySelect.selectedIndex = 0;
        prioritySelect.selectedIndex = 0;
    }
}

// Görev tamamlanma durumu veya silme işlemlerini yöneten fonksiyon
function toggleOrRemoveTodo(e) {
    // Eğer tamamla butonuna tıklanmışsa
    if (e.target.classList.contains("btn-success")) {
        const li = e.target.parentElement.parentElement;
        li.classList.toggle("completed"); // Görev tamamlanmış olarak işaretleniyor veya işaret kaldırılıyor

        const todoText = li.textContent.split("[")[0].trim(); // Görev metni alınıyor
        toggleTodoCompletion(todoText); // Görev durumu değiştiriliyor
    }

    // Eğer sil butonuna tıklanmışsa
    if (e.target.classList.contains("btn-danger")) {
        const li = e.target.parentElement.parentElement;
        li.remove(); // Görev arayüzden siliniyor

        const todoText = li.textContent.split("[")[0].trim(); // Görev metni alınıyor
        removeTodoFromStorage(todoText); // Görev LocalStorage'dan siliniyor
    }
}

// Görev tamamlanma durumunu LocalStorage'da değiştiren fonksiyon
function toggleTodoCompletion(todoText) {
    checkTodosFromStorage(); // Mevcut görevler yükleniyor
    todos.forEach(function(todo) {
        if (todo.text === todoText) {
            todo.completed = !todo.completed; // Tamamlanma durumu tersine çevriliyor
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos)); // Güncellenen görevler LocalStorage'a kaydediliyor
}

// Görevi LocalStorage'dan silen fonksiyon
function removeTodoFromStorage(todoText) {
    checkTodosFromStorage(); // Mevcut görevler yükleniyor
    // Belirtilen görev dışındaki tüm görevler filtreleniyor
    todos = todos.filter(function(todo) {
        return todo.text !== todoText;
    });
    localStorage.setItem("todos", JSON.stringify(todos)); // Güncellenen görev listesi LocalStorage'a kaydediliyor
}

// Tüm görevleri temizleyen fonksiyon
function clearTodos() {
    todoList.innerHTML = ""; // Arayüzdeki tüm görevler siliniyor
    todos = []; // Dizi temizleniyor
    localStorage.setItem("todos", JSON.stringify(todos)); // LocalStorage güncelleniyor
}

// Görevleri filtreleyen fonksiyon
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase().trim(); // Arama kutusuna girilen değer alınıyor
    const listItems = document.querySelectorAll(".list-group-item"); // Tüm görevler seçiliyor

    // Her görev üzerinde filtre uygulanıyor
    listItems.forEach(function(item) {
        const text = item.textContent.toLowerCase(); // Görev metni küçük harfe dönüştürülüyor
        // Arama değeri görev metninde varsa görev gösteriliyor, yoksa gizleniyor
        if (text.includes(filterValue)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}