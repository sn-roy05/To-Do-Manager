import { LightningElement ,api, track } from 'lwc';

export default class ToDOApplication extends LightningElement {
    @track 
    taskName = "" ;
    @track
    taskDate = null;
    incompleteTask=[];
    completedTask=[];
    changeHandler(event){
        let {name, date} = event.target;
        if(name === "taskName"){
            this.taskName = value;
        }else if(name === "taskDate"){
            this.taskDate = date;
        }
        console.log(this.taskName);
        console.log(this.taskDate);
    }
    handleReset(){
        this.taskName = "" ;
        this.taskDate = null;
    }

    handleNewtask(){
        if(!this.validateTask()){

        }
        

    }
    validateTask(){
        isValid= true;
        //check for taskDate
        //check for taskName && taskDate
        if(!this.taskName){
            isValid = false;
               
        }
       
        //check for duplication if taskname & date is same 
    
    
    }



}