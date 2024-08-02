export interface User {
  name: string;
  lastName?: string;
  birthDate?: string;
  continent: string;
  id: number;
}

interface NewUser {
  name: string;
  lastName?: string;
  continent?: string;
  birthDate?: Date;
}

export const createUser = async (userData: NewUser) => {
  const formattedBirthDate = userData.birthDate?.toISOString();
  const body = { ...userData, birthDate: formattedBirthDate };

  const response = await fetch("/api/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
};
