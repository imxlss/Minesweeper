import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MineCellComponent } from './mine-cell/mine-cell.component';
import { MineBoardComponent } from './mine-board/mine-board.component';
import { MineCtrlComponent } from './mine-ctrl/mine-ctrl.component';
import { MineResultComponent } from './mine-result/mine-result.component';

@NgModule({
  declarations: [
    AppComponent,
    MineBoardComponent,
    MineCellComponent,
    MineBoardComponent,
    MineCtrlComponent,
    MineResultComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
