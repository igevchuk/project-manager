import * as React from 'react';

import * as templateState from '../../../../app/redux/state';
import { DocElement, IVisitor } from './abstract';

class Products {
  constructor(public name: string, public unitPrice: number) {}
}

interface IDiscountCode {
  code: string;
  percentage: number;
}
class ProductWithDiscountCodes extends Products {
  public discountCodes: IDiscountCode[];

  constructor(public name: string, public unitPrice: number) {
    super(name, unitPrice);
  }
}

// =============================

abstract class Component {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }
  public abstract Add(c: Component): void;
  public abstract Remove(c: Component): void;
  public abstract Display(depth: number): void;
}

class Composite extends Component {
  private children: Component[] = new Array();

  public constructor(name: string) {
    super(name);
  }

  public Add(component: Component): void {
    this.children.push(component);
  }

  public Remove(component: Component): void {
    this.children.pop();
  }

  public Display(depth: number): void {
    // Console.WriteLine(new String('-', depth) + name);
    console.log(`- ${depth}` + this.name);
    // Recursively display child nodes
    this.children.forEach(component => {
      component.Display(depth + 2);
    });
  }
}

// "Leaf"
class Leaf extends Component {
  public constructor(name: string) {
    super(name);
  }
  public Add(c: Component): void {
    console.log('Cannot add to a leaf');
  }
  public Remove(c: Component): void {
    console.log('Cannot remove from a leaf');
  }
  public Display(depth: number): void {
    // console.log(new String('-', depth) + name);
    console.log(`- ${depth}` + this.name);
  }
}

class DocController {
  public Maina(): void {
    // Create a tree structure
    const root = new Composite('root'); // Composite
    root.Add(new Leaf('Leaf A'));
    root.Add(new Leaf('Leaf B'));
    const comp = new Composite('Composite X'); // Composite
    comp.Add(new Leaf('Leaf XA'));
    comp.Add(new Leaf('Leaf XB'));
    root.Add(comp);
    root.Add(new Leaf('Leaf C'));

    // Add and remove a leaf
    const leaf = new Leaf('Leaf D'); // Leaf
    root.Add(leaf);
    root.Remove(leaf);

    // Recursively display tree
    root.Display(1);

    // Wait for user
    // Console.Read();
  }
}

export default DocController;
