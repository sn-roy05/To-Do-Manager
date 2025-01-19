import { LightningElement ,api, track } from 'lwc';

export default class ToDOApplication extends LightningElement {
  
    @track taskName = "" ;
   
    @track taskDate = null;
    @track incompleteTask=[];
    @track completedTask=[];
    array1 = [];
   
    changeHandler(event){
        let {name, value} = event.target;
        if(name === "taskName"){
            this.taskName = value;
        }else if(name === "taskDate"){
            this.taskDate = value;
        }
        
    }
    handleReset(){
        this.taskName = "" ;
        this.taskDate = null;
    }

    handleNewtask(){
         // Check for taskDate and set today's date if null
         if (!this.taskDate) {
            this.taskDate = new Date().toISOString().split("T")[0];
        }

        if (this.validateTask()) {
            const newTask = {
                id: this.incompleteTask.length + 1,
                taskName: this.taskName,
                taskDate: this.taskDate,
            };
            //sort the array based on the taskDate
            this.incompleteTask = this.sortArray([...this.incompleteTask, newTask] ) ;
            
            console.log("New task added, current tasks:", this.incompleteTask); // Debugging
            
            // Clear input fields, reset taskDate to today's date
            this.handleReset();
            
        } else {
            console.log("Task validation failed");
        
        }
        

    }
    
    sortArray(array) {
        return [...array].sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
    }
    validateTask(){
       let isValid= true;
        //check for taskDate
        //check for taskName && taskDate
        // Check for taskName
        if (!this.taskName) {
            alert("Task Name cannot be empty.");
            isValid = false;
        }
    
       
        //check for duplication if taskname & date is same 
        // Check for duplicate task
        const isDuplicate = this.incompleteTask.some(
            (task) =>
                task.taskName.toLowerCase() === this.taskName.toLowerCase() &&
                task.taskDate === this.taskDate
        );

        if (isDuplicate) {
            alert("Task already exists with the same name and date.");
            isValid = false;
        }
        return isValid;    
        
        }

    handleDelete(event){
        //Get the id of task 
        const taskId = parseInt(event.target.dataset.id, 10);

        // Remove the task with the matching ID from incompleteTask
        this.incompleteTask = this.incompleteTask.filter((task) => task.id !== taskId);
    
        // Sort the array based on the taskDate after deletion
        this.incompleteTask = this.sortArray(this.incompleteTask);
    
        console.log("Task deleted, updated tasks:", this.incompleteTask);
    }

    handleCheck(event){
    // Get the task's unique ID from the button's data-id attribute
    const taskId = parseInt(event.target.dataset.id, 10);

    // Find the task to move to completedTask
    const taskToMove = this.incompleteTask.find((task) => task.id === taskId);
   
     
    if (taskToMove) {
        // Get today's date without time
        const today = new Date().toISOString().split('T')[0];

        // Check if the task date is today or in the future
        if (new Date(taskToMove.taskDate) >= new Date(today)) {
            alert("Task with a current or future task date can't be completed.");
            return; // Exit the method without completing the task
        }

        // Add the task to completedTask and sort
        this.completedTask = this.sortArray([...this.completedTask, taskToMove]);

        // Remove the task from incompleteTask
        this.incompleteTask = this.incompleteTask.filter((task) => task.id !== taskId);

        console.log("Task moved to completed tasks:", this.completedTask);
    }
}
    
}


