import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MineCellComponent } from './mine-cell/mine-cell.component';
import { MineBoardComponent } from './mine-board/mine-board.component';
import { MineCtrlComponent } from './mine-ctrl/mine-ctrl.component';
import { MineResultComponent } from './mine-result/mine-result.component';
import { RankListComponent } from './rank-list/rank-list.component';
import { IndexPipe } from './pipes/index.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MineBoardComponent,
    MineCellComponent,
    MineBoardComponent,
    MineCtrlComponent,
    MineResultComponent,
    RankListComponent,
    IndexPipe,
    HeaderComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
