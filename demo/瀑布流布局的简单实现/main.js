const WaterFall = (function () {
  return class WaterFall {
    constructor(options) {
      this.gap = options.gap
      this.columns = options.columns
      this.el = options.el
      this.init()
    }

    init() {
      this.elWidth = this.el.offsetWidth
      this.items = this.el.children
      this.setItemWidth()
      this.render()
    }

    setItemWidth() {
      const itemWidth = (this.itemWidth =
        this.elWidth / this.columns - 2 * this.gap)

      Array.from(this.items).forEach((item) => {
        item.style.width = itemWidth + 'px'
        item.style.position = 'absolute'
      })
    }

    render() {
      const itemsHeigth = []
      Array.from(this.items).forEach((item, index) => {
        if (index < this.columns) {
          item.style.top = '0'
          item.style.left = (this.itemWidth + this.gap * 2) * index + 'px'
          itemsHeigth.push(item.offsetHeight)
        } else {
          const minItemHeight = Math.min(...itemsHeigth)
          const minItemIndex = itemsHeigth.indexOf(minItemHeight)
          item.style.top = minItemHeight + this.gap * 2 + 'px'
          item.style.left =
            (this.itemWidth + this.gap * 2) * minItemIndex + 'px'
          itemsHeigth[minItemIndex] =
            minItemHeight + this.gap * 2 + item.offsetHeight
        }
      })
    }
  }
})()
