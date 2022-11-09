enum ETypeMessage {
    text= 'text',
    document='document',
    audio='audio',
    image='image',
    video='video',
    sticker='sticker',
    reaction='reaction',
    interactive='interactive',
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

interface IMessageReactionProps {
    message_id: string;
    emoji: string | boolean;
}

type MessageButtonsTypes = {
    id: string;
    text: string;
} | {
    phoneNumber: string;
    text: string;
} | {
    url: string;
    text: string;
};

interface IMessageInteractiveProps {
    body: string;
    useTemplateButtons: boolean | null
    title?: string
    footer?: string
    buttons?: Array<MessageButtonsTypes>,
}

interface MessageProps {
    to: string;
    type: ETypeMessage;
    recipient_type: ETypeRecipient
    text?: IMessageTextProps;
    image?: IMessageImageProps,
    location?: IMessageLocationProps,
    reaction?: IMessageReactionProps,
    interactive?: IMessageInteractiveProps,
}

export {
  // eslint-disable-next-line import/prefer-default-export
  MessageProps,
};
