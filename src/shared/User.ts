import { Entity, Field } from "remult";

@Entity("user", { allowApiCrud: true })
export class User {
    @Field()
    userId: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    imageUrl: string;

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

