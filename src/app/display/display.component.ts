import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import * as _ from 'lodash';
//import { start } from 'repl';


export class CalendarDate {
  mDate: any;
  selected?: boolean;
  today?: boolean;
  monthDay?: boolean;

}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
   today = moment();
   currentMonth = this.today.month()+1;
   currentYear = this.today.year();
   currentDays: any[];
   calendar:  Array<any> = [];;
   week : Array<any> = [];
   days : Array<any> = [];
   SelectedDay:CalendarDate = {
     mDate: this.today
   }
   
   public TodayClasses={

  }
  constructor() { }

  generateCalendar(): void {
    this.calendar.splice(0,31)
    console.log(this.today.month())
    const startDay = this.today.clone().startOf('month')
    console.log("start day: "+ startDay);
    const startOfMonth = startDay.startOf('week')
    console.log("start week: "+ startOfMonth)
   const endDay = this.today.clone().endOf('month')
    console.log("end day: "+ endDay);
    const endOfMonth = endDay.clone().endOf('week')
    console.log("end week: "+ endOfMonth);
    let date = startOfMonth.clone()
    let first :CalendarDate ;


    while (date.isBefore(endDay, 'day')) {
      this.calendar.push({
        days : Array<CalendarDate>(7).fill(first).map((data:CalendarDate) =>{
          let d = date.add(1,'day').clone()
          return {
            mDate:  d,
            selected: this.isSelected(d),
            today: this.isToday(d),
            monthDay: this.isMonthDay(d)
          }
        } 
        )
    })
    }

  }
  ngOnInit() {
    this.generateCalendar();
  }
  prevMonth(): void {
    this.today = moment(this.today).subtract(1, 'months');
    this.currentMonth = this.today.month()+1;
    this.currentYear = this.today.year();
    this.generateCalendar();

  }
  nextMonth(): void {
    this.today = moment(this.today).add(1, 'months');
    this.currentMonth = this.today.month()+1;
    this.currentYear = this.today.year();
    this.generateCalendar();
  }
  getDays(){
   // let day = new Date(this.currentYear, this.currentMonth).getDay()+1;
    
  
    for(let i = 0; i< 7; i++){
      let days=  new Date(this.currentYear, this.currentMonth,0).getDay()+i;
     // this.currentDays.push(days);
      //console.log(days)
    }
  }
  
  isToday(date:any ): boolean{
    console.log(date)
    return date.isSame(this.today, 'day');
}
  isSelected(date:any):boolean{
    if(this.SelectedDay.mDate == date){
      return true
    }else{
      return false
    }
  }

isMonthDay(date: any): boolean{
  let endOfMonth = this.today.endOf('month')
  let indexDays = this.today.startOf('month')
  while(indexDays.isBefore(endOfMonth)){
   if(date.isSame(indexDays)){
    return true
    }else{
    indexDays.add(1,'day')
      }
      console.log(date)
  }
  return false
}
setSelected(selected: any){
  this.SelectedDay.mDate = selected.mDate;
  console.log('selecionado')
  console.log(this.SelectedDay.mDate)
  this.generateCalendar()
}
}
