import { Component, OnInit} from '@angular/core';
import { Hero } from './hero';
import { HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',

  // template: '<h3>My Dashboard</h3>'
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroSerivce: HeroService){}

  ngOnInit() : void {
    this.heroSerivce.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
