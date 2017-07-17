import {Component} from '@angular/core';

@Component({
  selector: 'demo-grid-column-span',
  styleUrls: [
    'columnSpan.demo.css',
    '../demo-app/material2.css'
  ],
  template: `
    <md-card class='card-demo'>
      <md-card-title><a href='http://jsfiddle.net/tndgvkfq/' target='_blank'>JsFiddle</a>
      </md-card-title>
      <md-card-subtitle>Grid with column spans calculated
        using
        '<span style='color: #333333'>flex: &lt;grow&gt; &lt;shrink&gt; calc(&lt;...&gt;);</span>'
        expressions.
      </md-card-subtitle>
      <md-card-content>
        <div class='containerX'>
          <div class='container'>
            <div>flex: 1 1 5em;</div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class='container'>
            <div></div>
            <div [fxFlex]='calc2Cols'> flex: 2 2 calc(10em + 10px);</div>
            <div></div>
          </div>
          <div class='container'>
            <div [fxFlex]='calc2Cols'> flex: 2 2 calc(10em + 10px);</div>
            <div></div>
            <div></div>
          </div>
          <div class='container'>
            <div></div>
            <div></div>
            <div [fxFlex]='calc2Cols'> flex: 2 2 calc(10em + 10px);</div>
          </div>
          <div class='container'>
            <div [fxFlex]='calc3Cols' class='col3'> flex: 3 3 calc(15em + 20px);</div>
            <div></div>
          </div>
          <div class='container'>
            <div></div>
            <div [fxFlex]='calc3Cols' class='col3'> flex: 3 3 calc(15em + 20px);</div>
          </div>
        </div>
      </md-card-content>
      <md-card-footer class='bottomPad'>
        <div class='hint'>Note: each cell has 'margin-left:10px' so the 'calc( )' expressions must
          account for those.
        </div>
      </md-card-footer>
    </md-card>
  `
})
export class DemoGridColumnSpan {
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
}
