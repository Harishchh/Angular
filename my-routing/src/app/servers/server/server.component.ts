import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    // console.log("in side ngOnInit"+id);
    this.route.data
    .subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (param:ParamMap)=>{
    //   this.serversService.getServer(+param['id']);
    //   console.log("in side subscribe"+param['id'])
    // });
  }

  onEdit(){
   // for the relative path
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'});

  }
}
