import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todos:any[]=[]
  fetching:boolean=false;

  constructor(
    private todoService :TodoService
  ){}

  ngOnInit(): void {
    this.fetching = true
    this.todoService.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item=>{
      this.fetching = false
      this.todos=item.sort((a:any,b:any)=>a.isDone - b.isDone)
    })
  }

  onClick(titleInput:HTMLInputElement){
    if(titleInput.value){
      this.todoService.addTodo(titleInput.value);
      titleInput.value=''
    }
  }

  onStatusChange(id:string,newStatus:boolean){
    this.todoService.updateTodoStatus(id,newStatus)
  }

  deleteTodo(id:string){
    this.todoService.deleteTodo(id)
  }
}
