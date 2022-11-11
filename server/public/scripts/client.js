console.log('in client js');

$(onReady);

function onReady() {
    console.log('JQ')
    clickListen();
}

function clickListen() {
    $('#addTask').on('click', postTask);
}

function postTask() {
    let newTask = {
       task: $('#taskDescription').val()
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