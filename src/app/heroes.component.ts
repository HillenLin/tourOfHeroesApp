import { Component, OnInit} from '@angular/core';
import { Hero } from './hero';
import { HeroService} from './hero.service';
import { Router} from '@angular/router'


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {


  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService,
  ){}

  onSelect(hero:Hero): void{
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroes = this.heroSerivce.getHeroes(); --- without Promise
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    //es5: function(heroes){ this.heroes = heroes}
    //es6: heroes => this.heroes = heroes
  }

  ngOnInit() : void {
    this.getHeroes();
  }

  gotoDetail(): void {
    console.log("test");
    this.router.navigate(['/detail',this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });

  }

  delete(hero: Hero): void {
  this.heroService
    .delete(hero.id)
    .then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) { this.selectedHero = null; }
    });
  }

}
