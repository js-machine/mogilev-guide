import { User } from './user'

export interface Sight {
  id: string
  name: string
  address: string
  accessTime: {
    from: number
    to: number
  }
  history: string
  photos: string[]
  photosTotalCount: number
  background: string
  reviews: SightReview[]
  reviewsTotalCount: number
  rating: number[]
}

export interface SightReview {
  id: string
  user: User
  date: number
  rating: number
  message: string
}
