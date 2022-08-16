enum ETypeMessage {
    text= 'text',
    document='document',
    audio='audio',
    image='image',
    video='video',
    sticker='sticker',
}

enum ETypeRecipient {
    individual = 'individual',
    group = 'group',
}

interface IMessageTextProps {
    body: string;
    preview_url?: boolean;
}

interface IMessageImageProps {
    path: string;
    caption: string;
    filename?: string;
    isViewOnce?: boolean;
    quotedMessageId?: string;
}

interface IMessageLocationProps {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
}

interface MessageProps {
    to: string;
    type: ETypeMessage;
    recipient_type: ETypeRecipient
    text?: IMessageTextProps;
    image?: IMessageImageProps,
    location?: IMessageLocationProps
}

export {
  MessageProps,
};
