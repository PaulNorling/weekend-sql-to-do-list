console.log('in client js');

$(onReady);

function onReady() {
    getTasks();
    console.log('JQ')
    clickListen();
}

function clickListen() {
    $('#addTask').on('click', postTask);
}

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
    }).catch(function(error) {
        alert(`failure ${error}`)
    });
}

function getTasks() {
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
            </tr>
            `)
        }
    }).catch(function(error) {
        alert(`not good ${error}`)
    })
}

function deleteTask()