import SuccessAlert from "./SuccessAlert";
import { PageProps } from "@/types";
import DangerAlert from "./DangerAlert";
import { useEffect, useState } from "react";

export default function FlashAlerts({ flash }: { flash: any }) {
    // Use local state to manage flash messages
    const [currentFlash, setCurrentFlash] = useState(flash);

    useEffect(() => {
        if (flash) {
            // Update the local state whenever new flash messages arrive
            setCurrentFlash(flash);

            // Automatically clear the message after 3 seconds
            const timer = setTimeout(() => {
                setCurrentFlash(null);
            }, 5000);

            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [flash]);

    if (!currentFlash) return null; // Don't render if there are no messages

    return (
        <>
            {currentFlash?.success && (
                <SuccessAlert
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
