import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap, Router, CanDeactivate } from '@angular/router';

import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-deactivate-guard.service';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  editAllow:boolean = false;
  changesSaved:boolean = false;

  constructor(private serversService: ServersService,
              private route : ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   
    this.route.queryParams
    .subscribe(
      (queryParam:Params) =>{
        this.editAllow = queryParam['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    this.route.params.subscribe(
      (params:ParamMap) =>{
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.changesSaved = true;
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.editAllow) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
