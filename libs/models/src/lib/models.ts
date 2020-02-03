export interface Interest {
  id: string;
  label: string;
  description: string;
  size: string;
}

export interface User {
  id: string
  name: string
}

export interface SightReview {
  userId: string
  sightId: string
  date: Date
  rating: number
  message: string
}

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
  isFavourite: boolean
}
