import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {

        console.log('clicked the sign in')
        if (isLoading) { return }

        registerModal.onClose();
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log('starting request to sign up')
            await axios.post('/api/register', {
                email, username, name, password
            });

            toast.success('Account created');

            signIn('credentials', { email, password })
            registerModal.onClose();
        } catch (e) {
            console.log(e);
            toast.error('Something wrong')
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, username, name, password])



    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                disable={isLoading} />
            <Input
                placeholder="Name"
                onChange={e => setName(e.target.value)}
                value={name}
                disable={isLoading} />
            <Input
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
                value={username}
                disable={isLoading} />
            <Input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                disable={isLoading} />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                    onClick={onToggle}
                    className="text-white
                cursor-pointer
                hover:underline"
                > Sign in</span>
            </p>
        </div>
    )
    return (<div>
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    </div>);
};

export default RegisterModal;