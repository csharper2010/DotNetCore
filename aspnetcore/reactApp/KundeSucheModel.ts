export enum KundeStatus {
    Aktiv,
    Inaktiv,
    Verstorben,
}

export interface KundeSucheView {
    Name: string;
    Vorname: string;
    Geburtsdatum: Date;
    Status: KundeStatus;
}