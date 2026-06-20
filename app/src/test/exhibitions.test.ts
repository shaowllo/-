import { describe, it, expect } from 'vitest'
import { exhibitions, getExhibitionBySlug } from '../lib/exhibitions'

describe('exhibitions', () => {
  it('should have at least 6 exhibitions', () => {
    expect(exhibitions.length).toBeGreaterThanOrEqual(6)
  })

  it('should find existing exhibition by slug', () => {
    const ex = getExhibitionBySlug('jiuwei-hu')
    expect(ex).toBeDefined()
    expect(ex?.title).toBe('九尾狐')
  })

  it('should return undefined for non-existent slug', () => {
    const ex = getExhibitionBySlug('non-existent')
    expect(ex).toBeNull()
  })

  it('every exhibition should have required fields', () => {
    for (const ex of exhibitions) {
      expect(ex.slug).toBeTruthy()
      expect(ex.title).toBeTruthy()
      expect(ex.image).toBeTruthy()
      expect(ex.sections.length).toBeGreaterThan(0)
    }
  })
})
