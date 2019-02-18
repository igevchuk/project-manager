import * as React from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

export class Test {
  public getHtml(): any {
    const aa = 'tesing  nngngn';
    return ReactHtmlParser('<h4>' + aa + '</h4>');
  }
}
