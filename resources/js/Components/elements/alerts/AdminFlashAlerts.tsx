import DangerAlert from "./DangerAlert";
import { useEffect, useState } from "react";
import AdminSuccessAlert from "./AdminSuccessAlert";

export default function FlashAlerts({ flash }: { flash: any }) {
    // Use local state to manage flash messages
    const [currentFlash, setCurrentFlash] = useState(flash);

    useEffect(() => {
        if (flash) {
            setCurrentFlash(flash);

            const timer = setTimeout(() => {
                setCurrentFlash(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!currentFlash) return null;

    return (
        <>
            {currentFlash?.success && (
                <AdminSuccessAlert
                    title={currentFlash.message}
                    message={currentFlash?.success}
                />
            )}

            {currentFlash?.error && (
                <DangerAlert
                    title={currentFlash.message}
                    message={currentFlash?.error}
                />
            )}
        </>
    );
}
