import people from "constants/people";

const mod = (x: number): number => Math.floor(x % 9);

interface Contact {
  name: string;
  phone: string;
}

// you can ignore this as this is just a bad way of making fake phone numbers
const contacts: readonly Contact[] = people.map((person, i) => {
  const [firstName, lastName] = person.split(" ");
  const l1 = firstName.length;
  const l2 = lastName.length;

  const areaCode = `(${mod((l1 + l2) / 4)}${i % 5}${i % 8})`;
  const prefix = `${i % 3}${mod(l1)}${mod(l2)}`;
  const suffix = `${mod(l1 / 2)}${mod(l2 / 4)}${mod(l1 + l2 / 7)}${mod(
    l1 / 2 + l2 / 4
  )}`;
  const phone = `${areaCode} - ${prefix}-${suffix}`;
  return {
    name: person,
    phone,
  };
});

export default contacts;
