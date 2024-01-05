import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(allProperties: any[], searchKey: string): any[] {
    const result: any = [];
    if (!allProperties || searchKey.trim() === '') {
      return allProperties;
    } else {
      allProperties.forEach((item: any) => {
        const category = item.category
          .trim()
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase());

        const district =
          item.district &&
          item.district
            .trim()
            .toLowerCase()
            .includes(searchKey.trim().toLowerCase());

        if (category || district) {
          result.push(item);
        }
      });
    }
    return result;
  }
}
