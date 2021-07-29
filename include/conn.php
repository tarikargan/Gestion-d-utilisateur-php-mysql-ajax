<?php

 class User {
   public $conn;
   private $host = 'localhost';
   private $username = 'root';
   private $password = '';
   private $dbname = 'utilisateur';
   
    function __construct(){
        $this->connect();
    }

// create connection
      private function connect(){
              $dsn = "mysql:host=".$this->host.";dbname=".$this->dbname."";
              $this->conn = new PDO($dsn, $this->username, $this->password);
              $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
              $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
      }


// get method
      function fetchCandidates(){

        $qry='SELECT * FROM users ORDER BY id DESC';
        $stmt= $this->conn->prepare($qry);
        $stmt->execute();
        $users = $stmt->fetchAll();
        echo json_encode($users);
      }


// Post method 
    function insertCandidate($firstName,$lastName,$userName,$status,$registerationNumber,$createdDate){
           
          $userData =[
              ':firstName'=>       $firstName,
              ':lastName'=>        $lastName,
              ':userName'=>        $userName,
              ':status'=>          $status,
              ':registerNumber' => $registerationNumber,
              ':createdDate'=>     $createdDate
          ];

          $sql = "INSERT INTO `users`(`firstName`, `LastName`, `userName`, `status`, `registrationNumber`, `createdDate`) VALUES (:firstName,:lastName,:userName,:status,:registerNumber,:createdDate)";
          $stml = $this->conn->prepare($sql);
          $stml->execute($userData);
          echo 'create success';

    }

  


    // Delete Condidate
    function deleteUser($id){
       
      $qry_delete="Delete FROM users where id = $id";
      $stmt= $this->conn->prepare($qry_delete);

      if($stmt->execute()){
            $result['type'] ="success";
            $result['msg'] ="delete success";
      }else{
            $result['type'] ="error";
            $result['msg'] ="sorry is not found this id";
      }
      echo json_encode($result);
    }


    
  }


?> 