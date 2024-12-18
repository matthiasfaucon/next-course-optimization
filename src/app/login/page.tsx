
"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { login } from "../services/login";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        
    }, [email])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await login({ email, password });

        if (response.status !== 201) {
            Swal.fire({
                title: 'Veuillez vérifier vos informations',
                text: response.message,
                icon: 'error',
                timer: 2000,
                showCloseButton: false,
                showConfirmButton: false,
              })
        }

        if (response.status === 201) {
            Swal.fire({
                title: 'Compte créé avec succès',
                text: "Vous allez être redirigé",
                icon: 'success',
                timer: 2000,
                showCloseButton: false,
                showConfirmButton: false,
            }).then(() => {
                router.push('/success');
            })
        }
    }

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email}  onChange={(e) => onEmailChange(e)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => onPasswordChange(e)}/>
            <button type="submit">Connexion</button>
        </form>
    )
}