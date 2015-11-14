declare module 'ava' {

  export interface Test {
    same<T>(a: T, b: T);
    is<T>(a: T, b: T);
    plan: (count: number) => void;
    end: () => void;
  }

  export default function test(title: string, fn: (t: Test) => void);
  export default function test(fn: (t: Test) => void);
}

declare module 'hubot-test-helper' {
  var x: any;
  export default x;
}
