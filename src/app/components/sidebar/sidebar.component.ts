import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ComponentsService } from '../components.service';
import { AuthService } from 'src/app/auth/auth.service';

interface MenuItem {
  class: string;
  path: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  
  menuItems: any;
  public isCollapsed = true;

  constructor(private router: Router, private componentsService: ComponentsService, private authservice: AuthService,) { }

  ngOnInit() {
    this.menuItems = this.componentsService.getMenuForRole(this.authservice.roleValue);

    // this.menuItems = this.menuItems.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
