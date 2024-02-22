import { toast } from "sonner";

export function makeToast(response) {
    if (response.status !== 200) {
        const toastId = toast.error(response.message);
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 2000);
        return false;
    }
    else {
        const toastId = toast.success(response.message);
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 2000);
        return true;
    }
}