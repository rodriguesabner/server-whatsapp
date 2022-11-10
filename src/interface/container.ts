import { AwilixContainer } from 'awilix';
import { Whatsapp } from '@wppconnect-team/wppconnect';

export type ConfigProps = {
    hostName: string;
    web: {
        port: string;
    },
    // api: {},
    webhook: {
        active: boolean;
        url: string;
    },
}

enum StatusClientProps {
    CONNECTED = 'CONNECTED',
    QRCODE = 'QRCODE',
    DISCONNECTED = 'DISCONNECTED',
}

export type ClientProps = {
    instance: Whatsapp;
    session: any;
    status: StatusClientProps;
}

export interface Container extends AwilixContainer {
    sessions: [];
    config: ConfigProps
}

export interface ScopeProps extends AwilixContainer {
    whatsapp: Whatsapp
}

export interface ContainerMessage {
    scope: ScopeProps;
}
