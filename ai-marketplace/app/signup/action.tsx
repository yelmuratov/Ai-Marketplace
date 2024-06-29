'use server';

export async function signUp(formData: any) {
    const response = await fetch('https://marketplace.araltech.tech/auth/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    }