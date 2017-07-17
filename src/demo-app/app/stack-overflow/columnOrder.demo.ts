import {Component} from '@angular/core';

@Component({
  selector: 'demo-complex-column-ordering',
  styleUrls: [
    'columnOrder.demo.css',
    '../demo-app/material2.css'
  ],
  template: `
    <md-card class='card-demo'>
      <md-card-title><a
          href='http://stackoverflow.com/questions/36988183/flex-box-out-of-borders?rq=1'
          target='_blank'>StackOverflow</a></md-card-title>
      <md-card-subtitle>Complex column ordering to wrap items to align to items above
      </md-card-subtitle>
      <md-card-content>
        <div class='containerX' (click)='toggleDirection()' [fxLayout]='direction' fxLayoutWrap
             style='cursor: pointer;'>
          <div class='one   flexitem '> 1
            <div class='markup'>&lt;div fxFlexOrder='1'&gt;</div>
          </div>
          <div class='two   flexitem ' fxFlexOrder='3'> 2
            <div class='markup'>&lt;div fxFlexOrder='3'&gt;</div>
          </div>
          <div class='three flexitem ' fxFlexOrder='5'> 3
            <div class='markup'>&lt;div fxFlexOrder='5'&gt;</div>
          </div>
          <div class='four  flexitem '> 4
            <div class='markup'>&lt;div fxFlexOrder='2'&gt;</div>
          </div>
          <div class='five  flexitem ' fxFlexOrder='4'> 5
            <div class='markup'>&lt;div fxFlexOrder='4'&gt;</div>
          </div>
        </div>
      </md-card-content>
      <md-card-footer class='bottomPad'>
        <div class='hint'>&lt;fxLayout='{{ direction }}'&gt;</div>
      </md-card-footer>
    </md-card>
  `
})
export class DemoComplexColumnOrder {
  direction = 'column';

  toggleDirection() {
    let next = (DIRECTIONS.indexOf(this.direction) + 1 ) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}

const DIRECTIONS = ['column', 'column-reverse'];
