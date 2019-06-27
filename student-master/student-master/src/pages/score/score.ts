import {Component} from '@angular/core';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})

export class ScorePage {
  qscores: any;

  constructor(public scoreService: RedditData, public globalStorage: GlobalStorage) {
    this.qscores = [];
    globalStorage.getStorage('userId').then(res => {
      scoreService.getScore(res).subscribe(result => {
        this.qscores = result.data;
        // console.log('score page ' + result.questions[0].score);
      })
    });
  }
}
