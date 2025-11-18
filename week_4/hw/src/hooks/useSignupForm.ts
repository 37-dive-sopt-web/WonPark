// src/hooks/useSignupForm.ts
import { useState } from "react";
import type { SignupRequest } from "../api/client.ts";
import { api } from "../api/client";

type Step = 1 | 2 | 3;

interface UseSignupFormReturn {
  step: Step;
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  age: string;

  usernameError: string;
  passwordError: string;
  submitError: string;

  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
  setPasswordCheck: (v: string) => void;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setAge: (v: string) => void;

  goNextFromId: () => void;
  goNextFromPassword: () => void;
  canNextFromId: boolean;
  canNextFromPassword: boolean;
  canSubmit: boolean;

  submit: () => Promise<boolean>; // 성공하면 true 반환
}

export const useSignupForm = (): UseSignupFormReturn => {
  const [step, setStep] = useState<Step>(1);

  const [username, setUsernameState] = useState("");

  const [password, setPasswordState] = useState("");
  const [passwordCheck, setPasswordCheckState] = useState("");

  const [name, setNameState] = useState("");
  const [email, setEmailState] = useState("");
  const [age, setAgeState] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateUsername = (value: string): string => {
    if (!value) return "아이디를 입력해주세요.";
    if (value.length > 50) return "아이디는 50자 이하여야 합니다.";
    return "";
  };

  const validatePassword = (pwd: string, confirm: string): string => {
    if (!pwd || !confirm) return "비밀번호를 입력해주세요.";
    if (pwd !== confirm) return "비밀번호가 일치하지 않습니다.";
    if (pwd.length < 8 || pwd.length > 64)
      return "비밀번호는 8~64자이어야 합니다.";
    if (/\s/.test(pwd)) return "공백은 사용할 수 없습니다.";
    if (!/[A-Z]/.test(pwd)) return "대문자를 최소 1자 포함해야 합니다.";
    if (!/[a-z]/.test(pwd)) return "소문자를 최소 1자 포함해야 합니다.";
    if (!/[0-9]/.test(pwd)) return "숫자를 최소 1자 포함해야 합니다.";
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];\'/+~=`]/.test(pwd))
      return "특수문자를 최소 1자 포함해야 합니다.";
    return "";
  };

  const usernameErr = validateUsername(username);
  const passwordErr = validatePassword(password, passwordCheck);

  const canNextFromId = !usernameErr;
  const canNextFromPassword = !passwordErr;
  const canSubmit = !!name && !!email && !!age;

  const goNextFromId = () => {
    const msg = validateUsername(username);
    if (!msg) setStep(2);
  };

  const goNextFromPassword = () => {
    const msg = validatePassword(password, passwordCheck);
    if (!msg) setStep(3);
  };

  const submit = async (): Promise<boolean> => {
    setSubmitError("");
    if (!canSubmit) {
      setSubmitError("모든 값을 입력해주세요.");
      return false;
    }

    const payload: SignupRequest = {
      username,
      password,
      name,
      email,
      age: Number(age),
    };

    try {
      await api.post("/api/v1/users", payload);
      return true;
    } catch {
      setSubmitError("회원가입에 실패했습니다.");
      return false;
    }
  };

  const setUsername = (v: string) => {
    setUsernameState(v);
  };
  const setPassword = (v: string) => setPasswordState(v);
  const setPasswordCheck = (v: string) => setPasswordCheckState(v);
  const setName = (v: string) => setNameState(v);
  const setEmail = (v: string) => setEmailState(v);
  const setAge = (v: string) => setAgeState(v);

  return {
    step,
    username,
    password,
    passwordCheck,
    name,
    email,
    age,
    usernameError: usernameErr,
    passwordError: passwordErr,
    submitError,
    setUsername,
    setPassword,
    setPasswordCheck,
    setName,
    setEmail,
    setAge,
    goNextFromId,
    goNextFromPassword,
    canNextFromId,
    canNextFromPassword,
    canSubmit,
    submit,
  };
};
