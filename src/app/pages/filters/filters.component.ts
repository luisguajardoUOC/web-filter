import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebFilterService } from '../../services/web-filter.service';
import { FilteringRule, Role, Types, User } from '../../interfaces/filteringRules';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent  implements OnInit {

  public filteringRules: FilteringRule[] = [];
  public maliciousWords: string[] = [];
  public maliciousWordsText: string = '';
  public newMaliciousWord: {
    keyword: string;
  } = {
    keyword: ''
  };
  filteringRulesUnique: FilteringRule[] = [];


  userIPs: string[] = ['192.168.0.1', '192.168.0.2', '192.168.0.3'];  // Lista para almacenar las IPs únicas
  displayedColumns: string[] = ['url', 'action', 'userIP', 'role', 'actionBtn']; // Definimos las columnas a mostrar en la tabla
  newRule: {
    action: string;
    url: string;
    type: Types[];
    reason?: string;
    usuarios: User[];
    roles?: Role[];
  } = {
    action: 'bloquear',  // Valor por defecto
    url: '',             // Inicialmente vacío
    type: [],            // Valor por defecto
    reason: 'no reason',
    usuarios: [],
    roles: [] ,
  };
   availableRoles: Role[] = [
    {action:'autorizar',  role: 'student', role_id: 1 },
    {action:'autorizar',  role: 'teacher', role_id: 2 },
    {action:'autorizar',  role: 'public', role_id: 3 }
  ];
  availableTypes: Types[] = [
    {id: 1, type:'sport'}, {id:2, type:'politics'}, {id:3, type:'social'}, {id:4, type:'entertainment'}, {id:5, type:'health'}, {id:6, type:'news'}, {id:7, type:'sport'}
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
  proxyStatus: boolean | undefined;
  constructor(private webFilterService: WebFilterService)
  {

  }
  ngOnInit(): void {
    this.getFilteringRules();
    this.getMaliciousWords();
    this.getUsers();
    this.getProxyStatus();


    // this.postFilteringRules(arg: any);
  }


  getFilteringRules(): void {
    this.webFilterService.getRules().subscribe(data => {
      console.log("data", data);
      this.filteringRules = data.rules || [];
      console.log("this.filteringRulesUnique", this.filteringRulesUnique);
      // Asumiendo que ya tienes filteringRules y filteringRulesUnique definidos
      if (this.filteringRulesUnique.length > 0 && this.filteringRulesUnique[0]?.url) {
        // Solo filtra si filteringRulesUnique tiene al menos un elemento y 'url' está definida
        this.filteringRulesUnique = this.filteringRules.filter(rule =>
            rule.url === this.filteringRulesUnique[0].url);
      } /*else {
        // Si filteringRulesUnique está vacío o sin datos válidos, asigna todas las reglas
        this.filteringRulesUnique = [...this.filteringRules];
      }*/
      console.log("this.filteringRules", this.filteringRules);
      console.log("this.filteringRulesUnique", this.filteringRulesUnique);
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
      alert('La URL no puede estar vacía.');
      return;
    }
    // Expresión regular para validar la URL sin path
    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (!urlPattern.test(this.newRule.url)) {
      alert('El formato de la URL no es válido o incluye un path. Introduce solo el dominio.');
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
          this.isEditing = false;
      },
      error: error => {
        alert(error.error);      }
    });
    } else {
        // Modo de agregar nueva regla
        if (this.newRule.action === 'autorizar') {
          const newData = JSON.stringify(this.newRule);
          this.webFilterService.addRule(newData).subscribe(data => {
            this.filteringRules = data;  // Actualizamos la lista de reglas
            this.getFilteringRules();
            this.getUsers();
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
   editRule(rule: FilteringRule, action: string): void {
    console.log("edit",rule);

    this.newRule = {
      ...rule,
      usuarios: rule.usuarios ? rule.usuarios.filter((u: any) => u.action === action).map((u: any) => u.userIP) : [],  // Mapear usuarios si los hay
      roles: rule.roles ? rule.roles.filter((r: any) => r.action === action).map((r: any) => r.role) : [],
      action: action
    };
    console.log("this.newRule", this.newRule);
    this.isEditing = true; // Cambiamos a modo edición
  }

  applyFilter(event:any){
    //console.log("event",event);
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    //console.log("filterValue",filterValue);
    if (filterValue === '') {
      //this.filteringRulesUnique = [...this.filteringRules];
      this.filteringRulesUnique = [];
    } else {
      //this.historyData = this.historyData.filter((item: any) => item.userIP.includes(filterValue));
        this.filteringRulesUnique = this.filteringRules.filter((item: any) => {
        const a = item.url.includes(filterValue)
        return  a
        //item.role.inclues(filterValue)
      });
      console.log("filteringRulesUnique",this.filteringRulesUnique);
    }
  }


  getMaliciousWords(){
    this.webFilterService.getKeywords().subscribe(data => {
      console.log("MaliciousWords", data);
      this.maliciousWords = data;
      this.maliciousWordsText = this.maliciousWords.join('\n');
    })
  }

  addMaliciousWord(): void {
    const newData = JSON.stringify(this.newMaliciousWord);
    console.log("newData", newData);
    this.webFilterService.addKeyword(newData).subscribe(data => {
      this.getMaliciousWords();
      //this.newMaliciousWord = '';
    })
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
      type: [],           // Inicialmente vacío] ,
      usuarios: [],
      roles: [],         // Valor por defecto
    };
  }








  // Función para determinar el rowspan dinámico
  hasAuthorizedUsers(users: any[]): boolean {
    return users.some(user => user.action === 'autorizar');
  }

  hasAuthorizedRoles(roles: any[]): boolean {
    return roles.some(role => role.action === 'autorizar');
  }

  reloadProxy()  {
  this.webFilterService.reoladProxy().subscribe(data => {
    console.log("data", data);
  })
 }
 getProxyStatus() {
  this.webFilterService.getProxyStatus()
  .subscribe( {
    next:data => {
      this.proxyStatus = true;
    },
    error :(error) => {
      this.proxyStatus = false;
    }

  });
}
 }
