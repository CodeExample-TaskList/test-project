/**
 * implements Queue analogue java.util.Queue
 * backed by an array ( queue.data )
 *
 */
class Queue {
    constructor() {
        this.data = []
        this.push = item => this.data.push(item)
        this.pop = () => this.data.shift()
        this.clear = () => (this.data = [])
    }
}

export default Queue
