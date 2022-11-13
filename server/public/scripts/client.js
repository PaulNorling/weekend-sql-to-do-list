console.log('in client js');

$(onReady);

function onReady() {
    getTasks();
    console.log('JQ');
    clickListeners();
}

//buton click listeners
function clickListeners() {
    $('#addTask').on('click', postTask);
    $('#taskList').on('click', '.delete-btn', deleteTask);
    $('#taskList').on('click', '.update-btn', markTask);
}

//post task
function postTask() {
    let newTask = {
       task: $('#taskDescription').val(),
       complete: false  
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log('posting', response)
        $('#taskDescription').val('');
        getTasks();
    }).catch(function(error) {
        alert(`failure ${error}`)
    });
}

//get tasks
function getTasks() {
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log("GET tasks response", response);
        //append to DOM
        for ( let i =0; i < response.length; i++) {
            $('#taskList').append(`
            <tr class="
                ${(response[i].complete) ? 'completed' : 'incomplete'}
            ">
                <td>${response[i].task}</td>
                <td>
                    <button class="update-btn" data-id="${response[i].id}">Complete</button>
                </td>
                <td>
                    <button class="delete-btn" data-id="${response[i].id}">Delete</button>
                </td>
            </tr>
            `)
        }
    }).catch(function(error) {
        alert(`not good ${error}`)
    })
}

//delete task
function deleteTask() {
    const taskId = $(this).data('id');
    console.log('taskId:', taskId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    })
    .then(function() {
        getTasks();
    }) 
    .catch(function(error) {
        alert(`delete function ${error}`);
    });
}

//mark task as complete
function markTask() {
    const id = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`
    })
    .then(function() {
        getTasks();
    })
    .catch(function(error) {
        alert('no good!', error);
    })
}
