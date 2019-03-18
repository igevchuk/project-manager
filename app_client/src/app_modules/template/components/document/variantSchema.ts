import * as React from 'react';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

import * as variantState from './state';
import * as templateState from '../../../../app/redux/state';

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type column = {
  id: string;
  title: string;
  taskIds: string[];
};

export interface ITaskType {
  tasks: segmentSource[];
  columns: column[];
  columnOrder: string[];
}

export class VariantSchema implements ITaskType {
  public tasks: segmentSource[] = [];
  public columnOrder: string[] = [];
  public columns: column[] = [];
  private defaultIds: string[] = [];
  private varientsIds: string[] = [];

  private variants: segmentSource[];

  public constructor(variants: segmentSource[]) {
    this.variants = variants;
  }

  public initVariants(): void {
    this.variants.map(variant => {
      if (!variant) {
        return;
      }

      this.tasks.push(variant);

      if (variant.segment.variantIsDefault) {
        this.defaultIds.push(variant.segment.id);
      } else {
        this.varientsIds.push(variant.segment.id);
      }
    });

    // Column defination
    const defaultColumn = {
      id: 'column_1',
      title: 'Fallback/Default Language ',
      taskIds: this.defaultIds
    };
    this.columns.push(defaultColumn);

    const variantColumn = {
      id: 'column_2',
      title: 'Variant',
      taskIds: this.varientsIds
    };
    this.columns.push(variantColumn);

    // columnOrder
    this.columnOrder = ['column_1', 'column_2'];
  }
}
