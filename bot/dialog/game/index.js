const {
  getImages
} = require('./data')

class FireGame {

  constructor(memory) {
    this.memory = memory
    this.images = getImages()
  }

  start() {
    const firstImage = 0
    this.memory = {
      questions: [firstImage],
      responses: [],
      playing: true
    }
    return {
      name: 'start_and_question',
      payload: this.images[firstImage]
    }
  }

  saveAnswer(key, thereIsFire) {
    const indexOfImageOfFire = this.memory.questions[this.memory.questions.length - 1]
    this.memory[key] = {
      index: indexOfImageOfFire,
      fire: thereIsFire
    }
  }

  getQuestionByIndex(index) {
    this.memory.questions.push(index)
    return {
      name: 'question',
      payload: this.images[index]
    }
  }

  finished(middleImageIndex) {
    return Math.abs(this.memory.right.index - middleImageIndex) <= 1 &&
      Math.abs(middleImageIndex - this.memory.left.index) <= 1
  }

  /*
    Uses the bisection algorithim to discover the root of the fire.
  */
  answer(thereIsFire) {
    if (!this.memory.playing)
      return this.start()

    if (!this.memory.left) {
      this.saveAnswer('left', thereIsFire)
      const lastImageIndex = this.images.length - 1
      return this.getQuestionByIndex(lastImageIndex)
    } else if (!this.memory.right) {
      this.saveAnswer('right', thereIsFire)
      const middleImageIndex = Math.round(this.images.length / 2)
      return this.getQuestionByIndex(middleImageIndex)
    } else {
      // We evaluate c
      this.saveAnswer('center', thereIsFire)
      // if c evaluation is distinct to a, c gets converted in b and run again
      if (this.memory.center.fire ^ this.memory.left.fire)
        this.memory.right = this.memory.center
      // if c evaluation is distinct to b, c gets converted in a and run again
      else if (this.memory.center.fire ^ this.memory.right.fire)
        this.memory.left = this.memory.center
      else {
        this.memory.playing = false
        return {
          name: 'error_with_game'
        }
      }
      // Afterwards, until finish, we find the middle point c corresponding to a+b/2 and evaluate it
      const middleImageIndex = Math.floor(this.memory.left.index + (this.memory.right.index - this.memory.left.index) / 2)
      if (this.finished(middleImageIndex)) {
        return {
          name: 'finish',
          arg: this.images[middleImageIndex].date.split('T')[0],
        }
      }
      return this.getQuestionByIndex(middleImageIndex)

    }
  }

  save() {
    return this.memory
  }
}

module.exports = FireGame