// export { default as toNumber } from './';
import * as moment from 'moment';

const utils = {
  formatDate: (input, format) => {
    const m = moment(input);
    
    if(m.isValid()) {
      return m.format(format);
    }

    return input;
  }
}

export default utils;