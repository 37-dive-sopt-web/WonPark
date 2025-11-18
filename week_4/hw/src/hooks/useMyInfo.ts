import { useEffect, useState } from "react";
import { api, type User } from "../api/client";
import { useAuth } from "../context/AuthContext";

interface UseMyInfoReturn {
  user: User | null;
  name: string;
  email: string;
  age: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setAge: (v: string) => void;
  hasChanges: boolean;
  save: () => Promise<boolean>;
}

export const useMyInfo = (): UseMyInfoReturn => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const [name, setNameState] = useState("");
  const [email, setEmailState] = useState("");
  const [age, setAgeState] = useState("");

  useEffect(() => {
    if (!userId) return;

    api
      .get<User>(`/api/v1/users/${userId}`)
      .then((res) => {
        const responseData = res.data as { data?: User } | User;
        const userData =
          "data" in responseData && responseData.data
            ? responseData.data
            : (responseData as User);
        setUser(userData);
        setNameState(userData.name);
        setEmailState(userData.email);
        setAgeState(String(userData.age));
      })
      .catch(() => {
        alert("내 정보를 불러오지 못했습니다.");
      });
  }, [userId]);

  const hasChanges =
    user !== null &&
    (name !== user.name || email !== user.email || Number(age) !== user.age);

  const save = async (): Promise<boolean> => {
    if (!userId) return false;
    try {
      const body = {
        name,
        email,
        age: Number(age),
      };
      await api.patch(`/api/v1/users/${userId}`, body);
      setUser((u) => (u ? { ...u, ...body } : u));
      return true;
    } catch {
      return false;
    }
  };

  return {
    user,
    name,
    email,
    age,
    setName: setNameState,
    setEmail: setEmailState,
    setAge: setAgeState,
    hasChanges,
    save,
  };
};
