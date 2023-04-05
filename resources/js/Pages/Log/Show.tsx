import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

type Props = {
    log: any;
};

function Show(props: Props) {
    const { data: log } = props.log;

    return (
        <>
            <Head title="Logs" />

            {JSON.stringify(log)}
        </>
    );
}

Show.layout = (page: ReactNode) => <AppLayout children={page} />;

export default Show;
