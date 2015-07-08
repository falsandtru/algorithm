/// <reference path="../../define.ts"/>

module AOJ {
  interface Queue<T> extends Array<T> {
    head: number;
    tail: number;
  }
  export function ALDS1_3_C() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf8') + '',
          offset = 1,
          meta = input.split('\n', offset)[0],
          rowcnt = +meta.split(' ')[0],
          colcnt = 2,
          data = input.split('\n', offset + rowcnt + 1).slice(offset, offset + rowcnt).map(v => v.split(' ', colcnt)),
          sentinelVal = NaN,
          dlist = doublyLinkedList();

    run(data, dlist);

    console.log(collect(dlist).join(' '));

    function run(cmds: typeof data, list: typeof dlist) {
      for (let i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        switch (cmd[0]) {
          case 'insert':
            ins(+cmd[1], list);
            break;
          case 'delete':
            del(+cmd[1], list);
            break;
          case 'deleteFirst':
            deleteFirst(list);
            break;
          case 'deleteLast':
            deleteLast(list);
            break;
        }
      }
    }
    function doublyLinkedList(val: number = sentinelVal) {
      var self = {
        sentinel: null,
        first: null,
        prev: null,
        next: null,
        last: null,
        insert: ins,
        delete: del,
        deleteFirst,
        deleteLast,
        collect,
        val
      };
      self.sentinel = self;
      self.first = first;
      self.prev = self;
      self.next = self;
      self.last = last;
      return self;

    }
    function isSentinel(item) {
      return isNaN(item.val);
    }
    function first() {
      return this.sentinel.next;
    }
    function last() {
      return this.sentinel.prev;
    }
    function ins(x: number, list) {
      const first = list.first(),
            sentinel = first.prev,
            item = doublyLinkedList(x);
      sentinel.next = item;
      first.prev = item;
      item.sentinel = sentinel;
      item.prev = sentinel;
      item.next = first;
      return item;
    }
    function deleteItem(item) {
      if (isSentinel(item)) { return false; }
      const prev = item.prev,
            next = item.next;
      prev.next = next;
      next.prev = prev;
      return true;
    }
    function search(x: number, list) {
      var item = list.first();
      while (item.val !== x && !isSentinel(item)) {
        item = item.next;
      }
      return item;
    }
    function del(x: number, list) {
      const target = search(x, list);
      return deleteItem(target);
    }
    function deleteFirst(list) {
      return deleteItem(list.first());
    }
    function deleteLast(list) {
      return deleteItem(list.last());
    }
    function collect(list) {
      var item = list.first();
      const result = [];
      while (!isSentinel(item)) {
        result.push(item.val);
        item = item.next;
      }
      return result;
    }
  }
}
