import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebFilterService } from '../../services/web-filter.service';
import { FilteringRule, Role, User } from '../../interfaces/filteringRules';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent  implements OnInit {

  public filteringRules: FilteringRule[] = [];
  userIPs: string[] = ['192.168.0.1', '192.168.0.2', '192.168.0.3'];  // Lista para almacenar las IPs únicas
  displayedColumns: string[] = ['url', 'action', 'userIP', 'role', 'actionBtn']; // Definimos las columnas a mostrar en la tabla
  newRule: {
    action: string;
    url: string;
    type: string;
    reason?: string;
    usuarios: User[]; 
    roles?: Role[];
  } = {
    action: 'bloquear',  // Valor por defecto
    url: 'any',             // Inicialmente vacío
    type: 'no category',            // Valor por defecto
    reason: 'no reason',
    usuarios: [],
    roles: [] ,
  };
   availableRoles: Role[] = [
    {action:'autorizar',  role: 'student', role_id: 1 },
    {action:'autorizar',  role: 'teacher', role_id: 2 },
    {action:'autorizar',  role: 'public', role_id: 3 }
  ]; 
  isUserIPSelected: boolean = false;
  isEventSelected: boolean = false;
  currentRule = { id: null, url: '', type: '', action: '', userIP: 'any', role: '' }; // Inicializamos una regla vacía
  isEditing = false; // Para saber si estamos editando o agregando una nueva regla
  users: any;
  ip: any;
  newRoles: Role | undefined;
  public selectedRule: FilteringRule | null = null;
  spans: { [key: number]: { [key: string]: number } } = {};

  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getFilteringRules();
    this.getUsers();
    // this.postFilteringRules(arg: any);
  }


  getFilteringRules(): void {
    this.webFilterService.getRules().subscribe(data => {
      console.log("data", data);
      this.filteringRules = data.rules || [];
      console.log("this.filteringRules", this.filteringRules);
      console.log("newRules", this.newRule);
      // Reemplazar 'null' o 'any' con 'ALL' en ip_usuario
      this.filteringRules = this.filteringRules.map((rule, index) => {
        rule.usuarios = rule.usuarios.map(user => {
          if (user.userIP === null || user.userIP === 'any') {
            user.userIP = 'ALL';
          }
          return user;
        });
        rule.id = index +1;
        return rule;
      });
        });
  }

  getUsers(): void {
    this.webFilterService.getUsers().subscribe(data => {
      console.log("users", data);
      // Mapear para extraer solo las direcciones IP de los usuarios
      this.users = data.map((user: any) => ({ip:user.userIP , role: user.role}));
      console.log("this.users", this.users);
    })
  }

  // Método para agregar una nueva regla
  addRule(): void {
    // Validar que la URL no esté vacía
    if (!this.newRule.url) {
      return;
    }
     // Si estamos en modo edición (la regla tiene un id), actualizamos la regla
     if (this.isEditing) {
      // Llamar al servicio para actualizar la regla
      const newData = JSON.stringify(this.newRule);
      this.webFilterService.editeRule(newData)
      .subscribe({
          next: data => {
          this.filteringRules = data;  // Actualizamos la lista de reglas con los datos devueltos
          this.getFilteringRules();
          this.getUsers();
          this.clearForm();  // Limpiamos el formulario después de editar
      },
      error: error => {
        alert(error.error);      }
    });
    } else {
        // Modo de agregar nueva regla
      if (this.newRule.action === 'autorizar') {
        const newData = JSON.stringify(this.newRule);
        this.webFilterService.addAuthorizedSite(newData).subscribe(data => {
          this.filteringRules = data;  // Actualizamos la lista de reglas
          this.clearForm();  // Limpiar el formulario aquí de agregar
        });
      } else {
        const newData = JSON.stringify(this.newRule);
        console.log("newData", newData);
        
        this.webFilterService.addRule(newData)
          .subscribe({
            next: data => {  // Manejar la respuesta exitosa
              this.filteringRules = data;  // Actualizamos la lista de reglas
              this.getFilteringRules();
              this.getUsers();
              this.spanRow('url', (rule)=> data.url);
              this.clearForm();  // Limpiar el formulario aquí de agregar
            },
            error: error => {  // Manejar el error
              if (error.status === 400 && error.error.message) {  // Verificar si el error es un 400 y tiene un mensaje
                console.error("Error del servidor:", error.error.message);  // Registrar el mensaje de error
                alert(error.error.message);  // Mostrar el mensaje de error específico del servidor
              } else {
                console.error("Error al agregar la regla:", error);  // Registrar cualquier otro error
                alert("Ocurrió un error al agregar la regla. Intenta nuevamente.");  // Mostrar alerta genérica
              }
            }
          });
      }
    }
    
  }
  // Método para eliminar una regla de filtrado
  deleteRule(data: any): void {
    console.log("delete",data);
    this.webFilterService.deleteRule(data).subscribe(() => {
      // Al eliminar la regla, actualizamos la lista
      this.filteringRules = this.filteringRules.filter(data => data.id !== data.id);
      this.getFilteringRules();
      this.getUsers();
    });
  }

   // Método para editar una regla
   editRule(rule: FilteringRule) {
    console.log("edit",rule);
    
    this.newRule = {
      ...rule,
      usuarios: rule.usuarios ? rule.usuarios.map((u: any) => u.userIP) : [],  // Mapear usuarios si los hay
      roles: rule.roles ? rule.roles.map((r: any) => r.role) : [] // Mapear roles si los hay
    };
    console.log("this.newRule", this.newRule);
    this.isEditing = true; // Cambiamos a modo edición
  }
   // Método que se ejecuta al cambiar la selección de la IP
   onUserIPSelectionChange(event: any) {
    // Si la IP seleccionada no es 'any', se deshabilita la selección de rol
    this.isUserIPSelected = event.value !== 'any';
    this.newRule.roles = [];
  }

  onEventSelectionChange(event: any) {
    // Si la IP seleccionada no es 'any', se deshabilita la selección de rol
    this.isEventSelected = event.value !== 'any';
    this.newRule.usuarios =  []; 
  }
  // Limpiar el formulario
  clearForm(): void {
    this.newRule = {
      action: 'bloquear',  // Valor por defecto
      url: '',             // Inicialmente vacío
      type: 'a' ,
      usuarios: [],
      roles: [],         // Valor por defecto
    };
  }
  

  
    getRowSpan(col: string | number, index: number) {    
    return this.spans[index] && this.spans[index][col];   
  }

  spanRow(key: string, accessor: (rule: any) => any) {
    this.spans = {}; // Inicializamos `spans`
  
    for (let i = 0; i < this.filteringRules.length;) {
      const currentValue = accessor(this.filteringRules[i]);
      let count = 1;
  
      // Contamos cuántas filas coinciden con el valor actual
      for (let j = i + 1; j < this.filteringRules.length; j++) {
        if (currentValue !== accessor(this.filteringRules[j])) {
          break;
        }
        count++;
      }
  
      // Almacenar el `rowspan` calculado para esa fila
      if (!this.spans[i]) {
        this.spans[i] = {};
      }
  
      // Guardamos el rowspan solo para las URLs
      this.spans[i][key] = count; // Asignamos el valor de `count`
      i += count; // Saltamos a la siguiente fila única
    }
}

  
  // Función para determinar el rowspan dinámico
getRowSpan1(rule: FilteringRule, actionType: string): number {
  // Verifica que los usuarios tengan un tipo correcto para 'action'
  return rule.usuarios.filter(user => user.action === actionType).length || 1;
}
getRowSpan2(rule: any): number {
  const userCount = rule.usuarios.length;
  const roleCount = rule.roles.length;
  
  // Retornar el total de filas necesarias para mostrar la URL
  return Math.max(userCount, roleCount);
}
}
