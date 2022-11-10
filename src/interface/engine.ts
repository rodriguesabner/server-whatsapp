interface SessionsProps {
    [key: string]: any[],
    session: any,
    status: any,
}

interface CreateSessionProps {
    session: string;
    deviceName: string;
    poweredBy?: string;
}

export {
  SessionsProps,
  CreateSessionProps,
};
