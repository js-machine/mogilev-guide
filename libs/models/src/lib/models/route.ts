import * as Moment from 'moment';

export interface Route {
    id: string;
    title: string;
    duration: Moment.Duration;
    distance: number;
    rating: number;
    reviews: number;
    places: number;
    image?: string;
}
