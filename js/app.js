const slcEl = (el) =>{ return document.querySelector(el)}
const slcElAll = (el) =>{ return document.querySelectorAll(el)}


const tableBody = slcEl('.table tbody');
var users = [];



// >>>>>>>>> Get Method 

    function fetchCandidate(){
        $.ajax({
          url:'./include/action.php',
          method:'POST',
          data:{action:"fetch"},
          dataType:'JSON',
          success:function(data){
            // set data in global variable  
              users = data;
              createTable();
             
          }
        })
    }
    fetchCandidate();



// >>>>>> Delete Method 

    const MsgAlert = document.querySelector('.msg-alert');

    function deleteUser(id){
                    if(window.confirm('do you want to delete this user ?')){
                        //get id 
                        let userId = id;
      
                        $.ajax({
                          url:'./include/action.php',
                          method:'POST',
                          data:{ id:userId, action:'delete'},
                          dataType:"JSON",
                          success:function(data){
                                users = users.filter(user => user.id != userId);
                                createTable();

                                // check type of msg for choose type of alert 
                                if(data.type == 'success'){
                                   MsgAlert.classList.add('alert-success');
                                    //  set alert message value 
                                   MsgAlert.innerHTML = '<i class="fa fa-check me-3" aria-hidden="true"></i>' + data.msg;
                                }else{
                                   MsgAlert.classList.add('alert-danger');
                                    //  set alert message value 
                                   MsgAlert.innerHTML = '<i class="fa fa-exclamation-circle me-3" aria-hidden="true"></i>' + data.msg;
                                }

                                //  show alert message
                                  MsgAlert.style.display = 'block';
                                //  after 2 second hide alert message
                                setTimeout(()=>{
                                    MsgAlert.style.display = 'none';
                                },2000);
                          }
                        });
            }else{
              return false;
            }
       }




// >>>>>>> Post method
 
    const formControl = document.querySelectorAll('.form-control');
    var errors = [];
  
    
    $('#form').on('submit', function(e) { // submit function 
        e.preventDefault();

        // check all fields
        formControl.forEach((el)=>{

                if(el.value.length > 0){
                        el.classList.remove('border-danger');
                        el.classList.add('border-success');   
                }else{
                        el.classList.add('border-danger');
                        el.classList.remove('border-success');
        
                        errors.push('error'); // check an error 
                }
        })

        // check if it there is no error  
        if(errors.includes('error') === false){
        
            var formD = $('#form')[0];
            $.ajax({
                url:"./include/action.php",
                method:"POST",
                data:new FormData(formD),
                processData: false,
                contentType: false,
                success: function(data){

                    $('#form')[0].reset();// vide input 
                    window.location.href = "index.html"; //redirect to index.html
                }
            })
        }else{
            
            errors = []; // vide errors 
        }
        
    
 });





// create users table 
function createTable(){
      
  var output ="";

  if(users.length > 0){
    users.forEach((user) => {
        output +=
        `<tr>
             <td scope="col">${user.id}</td>
             <td scope="col">${realDate(user.createdDate)}</td>
             <td scope="col">
                     <span class="badge ${realClass(user.status)}">${user.status}</span>
             </td>
             <td scope="col">${user.LastName}</td>
             <td scope="col">${user.firstName}</td>
             <td scope="col">${user.userName}</td>
             <td scope="col">${user.registrationNumber}</td>
             <th scope="col">
                 <button class="btn btn-white delete_user" onclick="deleteUser(${user.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
             </th>
        </tr>`;
     });
  }else{
    output +=`<tr>
                 <td colspan="8" class="text-center text-danger">sorry no users to list</td>
             </tr>`;
  }

  tableBody.innerHTML = output;

}





//!============= get status class
    function realClass(status){
        if(status.match(/é/gi) != null && status.match(/é/gi).length > 0){
            status = status.replace(/é/g,"e");
        }
        status = status.replace(" ","-").toLowerCase();
        return status;
        
    }


//!============== make real date 
    function realDate(CreatedDate){
        if(CreatedDate.match(/T/g) != null && CreatedDate.match(/T/g).length > 0){
            CreatedDate = CreatedDate.slice( 0 , CreatedDate.indexOf('T'));
        }
        date = CreatedDate.replace(/-/g,'/');
        return date;
    }


//!=============== modal 
     const modal = slcEl('.modal-add-user');

     // show modal
     slcEl('#add-user').addEventListener('click',()=>{
         modal.style.display = 'flex';
     });
 
     // hide modal 
     modal.addEventListener('click',(e)=>{
         // check if clicked out modal-content
         if(e.target.classList.contains('modal-add-user')){
             modal.style.display = 'none';
         }
     });