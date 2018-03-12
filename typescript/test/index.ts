import LZW from '../src'

describe('LZW COMPRESSION', (): void => {
  it('initialise', (): void => {
    const source = 'ABABBABCABABBA'
    const lzw = new LZW()
    const result = lzw.compress(source)

    console.log(result)
  })
})
