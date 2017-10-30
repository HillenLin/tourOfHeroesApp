// this file holds the HeroDetailComponent --sub component of AppComponent
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location} from '@angular/common'
import { Hero } from './hero';
import { HeroService} from './hero.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'hero-detail',
 templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private heroSerivce: HeroService,
    private router: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(): void {
    this.router.paramMap
      .switchMap( (params:ParamMap) => this.heroSerivce.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroSerivce.update(this.hero).then( ()=>this.goBack());
  }
}
