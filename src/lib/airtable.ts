import Airtable from 'airtable';

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

export const airtableBase = new Airtable({ apiKey }).base(baseId);

export type Person = {
  id: string;
  name: string;
  code?: string;
  avatar?: string;
};

export type Gift = {
  id: string;
  personId: string;
  title: string;
  giftedBy: string | null;
};

export async function authenticatePerson(firstName: string, code: string): Promise<Person | null> {
  try {
    const records = await airtableBase('People')
      .select({
        filterByFormula: `AND({Name} = '${firstName}', {Code} = '${code}')`
      })
      .firstPage();

    if (records.length > 0) {
      const record = records[0];
      return {
        id: record.id,
        name: record.get('Name') as string,
        code: record.get('Code') as string,
        avatar: record.get('Avatar') as string | undefined
      };
    }

    return null;
  } catch (error) {
    console.error('Error authenticating person:', error);
    return null;
  }
}
