'use client'

import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import styles from './auth.module.scss'

export default function AuthPage() {
    const queryClient = new QueryClient()

    const mutation = useMutation({
        mutationFn: ({ email, password }) =>
            axios.post('http://localhost:9090/auth/loginIns', { email, password }),
        onSuccess: data => {
            localStorage.setItem('jwt', data.data.jwt)
        },
    })

    const onSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')

        mutation.mutate({ email, password })
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}