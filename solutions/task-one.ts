console.log('Task One');

interface Array<T> {
  customMap<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
  customFilter(callbackfn: (value: T, index: number, array: T[]) => boolean): T[];
  customReduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
}

interface IList {
  name: string;
  age: number;
}

Array.prototype.customMap = function<T, U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    let result: U[] = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callbackfn(this[i], i, this));
    }
    return result;
};

Array.prototype.customFilter = function<T>(callbackfn: (value: T, index: number, array: T[]) => boolean): T[] {
    let result: T[] = [];
    for (let i = 0; i < this.length; i++) {
        if (callbackfn(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

Array.prototype.customReduce = function<T, U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
    let acc: U = initialValue;
    for (let i = 0; i < this.length; i++) {
        acc = callbackfn(acc, this[i], i, this);
    }
    return acc;
}

const listOfPeople: IList[] = [
  { name: "AO", age: 50},
  { name: "ZO", age: 40},
  { name: "SE", age: 30}
];

const main = () => {
  return listOfPeople.customMap<IList>((value) => {
    return {
      ...value,
      title: 'Engineer'
    };
  });
};

const mainTwo = () => {
  return listOfPeople.customFilter((value) => {
    return value.age === 100;
  });
};

const mainThree = () => {
    return listOfPeople.customReduce((acc, currentValue) => {
        return acc + currentValue.age;
    }, 0);
}

const resultOne = main();
console.log(resultOne);

const resultTwo = mainTwo();
console.log(resultTwo);

const resultThree = mainThree();
console.log(resultThree);

