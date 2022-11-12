console.log('in client js');

$(onReady);

function onReady() {
    getTasks();
    console.log('JQ')
    //clickListen();
    $('#addTask').on('click', postTask);
    $('#taskList').on('click', '.delete-btn', deleteTask);
    $('#taskList').on('click', '.update-btn', markTast);
}

// function clickListen() {
//     $('#addTask').on('click', postTask);
//     $('#taskList').on('click', '.delete-btn', deleteTask);
// }

function postTask() {
    let newTask = {
       task: $('#taskDescription').val(),
       complete: false  //only temporary unless it works
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log('posting')
        $('#taskDescription').val('');
        getTasks();
    }).catch(function(error) {
        alert(`failure ${error}`)
    });
}

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
            <tr>
                <td>${response[i].task}</td>
                <td>${response[i].complete}</td>
                <td>
                    <button class="delete-btn" data-id="${response[i].id}">Delete</button>
                </td>
                <td>
                    <button class="update-btn" data-id="${response[i].id}">Done?</button>
                </td>
            </tr>
            `)
        }
    }).catch(function(error) {
        alert(`not good ${error}`)
    })
}

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

function markTast() {
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