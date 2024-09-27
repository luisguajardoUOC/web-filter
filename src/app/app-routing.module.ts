import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';  // Asegúrate de importar el componente


const routes: Routes = [
  { path: '', component: LayoutComponent },  // Carga directa del LayoutComponent
  { path: '**', redirectTo: '' }  // Redirige cualquier ruta no encontrada a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
