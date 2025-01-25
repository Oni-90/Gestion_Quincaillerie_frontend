export class Client {
    id!: number;
    firstname: string;
    lastname: string;
    passwword: string;
    phone: string;
    addresse: string;

    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.passwword = "";
        this.phone = "";
        this.addresse = "";
    }
}
