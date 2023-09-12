let taskList = []
const entryElm = document.getElementById("entry")
const badElm = document.getElementById("bad")
const badHrElm = document.getElementById("badHr")
const totalHrElm = document.getElementById("totalHr")

const ttlHrsPerWeeek = 24 * 7



// get the form data on button click 

const handleOnSubmit = (form) => {
    const newTask = new FormData(form)

    // const task = newTask.get("task")
    // const hr = newTask.get("hr")
    const obj = {
        id: randomStr(),
        task: newTask.get("task"),  // getting those varieable directly in the object making the code short. 
        hr: +newTask.get("hr"),
        type: "entry"
    }
const ttlHrs = total()
if (ttlHrs+ obj.hr > ttlHrsPerWeeek){
    return alert("Sorry not enough time left to fit the tast from last week")
}

// add to the global array 
taskList.push(obj)
displayEntryTask()
displayBadTask()

}


// add to the global array 
//create a function that takes the array, loop through it and creates html and push to the dom


const displayEntryTask = () => {
    let str = ``

    const entryLisTOnly = taskList.filter((item, i) => item.type === "entry");

    entryLisTOnly.map((item, i) => {

    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
    <button
    onclick="deleteTask('${item.id}')"
     class="btn btn-danger"><i class="fa-solid fa-trash"></i>
    </button>
        <button onclick = "switchTask('${item.id}', 'bad')" class="btn btn-success"><i class="fa-solid fa-arrow-right"></i>
        </button>
       
    </td>
    <tr>`
        console.log(item, i)
    })

    entryElm.innerHTML = str
    total();

}


const displayBadTask = () => {
    let str = ``

    const badLisTOnly = taskList.filter((item, i) => 
        item.type === "bad");

    badLisTOnly.map((item, i) => {

    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
        <button onclick = "switchTask('${item.id}', 'entry')" class="btn btn-warning" ><i class="fa-solid fa-arrow-left"></i>
        </button>
        <button 
        onclick="deleteTask('${item.id}')"
        class="btn btn-danger"><i class="fa-solid fa-trash"></i>
        </button>
    </td>
    <tr>`
        // console.log(item, i)
    })

    const ttlBadHr = badLisTOnly.reduce((acc, item) => acc + item.hr, 0)
    badHrElm.innerText = ttlBadHr


    badElm.innerHTML = str

}


const randomStr = () => {
    const charLength = 6
    const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    let id = ""
    for (let i = 0; i < charLength; i++) {
        const randNum = Math.round(Math.random()*(str.length - 1))
        id += str[randNum]
    } 
    return id
}

const switchTask = (id, type) => {
    // console.log(id, type)
    
    taskList = taskList.map((item) => {
        if(item.id === id){
            return{
                ...item,
                type,
            }
            return item
        }
    })
    displayEntryTask()
    displayBadTask()
    total()
}

const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete?")){
        taskList = taskList.filter((item) => item.id !== id);


    displayEntryTask();
    displayBadTask();

    }
    
    // if(item.id === id){return false}

}

// const deleteTask = (i, id) => {
//     taskList = taskList.slice(i, id)
//     displayEntryTask();
//     displayBadTask();
// }

const total = () => {
    const ttl = taskList.reduce((acc, item) => acc + item.hr, 0)
    totalHrElm.innerText = ttl;
    return ttl
}