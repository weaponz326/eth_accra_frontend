import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  isPatient: boolean = false;
  isProvider: boolean = false;
  isCollapsed: boolean = true;

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (address) {
        // TODO: Query contracts to set isPatient/isProvider
      }
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
