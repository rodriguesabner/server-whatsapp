import { Request, Response, NextFunction } from 'express';
import { WhatsappProfile } from '@wppconnect-team/wppconnect';

const sanitizePhoneNumber = (phoneList: [string]) => {
  const phones = phoneList;
  phones.forEach((phone: string) => {
    let phoneNumber = phone.replace(/[^\d]/g, '');

    if (!phoneNumber.includes('@c.us')) {
      phoneNumber = `${phoneNumber}@c.us`;
    }

    return phoneNumber;
  });
};

async function numberExists(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const { whatsapp } = req;

  try {
    if (!req.body.to) {
      throw new Error('Phone is required');
    }

    const phones = req.body.to.split(',');
    const tasksValidPhone: any = [];

    phones.forEach((phone: string) => {
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
