let detailsVisible = true;
let important = false;
var serverUrl = "https://fsdiapi.azurewebsites.net/";


function categoryChange(){
    let selVal = $("#selCategory").val();
    console.log(selVal);

    if(selVal === "6"){
        $("#txtCategory").removeClass("hide");
    }
    else{
        $("#txtCategory").addClass("hide")
    }
}
function toggleImportant(){
    if(important){
        $("iImportant").removeClass('fas').addClass('far');
        important = false;
    }
    else{
        $("#iImportant").removeClass('far').addClass('fas');
        important = true;
    }
}

function toggleDetails(){
    if(detailsVisible){
        $("#capture-form").hide();
        detailsVisible = false;
    }
    else{
        $("#capture-form").show();
        detailsVisible = true;
    }
    console.log("works2");
}



function saveTask(){
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let location = $("#txtLocation").val();
    let dueDate = $("#selDueDate").val();
    let category = $("#selCategory").val();
    if(category === "6") category=$("#txtCategory").val();
    let color = $("#selColor").val();

    let task = new Task(title, iImportant, description, location, dueDate, category, color);
    console.log(task);

    $.ajax({
        type: "POST",
        url: serverUrl + "api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",

        success: function(res){
            console.log("Server says ", res);
            let responseTasks = JSON.parse(res);
            displayTask(responseTasks);
        },
        error: function(err){
            console.log("Error says ", err);
        }
    });
}

function displayTask(task){
    //create syntax
    let syntax = 
    `<div class="task" id="${task._id}"> 
        <i class=" important fas fa-star"></i>
        <div class="task-header-container">
            <div class="task-title">
                ${task.title}
            </div>
            <div class="task-description">
                ${task.description}
            </div>
        </div>
        <label class="task-details">
            ${task.location}
            ${task.dueDate}
            ${task.category}
        </label>
        <label class="task-color">
            ${task.color}
        </label>
    </div>`;
    //append syntax to html container
    $("#pendingTasks").append(syntax);
}

function init(){
    $("#btnDetail").click(toggleDetails);
    $("#btnAdd").click(saveTask);
    $("#selCategory").change(categoryChange);
    $("#iImportant").click(toggleImportant);
    console.log("Loaded");
    
}
window.onload=init;

/*function testRequest(){
    $.ajax({
        type: 'GET',
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(res){
            console.log("GREAT SUCCESS!", res);
        },
        error: function(err){
            console.log("DOES NOT COMPUTE!", err);
        }
    });
}*/