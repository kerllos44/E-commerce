import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FooterComponent } from "./layouts/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-commerce';
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
