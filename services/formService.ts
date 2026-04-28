
interface FormSubmitData {
  [key: string]: any;
  _subject?: string;
  _template?: string;
  _captcha?: boolean;
  _next?: string;
}

const DEFAULT_EMAIL = 'trismart.tech@gmail.com';
const BACKUP_EMAIL = 'saurabhmotalkar2021@gmail.com';

export const submitForm = async (data: FormSubmitData, customTargets?: string[]) => {
  const targets = customTargets || [DEFAULT_EMAIL, BACKUP_EMAIL];
  
  const emailData = {
    ...data,
    _template: data._template || 'table',
    _captcha: data._captcha !== undefined ? data._captcha : false,
  };

  try {
    const results = await Promise.all(
      targets.map(target => 
        fetch(`https://formsubmit.co/ajax/${target}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailData)
        })
      )
    );

    const responses = await Promise.all(results.map(res => res.json()));
    
    // Check if at least one submission was successful
    const success = responses.some(res => res.success === 'true' || res.success === true);
    
    if (!success) {
      throw new Error('Failed to send message. Please try again later.');
    }

    return responses;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};
