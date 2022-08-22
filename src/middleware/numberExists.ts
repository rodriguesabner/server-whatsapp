import { NextFunction, Request, Response } from 'express';
import { WhatsappProfile } from '@wppconnect-team/wppconnect';

const sanitizePhoneNumberTypeIndividual = (phoneList: string, type: string) : string[] => {
  const arr: string[] = [];
  const phones = phoneList.split(',');

  phones.forEach((phone: string) => {
    let phoneNumber = phone.replace(/[^\d]/g, '');

    if (type === 'individual') {
      if (!phoneNumber.includes('@c.us')) {
        phoneNumber = `${phoneNumber}@c.us`;
      }
    } else if (type === 'group') {
      if (!phoneNumber.includes('@g.us')) {
        phoneNumber = `${phoneNumber}@g.us`;
      }
    }

    arr.push(phoneNumber);
  });

  return arr;
};

async function numberExists(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const { whatsapp } = req;
  const { to, recipient_type } = req.body;

  try {
    if (!to) {
      throw new Error('to param is required');
    }

    if (!recipient_type) {
      throw new Error('recipient_type param is required');
    }

    const sanitizedPhones = sanitizePhoneNumberTypeIndividual(to, recipient_type);

    const tasksValidPhone: any = [];

    sanitizedPhones.forEach((phone: string) => {
      tasksValidPhone.push(
        whatsapp.checkNumberStatus(phone.trim())
          .catch((): any => null),
      );
    });

    const phonesValid = await Promise.all(tasksValidPhone);
    const phonesValidFiltered = phonesValid.filter(
      (phone: WhatsappProfile) => phone && phone.numberExists,
    );
    const serializedPhoneNumbers = phonesValidFiltered.map(
      (phone: WhatsappProfile) => phone.id._serialized,
    );

    req.body.to = serializedPhoneNumbers.join(',');
    return next();
  } catch (error) {
    return res.status(404).json({
      message: 'Invalid phone(s)',
    });
  }
}

export default numberExists;
