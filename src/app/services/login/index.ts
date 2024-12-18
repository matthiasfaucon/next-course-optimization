import { z } from "zod";


interface User {
    email: string;
    password: string;
}

const users: User[] = []
export async function login(user: User) {
    const { email, password } = user;
    console.log(email, password);
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(8);

    if (!emailSchema.safeParse(email).success) {
        return { message: "Adresse email invalide", status: 400 };
    }
    if (!passwordSchema.safeParse(password).success) {
        return { message: "Mot de passe invalide, il doit contenir au moins 8 caractères", status: 400 };
    }
    if (email === password) {
        return { message: "Le mot de passe doit être différent de l'adresse email", status: 400 };
    }
    if (users.find(user => user.email === email)) {
        return { message: "L'utilisateur existe déjà", status: 400 };
    }

    users.push({ email, password });
    
    return { message: "Utilisateur créé avec succès", status: 201 };
}