<?php
// src/Controller/ProjectController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProjectController
{

    public function __construct(){
        //this is to initialize this file
$this->filename='myfile/company.yaml';
//$this->timezone ="hello";
    }
    /**
    * @Route("/displayin_table")
    */
    public function displayin_table(){//afficher 
        
        $mydata = Yaml::parseFile($this->filename);
        
        /*return new Response(
           print_r($mydata["organizations"]),
        );*/
        return new JsonResponse($mydata["organizations"]);
        
    }
   /**
    * @Route("/submitdata")
    */
    public function submitdata(Request $request)
    {
     
     $action=$request->get('action');//c'est le nom de function(just to make it dynamic)
     $keydata=$request->get('keydata');
     $name=$request->get('name');
     $description=$request->get('description');

return $this->$action($keydata,$name,$description);//this a good way to create dynamic function and call it
       
    }
    public function add_new($keydata,$name,$description){//modifier le tableau (this is action)
        $yamlContents=Yaml::parseFile($this->filename);
        array_push($yamlContents["organizations"],array("name"=>$name,"description"=>$description));
        return $this->save_file($yamlContents);
    }
    
    public function edit_file($keydata,$name,$description){//modifier le tableau (this is action)

        $yamlContents=Yaml::parseFile($this->filename);
        $yamlContents["organizations"][$keydata]['name']=$name;
        $yamlContents["organizations"][$keydata]['description']=$description;
        
        return $this->save_file($yamlContents);
    }
    public function del_file($keydata,$name,$description){//supprime le tableau (this is action)
        $yamlContents=Yaml::parseFile($this->filename);
        unset($yamlContents["organizations"][$keydata]);
        return $this->save_file($yamlContents);//after delete call save function
    }
    public function save_file($yamlContents){//overwrite
        
        $yaml = Yaml::dump($yamlContents,5,2);//this is save same format of yaml
        file_put_contents($this->filename, $yaml);//this is to overwrite content on same yaml file
        $message="done";
        return new JsonResponse(array("message"=>$message));
    }
}