export class User{
    private static user:User = new User();

    id: number;
    name: string;
    email: string;
    password: string;
    loggedIn: boolean;
    api_token: string;


    public static getUser():User{
      return this.user;
    }
    public static setUser(newUser:User):void{
      this.user = newUser;
    }
}
