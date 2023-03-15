import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private router: Router) {
  }

  public swalBasic(title: string, body: string, type: SweetAlertIcon, buttonText: string = 'Ok') {
    return Swal.fire({ title, html: body, icon: type, confirmButtonText: buttonText, heightAuto: false })
  }

  public swalRouted(title: string, body: string, type: SweetAlertIcon, route: string, buttonText: string = 'Ok') {

    return Swal.fire({ title, html: body, icon: type, confirmButtonText: buttonText, heightAuto: false }).then((x: any) => {
      this.router.navigateByUrl(route);
    })
  }

  public SwalConfirm(title: string = "Are you sure you want to delete this resource?", icon:SweetAlertIcon = "warning", confirmButtonText: string = "Yes, Do it!") {
    return  Swal.fire({
       title,
       icon,
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText
     });
   }

}
