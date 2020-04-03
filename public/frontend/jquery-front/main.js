//const link="http://localhost:8080";//change this one with your backend url link running yaml processing file
$(function(){
    display_data();
});
function display_data(){
$.ajax({
//url:`${link}/displayin_table`,
url:`/displayin_table`,
type:"get",

success:function(data){


//console.log(data);
var tablehtml="";
for(var i=0;i<data.length;i++)
{
console.log(data[i]["name"]); 
$desription=data[i]["description"].replace(/'/g, "\\'");
$name=data[i]["name"].replace(/'/g, "\\'");
 
  $del_data=`<a class="btn btn-danger  btn-sm" href="#" onclick="return del(${i},'${$name}','${$desription}')">del</a>`;
  $edit_data=`<a class="btn btn-primary btn-sm" href="#" onclick="return edit(${i},'${$name}','${$desription}')">edit</a>`;
  tablehtml+= '<tr><th scope="row">' + i + '</th><td>' + data[i]["name"] + '</td><td>' + data[i]["description"] + '</td><td>'+ $edit_data + '</td><td>' + $del_data + '</td></tr>';
}

$("#table_display tbody").html(tablehtml);
}
});
}
function add_new()
{
//console.log(name);
$('#modalform').modal('show');
$('.form-control').val("");//reset form
$('.form-control').text("");//reset form

$('#formdata').removeClass('d-none').addClass('d-block');
$('.modal-title').text("Ajoute une Organisation");
$('#action').val("add_new");
return false;

}
function edit(keydata,name,description)
{
//console.log(name);
$('#modalform').modal('show');
$('#formdata').removeClass('d-none').addClass('d-block');
$('#keydata').val(keydata);
$('#name').val(name);
$('#description').val(description);
$('#action').val("edit_file");
$('.modal-title').text("Modifier une Organisation");
return false;
}

function del(keydata,name,description)
{
//console.log(name);
$('#modalform').modal('show');
$('#formdata').removeClass('d-block').addClass('d-none');
$('#keydata').val(keydata);
$('#name').val(name);
$('#description').val(description);
$('#action').val("del_file");

$('.modal-title').html(`voulez-vous supprimer <span style="color:red">${name}?</span>`);
return false;
}

function submitdata(){
$.ajax({

//url:`${link}/submitdata`,
url:`/submitdata`,
data:$('#formdata').serialize(),
success:function(data){
    console.log(data);
    $('#modalform').modal('hide');
    display_data();
}

});
return false;
}
