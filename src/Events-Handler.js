class EventsHandler {
  constructor() {
    this._queue = []
    this._isTicking = false
    this.create()
  }

  create() {
    document.addEventListener('click', this._documentClickHandler)
    window.addEventListener('resize', this._resizeHandler)
  }

  destroy() {
    this._queue = []
    document.removeEventListener('click', this._documentClickHandler)
    window.removeEventListener('resize', this._resizeHandler)
  }

  add(component) {
    this._queue.push(component)
  }

  remove(component) {
    const pos = this._queue.indexOf(component)
    if (pos > -1) {
      this._queue.splice(pos, 1)
    }    
  }

  _documentClickHandler = (e) => {
    for (let i = this._queue.length; i--;) {
      this._queue[i]._toggleOpen(e)
    }
  }

  _resizeHandler = () => {
    if (!this._isTicking) {
      requestAnimationFrame(this._setWidth)
    }
    this._isTicking = true
  }

  _setWidth = () => {
    for (let i = this._queue.length; i--;) {
      this._queue[i]._setWidth()
    }
    this._isTicking = false
  }
}

export default EventsHandler