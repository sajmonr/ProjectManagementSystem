import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  projectId = -1;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(evt => {
      if(evt instanceof RoutesRecognized){
        const projectId = evt.state.root.firstChild.params['id'];
        this.projectId = projectId ? projectId : -1;
      }
    })
  }
}
