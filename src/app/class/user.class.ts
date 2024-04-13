export class User {
    email: string;
    userId: string;

    constructor(obj: any) {
        this.email = obj && obj.email ? obj.email : '';
        this.userId = obj && obj.userId ? obj.userId : '';
    }

    toJson() {
        return {
            email: this.email,
            userId: this.userId,
        }
    }
}