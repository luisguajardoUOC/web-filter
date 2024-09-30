import { Component, OnInit } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';
import { User } from '../../interfaces/filteringRules';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  implements OnInit  {

  public users: User[] = [];
  user: User = {
    id: '',
    username: '',
    user_ip: '',
    email: '',
    role: 'public'
  };
  displayedColumns: string[] = ['username', 'user_ip', 'email', 'role', 'actions'];
  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  getUsers(): void {
    this.webFilterService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  }

  onSubmit(): void {
    if (this.user.id){
      this.webFilterService.updateUser(this.user).subscribe(() => {
        this.getUsers();
      });
    } else {
      this.webFilterService.createUser(this.user).subscribe(() => {
        this.getUsers();
      });
    }
    this.resetForm();

  }
  // Eliminar usuario
  onDelete(id: string): void {
    this.webFilterService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
  // Cargar usuario en el formulario para editar
  onEdit(user: User): void {
    this.user = { ...user };
  }

// Limpiar el formulario
resetForm(): void {
  this.user = {
    id: '',
    username: '',
    user_ip: '',
    email: '',
    role: 'public'
  };
}
}
