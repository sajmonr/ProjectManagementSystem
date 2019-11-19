import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'weekrange'
})
export class WeekRangePipe implements PipeTransform{

  transform(date: Date): any {
    if(!date)
      return 'Invalid date';

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstDay = new Date(date.setDate(first));
    const lastDay = new Date(date.setDate(last));

    return firstDay.toLocaleDateString('en-US', options) + ' - ' + lastDay.toLocaleDateString('en-US', options);
  }

}
