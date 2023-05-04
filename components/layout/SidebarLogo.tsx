import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
const SidebarLogo = () => {
    const router = useRouter();
    return (
        <div onClick={() => router.push('/')}
            className="relative
            hidden
            lg:flex
            gap-4
            p-4
            rounded-full
            hover:bg-slate-50
            hover:bg-opacity-10
            cursor-pointer">
            <BsTwitter size={28} color="white" />
        </div>
    )
}

export default SidebarLogo;