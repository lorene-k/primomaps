import { describe, it, expect } from 'vitest'
import { getColor } from '../src/components/Map'

describe('getColor', () => {
    it('returns dark red for high prices', () => {
        expect(getColor(13000)).toBe('#800026')
    })

    it('returns grey for undefined', () => {
        expect(getColor(undefined)).toBe('#cccccc')
    })
})