export class Observer {
    
  private _value: any;
  private _observers: Array<any> = [];

  constructor (
    private _object: Object | any,
    private _property: string
  ) {
    const _this = this;
    this._value = _object[_property];

    Object.defineProperty(_object, _property, {
      set: (val) => {
        _this._value = val;
        for(let index = 0; index < _this._observers.length; index++) {
          _this._observers[index](val);
        }
      },
      get: () => {
        return _this._value;
      }
    });
  }

  /**
   * Callback function that will be fire when the attribute is updated.
   * 
   * @param notifyCallback Function
   */
  public observe (notifyCallback: any): void {
    this._observers.push(notifyCallback);
  }
}