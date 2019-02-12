import * as templateState from '../../app/redux/state';

type ss = {
  blocks: templateState.block[];
  textSegments: templateState.textSegment[];
  variables: templateState.variable[];
  runs: templateState.run[];
  history: templateState.history;
};

class Controller {
  constructor(public blocks: templateState.block[]) {
    this.blocks = blocks;
  }

  public getBlocks = () => {
    console.log(this.blocks);
  };
}

export default Controller;
