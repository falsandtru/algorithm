/// <reference path="../../define.ts"/>

module AOJ {
  interface Queue<T> extends Array<T> {
    head: number;
    tail: number;
  }
  export function ALDS1_3_B() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
          offset = 1,
          meta = input.split('\n', offset)[0],
          rowcnt = +meta.split(' ')[0],
          colcnt = 2,
          q = +meta.split(' ')[1],
          data = input.split('\n', offset + rowcnt + 1).slice(offset, offset + rowcnt).map(v => v.split(' ', colcnt)),
          queue = <Queue<[string, string]>>data;

    queue.head = 0;
    queue.tail = queue.length;
    queue.push(undefined);

    run(queue);

    function run(schedule: Queue<[string, string]>) {
      var time = 0;
      while (!isEmpty(schedule)) {
        let task = dequeue(schedule);
        task = proc(task);
        time += q + Math.min(+task[1], 0);
        if (+task[1] > 0) {
          enqueue(schedule, task);
        }
        else {
          console.log(task[0] + ' ' + time);
        }
      }
    }
    function proc(task: [string, string]): typeof task {
      const name = task[0],
            time = task[1];
      return [name, +time - q + ''];
    }
    function enqueue<T>(queue: Queue<T>, data: T): Queue<T> {
      if (isFull(queue)) { throw 1; }
      queue[queue.tail] = data;
      queue.tail = queue.tail + 1 === queue.length ? 0 : queue.tail + 1;
      return queue;
    }
    function dequeue<T>(queue: Queue<T>): T {
      if (isEmpty(queue)) { throw 1; }
      const head = queue[queue.head];
      queue.head = queue.head + 1 === queue.length ? 0 : queue.head + 1;
      return head;
    }
    function isEmpty(queue: Queue<any>): boolean {
      return queue.head === queue.tail;
    }
    function isFull(queue: Queue<any>): boolean {
      const len = queue.tail > queue.head ? queue.tail - queue.head
                                          : queue.length - queue.tail + queue.head;
      return len > 1e6;
    }
  }
}
