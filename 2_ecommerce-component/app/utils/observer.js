export class Observer {
  constructor() {
    this._subscribers = [];
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(unsubscriber) {
    this._subscribers = this._subscribers.filter((subscriber) => subscriber !== unsubscriber);
  }

  notify(data) {
    this._subscribers.forEach((subscriber) => subscriber(data));
  }
}
