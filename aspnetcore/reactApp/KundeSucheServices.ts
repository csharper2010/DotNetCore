import { QueryFeld } from './QueryFeld';

export interface KundeQueryFeldRepository {
    getQueryFelder() : Promise<Array<QueryFeld>>;
}