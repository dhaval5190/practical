import { Component } from '@angular/core';

@Component({
  selector: 'app-head-tail',
  templateUrl: './head-tail.component.html',
  styleUrls: ['./head-tail.component.css'],
})
export class HeadTailComponent {
  dropDownValue: string = 'select value';
  mapping: any = [];
  onAddValue() {
    if (this.dropDownValue != 'select value') {
      if (this.mapping.length == 0) {
        this.mapping[0] = [this.dropDownValue];
      } else {
        let temparray = this.mapping[this.mapping.length - 1];
        if (temparray[0] == this.dropDownValue)
          temparray.push(this.dropDownValue);
        else {
          temparray = [];
          this.mapping[this.mapping.length] = [];
          temparray.push(this.dropDownValue);
        }
        this.mapping[this.mapping.length - 1] = temparray;
        console.log(this.mapping[this.mapping.length - 1]);
      }
      this.dropDownValue = 'select value';
    }
  }
  onClear() {
    this.mapping = [];
  }
  saveChanges(value: string) {
    this.dropDownValue = value;
    console.log('the selected value is ' + value);
  }
}
