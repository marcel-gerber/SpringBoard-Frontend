import {Alert} from "flowbite-react";
import {HiInformationCircle} from "react-icons/hi";

interface AlertProps {
    message: string;
    onClose: () => void;
}

export function AlertFailure({ message, onClose }: AlertProps) {
    return (
        <>
            <div className="justify-center fixed z-50 max-w-sm mx-auto left-0 right-0">
                <Alert
                    color="failure"
                    onDismiss={onClose}
                    icon={HiInformationCircle}
                >
                    <span className="font-medium">{message}</span>
                </Alert>
            </div>
        </>
    );
}