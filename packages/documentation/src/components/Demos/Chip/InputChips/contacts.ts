import people from "constants/people";
import createIdGenerator from "utils/createIdGenerator";

const guid = createIdGenerator("input-chips-contact");

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const contacts: Contact[] = Array.from(people, (name, i) => ({
  id: guid(),
  name,
  email: `${name.toLowerCase().replace(/\s|-/g, "")}@email.com`,
  avatar: `https://i.pravatar.cc/40?img=${i}`,
}));

export default contacts;
