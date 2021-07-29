<?php

require_once './conn.php';


$user = new User();

// Post user 
if(filter_has_var(INPUT_POST,"firstName")){
    $firstName =               htmlspecialchars($_POST['firstName']);
    $lastName =                htmlspecialchars($_POST['lastName']);
    $userName =                htmlspecialchars($_POST['userName']);
    $status =                  htmlspecialchars($_POST['status']);
    $createdDate =             htmlspecialchars($_POST['createdDate']);
    $registrationNumber =      htmlspecialchars($_POST['registrationNumber']);

    $user->insertCandidate($firstName,$lastName,$userName,$status,$registrationNumber,$createdDate);
}

// get users 
if(isset($_POST['action']) && $_POST['action'] == 'fetch'){
    $user->fetchCandidates();
}

//delete user
if(isset( $_POST['action']) && $_POST['action'] == 'delete'){

    $user->deleteUser($_POST['id']);
}

?>