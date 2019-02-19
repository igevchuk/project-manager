import * as React from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

export class Test {
  public getHtml(): any {
    const aa = '<span>aaaa</span>';
    const asd = '<h1>testing</h1>';
    const more = '<div>more testing</div>';
    const bb = '<span>bbbb</span>';
    const cc = ReactHtmlParser(aa + asd + more + bb);

    return cc;
  }
}
