import { Entity, Field, UuidField, Validators } from "remult";

@Entity("user", { allowApiCrud: true })
export class User {
    @UuidField()
    userId: string = ''
    @Field({
        validate: Validators.required
    })
    firstName: string = '';
    @Field({
        validate: Validators.required
    })
    lastName: string = '';
    @Field()
    imageUrl: string = '';

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

