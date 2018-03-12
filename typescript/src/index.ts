class Index {
  public index: number

  public constructor () {
    this.reset()
  }

  public increase (callback: (index: number) => void): void {
    this.index += 1

    callback(this.index)
  }

  public reset (): void {
    this.index = 0
  }
}

class LZW {
  private dictionary = new Map<string, number>()
  private index = new Index()
  private result: number[] = []

  public constructor () {
    this.reset()
  }

  public compress (source: string): number[] {
    return this.process(source.split(''))
  }

  public process (source: string[]): number[] {
    this.init(source)

    let key = source[0]

    source.slice(1).forEach((char): void => {
      key += char

      if (!this.dictionary.has(key)) {
        this.addKey(key)

        key = char
      }
    })

    const { result } = this

    this.reset()

    return result
  }

  private init (source: string[]): void {
    source.forEach((key) => {
      if (!this.dictionary.has(key)) {
        this.index.increase((index): void => {
          this.dictionary.set(key, index)
        })
      }
    })
  }

  private addKey (key: string): void {
    this.index.increase((index): void => {
      this.dictionary.set(key, index)

      const token = key.slice(0, -1)
      const code = this.dictionary.get(token)

      this.result.push(code)
    })
  }

  private reset (): void {
    this.result = []
    this.index.reset()
    this.dictionary.clear()
  }
}

export default LZW
