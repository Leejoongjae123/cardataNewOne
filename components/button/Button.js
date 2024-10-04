'use client';

import { useFormStatus } from 'react-dom';
import Spinner from '@nextui-org/react';  // Spinner 컴포넌트의 경로를 적절히 조정해주세요

export function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="button bg-primary text-white w-full flex items-center justify-center"
      disabled={pending}
    >
      {pending ? <Spinner size="sm" /> : children}
    </button>
  );
}

// ... 기존의 다른 버튼 컴포넌트들 ...