import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
const LoginModal = () => {
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registerModal = useRegisterModal();

    const onToggle = useCallback(() => {

        console.log('clicked the sign in')
        if (isLoading) { return }

        registerModal.onOpen();
        loginModal.onClose()
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', { email, password });

            loginModal.onClose();
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
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
            <p>First time here?
                <span
                    onClick={onToggle}
                    className="text-white
                cursor-pointer
                hover:underline"
                > Sign up</span>
            </p>
        </div>
    )

    return (<div>
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    </div>);
};

export default LoginModal;