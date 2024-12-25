export class GoogleSignInData {
    idToken: string | null;
    email: string | null;
    name: string | null;
    photoUrl: string | null;

    constructor(idToken: string | null, email: string | null, name: string | null, photoUrl: string | null) {
        this.idToken = idToken;
        this.email = email;
        this.name = name;
        this.photoUrl = photoUrl;
    }

    static fromJson(json: any): GoogleSignInData {
        return new GoogleSignInData(
            json.idToken || null,
            json.user?.email || null,
            json.user?.name || null,
            json.user?.photo || null
        );
    }
}
