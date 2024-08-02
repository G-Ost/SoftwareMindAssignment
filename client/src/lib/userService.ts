export const createUser = async (userData: {
  name: string;
  lastName?: string;
  continent?: string;
  birthDate?: Date;
}) => {
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
